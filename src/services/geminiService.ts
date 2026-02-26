import { GoogleGenAI, Type } from "@google/genai";
import { Component, ChangeCard } from "../types";

// Initialize lazily or with dummy to prevent crash on load
const getAiClient = () => {
  const apiKey =
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "dummy-key";
  return new GoogleGenAI({ apiKey });
};

const PCB_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    intent: {
      type: Type.STRING,
      description: "The summarized intent of the user action.",
    },
    description: {
      type: Type.STRING,
      description: "User-friendly description of what was changed.",
    },
    components: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          type: { type: Type.STRING },
          value: { type: Type.STRING },
          package: { type: Type.STRING },
          position: {
            type: Type.OBJECT,
            properties: {
              x: { type: Type.NUMBER },
              y: { type: Type.NUMBER },
              z: { type: Type.NUMBER },
            },
            required: ["x", "y", "z"],
          },
          rotation: { type: Type.NUMBER },
          net: { type: Type.STRING },
        },
        required: ["id", "name", "type", "position"],
      },
    },
  },
  required: ["intent", "description", "components"],
};

// Mock mode flag - set to true to bypass API calls
const USE_MOCK =
  !process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  process.env.NEXT_PUBLIC_GEMINI_API_KEY === "dummy-key";

const generateMockResponse = (
  prompt: string,
  currentComponents: Component[],
): { change: ChangeCard; updatedComponents: Component[] } => {
  // Sample components to return based on common prompts
  const sampleComponents: Component[] = [
    {
      id: "mcu1",
      name: "ATmega328P",
      type: "IC-Microcontroller",
      value: "",
      package: "TQFP-32",
      position: { x: 0, y: 5, z: 0 },
      rotation: 0,
      net: "VCC",
    },
    {
      id: "cap1",
      name: "C1",
      type: "Capacitor",
      value: "100nF",
      package: "0805",
      position: { x: -30, y: 5, z: 20 },
      rotation: 0,
      net: "VCC",
    },
    {
      id: "cap2",
      name: "C2",
      type: "Capacitor",
      value: "22pF",
      package: "0603",
      position: { x: -30, y: 5, z: -20 },
      rotation: 0,
      net: "XTAL1",
    },
    {
      id: "res1",
      name: "R1",
      type: "Resistor",
      value: "10k",
      package: "0805",
      position: { x: 30, y: 5, z: 20 },
      rotation: 90,
      net: "RESET",
    },
    {
      id: "res2",
      name: "R2",
      type: "Resistor",
      value: "330",
      package: "0805",
      position: { x: 30, y: 5, z: -20 },
      rotation: 90,
      net: "LED",
    },
    {
      id: "led1",
      name: "LED1",
      type: "LED",
      value: "Red",
      package: "0805",
      position: { x: 50, y: 5, z: 0 },
      rotation: 0,
      net: "LED",
    },
    {
      id: "xtal1",
      name: "Y1",
      type: "Crystal",
      value: "16MHz",
      package: "HC49",
      position: { x: -50, y: 5, z: 0 },
      rotation: 0,
      net: "XTAL1",
    },
    {
      id: "vreg1",
      name: "U2",
      type: "IC-Regulator",
      value: "AMS1117-3.3",
      package: "SOT-223",
      position: { x: 0, y: 5, z: 40 },
      rotation: 0,
      net: "VCC",
    },
  ];

  // Combine existing with some new components
  const updatedComponents =
    currentComponents.length > 0
      ? [
          ...currentComponents,
          sampleComponents[Math.floor(Math.random() * sampleComponents.length)],
        ]
      : sampleComponents.slice(0, 4 + Math.floor(Math.random() * 4));

  const change: ChangeCard = {
    id: Math.random().toString(36).substr(2, 9),
    intent: `[MOCK] Processing: "${prompt}"`,
    description: `Mock response - Added/modified components based on your request. Set NEXT_PUBLIC_GEMINI_API_KEY in .env for real AI responses.`,
    affectedItems: updatedComponents.map((c) => c.name),
    status: "applied",
    timestamp: new Date(),
  };

  return { change, updatedComponents };
};

export const processPrompt = async (
  prompt: string,
  currentComponents: Component[],
): Promise<{ change: ChangeCard; updatedComponents: Component[] }> => {
  // Use mock mode if no valid API key
  if (USE_MOCK) {
    console.log("🔧 [MOCK MODE] No valid API key - returning sample data");
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay
    return generateMockResponse(prompt, currentComponents);
  }

  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `
        You are an expert PCB designer and helpful assistant.
        Current board state components: ${JSON.stringify(currentComponents)}
        User request: "${prompt}"

        Rules:
        1. If the user request is a greeting (e.g., "hi", "hello") or a general question unrelated to the design, DO NOT change any components. Return the "components" array exactly as it is. Set "intent" to "GREETING" (or "CHAT" for questions) and "description" to a friendly conversational response.
        2. If the user wants to change the design, update the PCB layout based on the request. Add, move, or modify components as needed.
        3. Always provide the full component list in the response.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: PCB_SCHEMA,
      },
    });

    const data = JSON.parse(response.text || "{}");

    const change: ChangeCard = {
      id: Math.random().toString(36).substr(2, 9),
      intent: data.intent,
      description: data.description,
      affectedItems: data.components.map((c: any) => c.name),
      status: "applied",
      timestamp: new Date(),
    };

    return {
      change,
      updatedComponents: data.components,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback to mock on API error
    console.log("🔧 [FALLBACK] API error - returning mock data");
    return generateMockResponse(prompt, currentComponents);
  }
};

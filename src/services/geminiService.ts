
import { GoogleGenAI, Type } from "@google/genai";
import { Component, ChangeCard } from "../types";

// Initialize lazily or with dummy to prevent crash on load
const getAiClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_API_KEY || 'dummy-key';
  return new GoogleGenAI({ apiKey });
};


const PCB_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    intent: { type: Type.STRING, description: 'The summarized intent of the user action.' },
    description: { type: Type.STRING, description: 'User-friendly description of what was changed.' },
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
              z: { type: Type.NUMBER }
            },
            required: ['x', 'y', 'z']
          },
          rotation: { type: Type.NUMBER },
          net: { type: Type.STRING }
        },
        required: ['id', 'name', 'type', 'position']
      }
    }
  },
  required: ['intent', 'description', 'components']
};

export const processPrompt = async (
  prompt: string,
  currentComponents: Component[]
): Promise<{ change: ChangeCard, updatedComponents: Component[] }> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // Updated to latest available model or keep generic if unknown
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
      }
    });

    const data = JSON.parse(response.text || '{}');

    const change: ChangeCard = {
      id: Math.random().toString(36).substr(2, 9),
      intent: data.intent,
      description: data.description,
      affectedItems: data.components.map((c: any) => c.name),
      status: 'applied',
      timestamp: new Date()
    };

    return {
      change,
      updatedComponents: data.components
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

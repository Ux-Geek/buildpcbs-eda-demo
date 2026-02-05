
import { GoogleGenAI, Type } from "@google/genai";
import { Component, ChangeCard } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY || 'placeholder_key' });

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
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        You are an expert PCB designer. 
        Current board state components: ${JSON.stringify(currentComponents)}
        User request: "${prompt}"
        
        Update the PCB layout based on the request. 
        Add, move, or modify components as needed. 
        Provide a summary of the change and the full new component list.
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

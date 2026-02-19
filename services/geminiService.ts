
import { GoogleGenAI, Type } from "@google/genai";
import { RAW_BUS_DATA } from "../busData";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Fix: Use process.env.API_KEY directly as a named parameter as per guidelines.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async analyzeRoute(from: string, to: string) {
    // Fix: gemini-3-flash-preview is recommended for Basic Text Tasks.
    const model = 'gemini-3-flash-preview';
    
    // Fix: Use systemInstruction to define the model's persona and provide the data context.
    const systemInstruction = `You are an expert Dhaka City transport assistant. 
      Use the provided Dhaka Bus Database to offer local insights.
      
      Dhaka Bus Database:
      ${RAW_BUS_DATA}`;

    const prompt = `
      I want to go from "${from}" to "${to}".
      
      Task:
      1. Identify the most iconic landmarks near the destination.
      2. Give 1 sentence of local advice about the traffic in this specific area.
      3. Suggest if a Rickshaw or CNG is better for the final 500m.
      
      Return as JSON with the following schema.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              landmarks: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: 'Key landmarks at the destination.'
              },
              trafficAdvice: { 
                type: Type.STRING,
                description: 'Brief traffic advice for the area.'
              },
              lastMileMode: { 
                type: Type.STRING,
                description: 'Best mode for the final short stretch (Rickshaw, CNG, or Walk).'
              }
            },
            required: ['landmarks', 'trafficAdvice', 'lastMileMode'],
            propertyOrdering: ["landmarks", "trafficAdvice", "lastMileMode"]
          }
        }
      });

      // Fix: Access response.text property directly (not a method).
      const text = response.text;
      if (!text) return null;
      
      return JSON.parse(text.trim());
    } catch (e) {
      console.error("Gemini route analysis failed", e);
      return null;
    }
  }
}

export const geminiService = new GeminiService();

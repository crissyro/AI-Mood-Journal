
import { GoogleGenAI, Type } from "@google/genai";
import type { AIAnalysis, Emotion } from '../types';
import { EMOTIONS } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development and will be displayed in the UI.
  // In a real production environment, the key should be securely managed.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    emotion: {
      type: Type.STRING,
      description: `The dominant emotion from the entry. Must be one of the following: ${EMOTIONS.join(', ')}.`,
      enum: EMOTIONS,
    },
    summary: {
      type: Type.STRING,
      description: 'A brief, neutral, one-sentence summary of the journal entry in Russian.',
    },
  },
  required: ['emotion', 'summary'],
};

export const analyzeEntry = async (text: string): Promise<AIAnalysis | null> => {
  if (!API_KEY) {
      console.error("Gemini API key is not configured.");
      // Return a mock response or error state if the key is missing
      return {
        emotion: 'neutral',
        summary: 'AI анализ недоступен. API ключ не настроен.'
      };
  }

  try {
    const prompt = `Проанализируй следующую запись в дневнике, чтобы определить основную эмоцию и предоставить краткое, нейтральное резюме на одно предложение на русском языке. Эмоция должна быть одной из следующих: ${EMOTIONS.join(', ')}. Вот запись: "${text}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    return {
      emotion: result.emotion as Emotion,
      summary: result.summary,
    };
  } catch (error) {
    console.error("Error analyzing entry with Gemini:", error);
    return {
      emotion: 'neutral',
      summary: 'Не удалось проанализировать запись. Пожалуйста, попробуйте еще раз.'
    };
  }
};
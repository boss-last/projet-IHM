
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStudyBuddyResponse = async (query: string, courseContext?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `En tant que tuteur expert de l'IUA (Institut Universitaire d'Abidjan), réponds à la question suivante de l'étudiant. 
      Contexte du cours: ${courseContext || 'Général'}.
      Question: ${query}`,
      config: {
        systemInstruction: "Tu es un tuteur pédagogique bienveillant et rigoureux. Tu aides les étudiants de l'IUA à préparer leurs examens en expliquant les concepts clairement, en donnant des exemples locaux ivoiriens si possible, et en proposant des méthodes de révision efficaces.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Désolé, j'ai rencontré une erreur technique. Peux-tu reformuler ta question ?";
  }
};

export const generateQuizFromTopic = async (topic: string): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Génère 5 questions de QCM (choix multiples) pour réviser le sujet suivant : ${topic}. 
      Les questions doivent être de niveau universitaire.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              correctAnswer: { type: Type.INTEGER, description: "Index de la bonne réponse (0-3)" },
              explanation: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return [];
  }
};

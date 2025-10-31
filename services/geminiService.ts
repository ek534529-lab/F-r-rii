// Fix: Create full content for services/geminiService.ts
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateBio = async (keywords: string): Promise<string> => {
  if (!keywords) {
    return "";
  }
  
  try {
    const prompt = `Génère une bio courte et percutante pour un profil d'utilisateur sur un site de petites annonces. La bio doit être en français et refléter les mots-clés suivants : "${keywords}". La bio ne doit pas dépasser 150 caractères.`;
    
    // Fix: Use ai.models.generateContent instead of deprecated methods
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Use a suitable model for text generation
      contents: prompt,
    });
    
    // Fix: Access text directly from the response object
    const text = response.text;
    return text.trim();
  } catch (error) {
    console.error("Error generating bio with Gemini:", error);
    return "Passionné(e) par la découverte de trésors et la rencontre de nouvelles personnes."; // Fallback bio
  }
};

import { GoogleGenAI } from "@google/genai";

// Ensure we only initialize if the key is present to avoid runtime crashes on load
const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Generates a 3D-style image based on a prompt using Nano Banana Pro (gemini-3-pro-image-preview)
 */
export const generateInterestImage = async (prompt: string): Promise<string | null> => {
  if (!ai) {
    console.error("API Key not found");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;

  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

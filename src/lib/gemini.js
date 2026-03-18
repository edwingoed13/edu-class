import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Forzamos el uso del modelo gemini-1.5-flash que es el más estable para cuentas nuevas
export const geminiModel = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
});

export const summarizeLesson = async (title, section) => {
  const prompt = `Actúa como un profesor experto en programación.
  Resume de forma breve (máximo 4 puntos) la lección "${title}" de la sección "${section}".
  ¿Qué es lo más importante que aprenderá el alumno? Responde en español y usa markdown.`;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error Gemini Summarize:", error);
    return "No pude generar el resumen. Verifica tu conexión o API Key.";
  }
};

export const askGemini = async (question, context) => {
  const prompt = `Asistente experto en Vue.js. 
  Lección: ${context.title}. 
  Pregunta: ${question}.
  Responde de forma clara y amigable en español.`;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error Gemini Ask:", error);
    return "Error al procesar la pregunta.";
  }
};

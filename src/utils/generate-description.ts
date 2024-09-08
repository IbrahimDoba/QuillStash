import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ 
   model: "gemini-1.5-flash",
   systemInstruction: "You are an SEO expert tasked with creating concise, engaging, and informative article descriptions. Your descriptions should be between 150-160 characters long to optimize for search engine snippets and social media sharing."
});

export async function generateDescription(articleTitle: string) {
  const prompt = `Generate a concise, SEO-friendly summary of an article based only on the title '${articleTitle}'. The summary should be between 150-160 characters.`;
  try {
    const result = await model.generateContent(prompt);
    const description = result.response.text().trim();
    
    // Ensure the description is within the desired character range
    if (description.length > 160) {
      return description.substring(0, 157) + '...';
    }
    return description;
  } catch (error) {
    console.error('Error generating description:', error);
    return null; // Fallback description
  }
}
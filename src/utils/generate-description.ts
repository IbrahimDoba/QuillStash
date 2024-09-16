import { Hercai, QuestionData } from "hercai";

const herc = new Hercai();

export async function generateDescription(articleTitle: string): Promise<string | null> {
  const prompt = `Generate a concise, SEO-friendly summary of an article based only on the title '${articleTitle}'. The summary should be between 150-160 characters. remove any "" from the response`;

  try {
    const response: QuestionData = await herc.question({
      model: "v3",
      content: prompt
    });

    let description = response.reply.trim();

    // Ensure the description is within the desired character range
    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }

    return description;
  } catch (error) {
    console.error('Error generating description:', error);
    return null; // Fallback description
  }
}
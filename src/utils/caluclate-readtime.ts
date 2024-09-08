export function calculateReadTime(content: string) {
   const wordsPerMinute = 200; // average human reading speed in (words per minute)
   const plainText = content.replace(/<[^>]*>/g, "").trim(); // remove html tags
   const wordCount = plainText.length;
 
   const readingTime = Math.ceil(wordCount / wordsPerMinute);
   return readingTime;
 }

import React from "react";

// Utility function to strip HTML tags and truncate text
const truncateText = (htmlContent:any, maxLength:any) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  const textContent = tempDiv.textContent || tempDiv.innerText || "";
  return textContent.length > maxLength ? textContent.substring(0, maxLength) + "..." : textContent;
};

interface TruncatedTextProps {
  content: string;
  maxLength: number;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ content, maxLength }) => {
  const truncatedContent = truncateText(content, maxLength);

  return <p>{truncatedContent}</p>;
};

export default TruncatedText;

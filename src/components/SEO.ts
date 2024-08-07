// "use client";
// import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';

// interface TagInputProps {
//   onChange: (tags: string[]) => void;
//   value: string[];
// }

// const TagInput: React.FC<TagInputProps> = ({ onChange, value }) => {
//   const [tags, setTags] = useState<string[]>(value || []);
//   const [inputValue, setInputValue] = useState<string>('');

//   useEffect(() => {
//     setTags(value);
//   }, [value]);

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === ' ') {
//       e.preventDefault();
//       if (inputValue.trim() && tags.length < 4) {
//         const newTags = [...tags, inputValue.trim()];
//         setTags(newTags);
//         onChange(newTags);
//         setInputValue('');
//       }
//     }
//   };

//   const handleRemoveTag = (index: number) => {
//     const newTags = tags.filter((_, i) => i !== index);
//     setTags(newTags);
//     onChange(newTags);
//   };

//   return (
//     <div className="mb-4">
//       <div className="flex flex-wrap items-center border p-2 rounded">
//         {tags.map((tag, index) => (
//           <div key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2 mb-2 flex items-center">
//             #{tag}
//             <button
//               onClick={() => handleRemoveTag(index)}
//               className="ml-2 text-red-500 hover:text-red-700"
//             >
//               &times;
//             </button>
//           </div>
//         ))}
//         {tags.length < 4 && (
//           <input
//             type="text"
//             value={inputValue}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Add up to 4 tags..."
//             className="flex-grow p-2 outline-none"
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TagInput;

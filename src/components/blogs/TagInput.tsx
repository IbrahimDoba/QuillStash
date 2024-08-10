import { Input } from '@nextui-org/input';
import { Chip } from '@nextui-org/react';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface TagInputProps {
  onChange: (tags: string[]) => void;
  value: string[];
}

const TagInput: React.FC<TagInputProps> = ({ onChange, value }) => {
  const [tags, setTags] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (inputValue.trim() && tags.length < 4) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        onChange(newTags); // Call the onChange prop with the updated tags
        setInputValue('');
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange(newTags); // Call the onChange prop with the updated tags
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-4'>
        {tags.map((tag, index) => (
          <Chip
            key={`${tag}-${index}`}
            onClose={() => handleRemoveTag(index)} // Remove tag when the close button is clicked
          >
            {tag}
          </Chip>
        ))}
      </div>

      {tags.length < 4 && (
        <Input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder='Add up to 4 tags separated by spaces'
          radius='sm'
          size='lg'
        />
      )}
    </div>
  );
};

export default TagInput;

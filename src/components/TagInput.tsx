import { Chip, Input } from '@nextui-org/react';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface TagInputProps {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tags: string[];
}

function TagInput({ setTags, tags }: TagInputProps) {
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value.trim().toLowerCase();
    const lastCharacter = currentValue.slice(-1);
    setTagInputValue(currentValue);

    if (lastCharacter === ',') {
      const tag = currentValue.slice(0, -1);
      if (tags.indexOf(tag) === -1) {
        setTags([...tags, tag]);
      }
      setTagInputValue('');
      console.log(tag);
    }
  };

  const handleRemoveTag = (tagToDelete: string) => {
    const newTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(newTags);
  };

  return (
    <div className='flex flex-col gap-2'>
      <Input
        type='text'
        value={tagInputValue}
        onChange={handleInputChange}
        placeholder={tags.length < 4 ? '' : 'Max tags reached'}
        radius='sm'
        label='Tags'
        disabled={tags.length >= 4}
        description='Type in a comma after a tag name to add it.'
      />
      <div className='flex gap-3'>
        {tags.map((tag, index) => (
          <Chip
            key={`${tag}-${index}`}
            onClose={() => handleRemoveTag(tag)} // Remove tag when the close button is clicked
          >
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default TagInput;
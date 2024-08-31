import { Chip, Input } from '@nextui-org/react';
import { useState, ChangeEvent, useEffect } from 'react';
import { useController, Control } from 'react-hook-form';
import { PostValues } from '@/lib/zod';

interface TagInputProps {
  control: Control<PostValues>;
}

function TagInput({ control }: TagInputProps) {
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: 'tags',
    control,
    defaultValue: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      addTag();
      console.log(value)
    }
  };

  const addTag = () => {
    const trimmedValue = tagInputValue.trim().toLowerCase();
    if (trimmedValue && !value.includes(trimmedValue) && value.length < 4) {
      onChange([...value, trimmedValue]);
      setTagInputValue('');
    }
  };

  const handleRemoveTag = (tagToDelete: string) => {
    onChange(value.filter((tag: string) => tag !== tagToDelete));
  };

  useEffect(() => {
    // Ensure the input is cleared when tags are updated externally
    if (value.length === 0) {
      setTagInputValue('');
    }
  }, [value]);

  return (
    <div className='flex flex-col gap-2'>
      <Input
        type='text'
        value={tagInputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={value.length < 4 ? 'Add a tag' : 'Max tags reached'}
        radius='sm'
        disabled={value.length >= 4}
        description='Press Enter or comma to add a tag.'
      />
      <div className='flex flex-wrap gap-2'>
        {value.map((tag: string, index: number) => (
          <Chip
            key={`${tag}-${index}`}
            onClose={() => handleRemoveTag(tag)}
          >
            {tag}
          </Chip>
        ))}
      </div>
      {error && <p className='text-red-500 text-sm'>{error.message}</p>}
    </div>
  );
}

export default TagInput;
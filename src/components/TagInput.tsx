import { Chip, Input } from '@nextui-org/react';
import { useState, ChangeEvent } from 'react';
import { useController, Control } from 'react-hook-form';
import { ClientPostValues } from '@/lib/zod';

interface TagInputProps {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tags: string[];
  control: Control<ClientPostValues>;
}

function TagInput({ setTags, tags, control }: TagInputProps) {
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'tags',
    control,
    defaultValue: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value.trim().toLowerCase();
    const lastCharacter = currentValue.slice(-1);

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
      {error && <p className='text-red-500 text-sm'>{error.message}</p>}
    </div>
  );
}

export default TagInput;

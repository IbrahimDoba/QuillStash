import React, { useState, useEffect } from 'react';
import { Chip, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { useController, Control } from 'react-hook-form';
import { PostValues } from '@/lib/zod';
import ErrorMessage from '../ui/error-message';
import { topics } from '@/utils/constants';

interface TagInputProps {
  control: Control<PostValues>;
}

function TagInput({ control }: TagInputProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: 'tags',
    control,
    defaultValue: [],
  });

  const addTag = (newTag: string) => {
    const trimmedValue = newTag.trim().toLowerCase();
    if (trimmedValue && !value.includes(trimmedValue) && value.length < 4) {
      onChange([...value, trimmedValue]);
      setInputValue('');
    }
  };

  const handleSelectionChange = (key: React.Key | null) => {
    if (key !== null) {
      addTag(key.toString());
    }
  };
  
  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const handleRemoveTag = (tagToDelete: string) => {
    onChange(value.filter((tag: string) => tag !== tagToDelete));
  };

  useEffect(() => {
    if (value.length === 0) {
      setInputValue('');
    }
  }, [value]);

  return (
    <div className='flex flex-col gap-2'>
      <Autocomplete
        radius='sm'
        selectorIcon={null}
        // allowsCustomValue
        aria-label='Tags'
        defaultItems={topics}
        isDisabled={value.length >= 4}
        onSelectionChange={handleSelectionChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        inputValue={inputValue}
        description='Press Enter or comma to add a tag.'
        placeholder={value.length < 4 ? 'Add a tag' : 'Max tags reached'}
        listboxProps={{
          emptyContent: 'No topics found, but you can still add your own.',
          hideSelectedIcon: true,
        }}
      >
        {(topic) => (
          <AutocompleteItem key={topic.value}>{topic.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <div className='flex flex-wrap gap-2'>
        {value.map((tag: string, index: number) => (
          <Chip key={`${tag}-${index}`} onClose={() => handleRemoveTag(tag)}>
            {tag}
          </Chip>
        ))}
      </div>
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
}

export default TagInput;

// import { Chip, Input } from '@nextui-org/react';
// import { useState, ChangeEvent, useEffect } from 'react';
// import { useController, Control } from 'react-hook-form';
// import { PostValues } from '@/lib/zod';
// import ErrorMessage from '../ui/error-message';

// interface TagInputProps {
//   control: Control<PostValues>;
// }


// function TagInput({ control }: TagInputProps) {
//   const [tagInputValue, setTagInputValue] = useState<string>('');

//   const {
//     field: { onChange, value },
//     fieldState: { error },
//   } = useController({
//     name: 'tags',
//     control,
//     defaultValue: [],
//   });

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setTagInputValue(e.target.value);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === ',' || e.key === 'Enter') {
//       e.preventDefault();
//       addTag();
//       console.log(value)
//     }
//   };

//   const addTag = () => {
//     const trimmedValue = tagInputValue.trim().toLowerCase();
//     if (trimmedValue && !value.includes(trimmedValue) && value.length < 4) {
//       onChange([...value, trimmedValue]);
//       setTagInputValue('');
//     }
//   };

//   const handleRemoveTag = (tagToDelete: string) => {
//     onChange(value.filter((tag: string) => tag !== tagToDelete));
//   };

//   useEffect(() => {
//     // Ensure the input is cleared when tags are updated externally
//     if (value.length === 0) {
//       setTagInputValue('');
//     }
//   }, [value]);

//   return (
//     <div className='flex flex-col gap-2'>
//       <Input
//         type='text'
//         radius='sm'
//         onBlur={addTag}
//         value={tagInputValue}
//         onKeyDown={handleKeyDown}
//         onChange={handleInputChange}
//         disabled={value.length >= 4}
//         description='Press Enter or comma to add a tag.'
//         placeholder={value.length < 4 ? 'Add a tag' : 'Max tags reached'}
//       />
//       <div className='flex flex-wrap gap-2'>
//         {value.map((tag: string, index: number) => (
//           <Chip
//             key={`${tag}-${index}`}
//             onClose={() => handleRemoveTag(tag)}
//           >
//             {tag}
//           </Chip>
//         ))}
//       </div>
//       {error && <ErrorMessage message={error.message} />}
//     </div>
//   );
// }

// export default TagInput;
'use client';

import { formatFileSize } from '@edgestore/react/utils';
import { UploadCloudIcon, X } from 'lucide-react';
import { useMemo, forwardRef } from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import ErrorMessage from './error-message';

const variants = {
  base: 'relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed dark:border-foreground-600 transition-colors duration-200 ease-in-out',
  image: 'border-0 p-0 min-h-0 min-w-0 relative shadow-md rounded-md',
  active: 'border-2',
  disabled:
    'bg-foreground-200 border-foreground-200 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700',
  accept: 'border border-success bg-blue-500 bg-opacity-10',
  reject: 'border border-danger bg-danger-300 bg-opacity-10',
};

type InputProps = {
  width?: number;
  height?: number;
  className?: string;
  // value?: File | string;
  value: File | null;
  onChange?: (file?: File) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

const SingleImageDropzone = forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, width, height, value, className, disabled, onChange },
    ref
  ) => {
    const imageUrl = useMemo(() => {
      if (!value) {
        return;
      } else if (value) {
        return URL.createObjectURL(value);
      }
      return null;
    }, [value]);

    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { 'image/*': [] },
      multiple: false,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          void onChange?.(file);
        }
      },
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          imageUrl && variants.image,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className
        ).trim(),
      [
        isFocused,
        imageUrl,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ]
    );

    // error validation messages
    const errorMessage = useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === 'file-too-large') {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === 'file-invalid-type') {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === 'too-many-files') {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div>
        <div
          {...getRootProps({
            className: dropZoneClassName,
            style: {
              width,
              height,
            },
          })}
        >
          {/* Main File Input */}
          <input ref={ref} {...getInputProps()} />

          {imageUrl ? (
            // Image Preview
            // eslint-disable-next-line
            <img
              className='h-full w-full rounded-md object-cover'
              src={imageUrl}
              alt={acceptedFiles[0]?.name}
            />
          ) : (
            // Upload Icon
            <div className='flex flex-col items-center justify-center text-sm text-foreground-600'>
              <UploadCloudIcon className='mb-2 h-7 w-7' />
              <div>drag & drop to upload</div>
              <div className='mt-3'>
                <button
                  type='button'
                  disabled={disabled}
                  className='px-4 py-1.5 bg-default hover:opacity-80 text-foreground rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Select
                </button>
              </div>
            </div>
          )}

          {/* Remove Image Icon */}
          {imageUrl && !disabled && (
            <div
              className='group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform'
              onClick={(e) => {
                e.stopPropagation();
                void onChange?.(undefined);
              }}
            >
              <div className='flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black'>
                <X width={16} height={16} />
              </div>
            </div>
          )}
        </div>

        {/* Error Text */}
        <ErrorMessage message={errorMessage} className='mt-1' />
      </div>
    );
  }
);
SingleImageDropzone.displayName = 'SingleImageDropzone';

export { SingleImageDropzone };

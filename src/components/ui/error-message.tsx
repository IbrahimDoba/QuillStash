import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message: string | undefined;
}

const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  ({ className, message, ...props }, ref) => {
    return (
      <p
        ref={ref}
        aria-live='polite'
        className={twMerge('text-sm px-1 font-medium text-danger', className)}
        {...props}
      >
        {message}
      </p>
    );
  }
);

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
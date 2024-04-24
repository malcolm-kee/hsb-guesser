import * as React from 'react';

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  onValue: (value: string) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ onValue, onChange, ...props }, forwardedRef) {
    return <input {...props} ref={forwardedRef} />;
  }
);

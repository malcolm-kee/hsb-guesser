import { clsx } from 'clsx';
import * as React from 'react';
import { callAll } from '../lib/fn-lib';

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  onValue?: (value: string) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ onValue, onChange, ...props }, forwardedRef) {
    return (
      <input
        {...props}
        onChange={callAll(
          onChange,
          onValue && ((ev) => onValue(ev.target.value))
        )}
        className={clsx(
          'w-full px-3 py-1 border border-zinc-200 rounded',
          props.className
        )}
        ref={forwardedRef}
      />
    );
  }
);

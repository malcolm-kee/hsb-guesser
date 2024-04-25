import * as React from 'react';
import { callAll } from '../lib/fn-lib';

export interface RangeInputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> {
  onValue?: (value: string) => void;
  min: number;
  max: number;
}

export const RangeInput = React.forwardRef<HTMLInputElement, RangeInputProps>(
  function RangeInput({ onValue, onChange, ...props }, forwardedRef) {
    return (
      <input
        {...props}
        type="range"
        onChange={callAll(
          onChange,
          onValue && ((ev) => onValue(ev.target.value))
        )}
        ref={forwardedRef}
      />
    );
  }
);

import { clsx } from 'clsx';
import * as React from 'react';

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(function Button(props, forwardedRef) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        'shadow px-3 py-2 bg-teal-700 text-white rounded',
        props.className
      )}
      ref={forwardedRef}
    />
  );
});

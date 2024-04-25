import * as React from 'react';
import { clsx } from 'clsx';

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<'label'>
>(function Label(props, forwardedRef) {
  return (
    <label
      {...props}
      className={clsx('text-sm text-zinc-600', props.className)}
      ref={forwardedRef}
    />
  );
});

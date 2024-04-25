type Callback<Args extends any[]> = (...args: Args) => void;

export function callAll<Args extends any[]>(
  ...fns: Array<Callback<Args> | undefined>
) {
  return function callAllFns(...args: Args) {
    fns.forEach((fn) => typeof fn === 'function' && fn(...args));
  };
}
export const transitionView = (update: () => void): void => {
  if (
    'startViewTransition' in document &&
    typeof document.startViewTransition === 'function'
  ) {
    document.startViewTransition(update);
  } else {
    update();
  }
};

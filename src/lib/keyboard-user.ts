import * as React from 'react';

export const useIsKeyboardUser = () => {
  const [isKeyboardUser, setIsKeyboardUser] = React.useState(false);

  React.useEffect(() => {
    function onKeyup(ev: KeyboardEvent) {
      if (ev.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    }

    document.addEventListener('keyup', onKeyup);

    return () => {
      document.removeEventListener('keyup', onKeyup);
    };
  }, []);

  return isKeyboardUser;
};

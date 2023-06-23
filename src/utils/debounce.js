import { useMemo } from 'react';

export const DebounceHook = () => {
  const debounce = useMemo(() => {
    let ref = null;
    return (callback, time) => {
      clearTimeout(ref);
      ref = setTimeout(() => callback(), time);
    };
  }, []);

  return {
    debounce
  };
};

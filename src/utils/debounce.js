export const debounce = (callback, time) => {
  let ref = null;
  return (props) => {
    clearTimeout(ref);
    ref = setTimeout(() => callback(props), time);
  };
};

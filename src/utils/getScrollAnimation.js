export default function getScrollAnimation(
  dir = 'y',
  shift = 150,
  type = 'spring'
) {
  return {
    offscreen: {
      [dir]: shift,
      opacity: 0
    },
    onscreen: ({ duration = 2 } = {}) => ({
      [dir]: 0,
      opacity: 1,
      transition: {
        type: type,
        duration
      }
    })
  };
}

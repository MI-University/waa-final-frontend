import { FaStarHalfAlt, FaStar } from 'react-icons/fa';

const Rating = ({ value = 5 }) => {
  const roundedValue = Math.ceil(value);
  const half = Boolean(roundedValue - value);
  const stars = Array.from(new Array(roundedValue));
  const disabledStars = Array.from(new Array(5 - stars.length));

  return (
    <span className="flex items-center grid gap-1 grid-cols-5 mr-2">
      {stars.map((_, i) =>
        i == stars.length - 1 && half ? (
          <FaStarHalfAlt className="text-yellow-300" key={i} />
        ) : (
          <FaStar className="text-yellow-300" key={i} />
        )
      )}
      {disabledStars.map((_, i) => (
        <FaStar className="text-gray-200" key={String(i + 5)} />
      ))}
    </span>
  );
};

Rating.defaultValue = {
  value: 5
};

export default Rating;

import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import UserProfileCard from './UserProfileCard';

const UserProfileAvater = () => {
  const [isChicked, setIsChecked] = useState(false);
  return (
    <div>
      <button
        className="h-11 w-11 flex items-center justify-center text-gray-500 bg-gray-200 rounded-full"
        onClick={() => setIsChecked((prev) => !prev)}>
        <FaUser />
      </button>
      {isChicked && <UserProfileCard onClose={() => setIsChecked(false)} />}
    </div>
  );
};

export default UserProfileAvater;

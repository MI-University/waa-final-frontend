import { propertyService } from '@service/';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyProperties = () => {
  const [list, setList] = useState([]);

  const getAll = () => {
    propertyService.getAll().then((data) => setList(data));
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <Link
          to="/dashboard/my-properties/new"
          className="flex items-center border px-3 py-1 rounded border-gray-200">
          <FaPlus className="text-green-500 mr-2 text-sm" /> Add New
        </Link>
      </div>
    </div>
  );
};

export default MyProperties;

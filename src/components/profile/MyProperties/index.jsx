import { EmptyPanel, Loader } from '@components/ui';
import { Empty } from '@components/ui/icons';
import { propertyService } from '@service/';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyProperties = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAll = () => {
    setLoading(true);
    propertyService.getAll().then((data) => {
      setLoading(false);
      setList(data);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <Link
          to="/dashboard/my-properties/new"
          className="flex items-center border px-3 py-2 pr-4 font-bold text-gray-500 text-sm rounded border-gray-200">
          <FaPlus className="text-green-500 mr-2 text-sm" /> Add new
        </Link>
      </div>
      <div>{loading ? <Loader /> : !list.length ? <EmptyPanel /> : <></>}</div>
    </div>
  );
};

export default MyProperties;

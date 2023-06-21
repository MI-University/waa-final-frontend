import { PropertyCard } from '@components/properties';
import { EmptyPanel, Loader } from '@components/ui';
import { Empty } from '@components/ui/icons';
import { propertyService } from '@service/';
import { useData } from '@store/providers/Provider';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyProperties = ({ forSeller = false }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useData();

  const getAll = () => {
    setLoading(true);
    propertyService.getAll().then((list) => {
      setLoading(false);
      setList(list?.filter((item) => item.user?.id == user?.userId));
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      {forSeller && (
        <div className="flex justify-end">
          <Link
            to="/dashboard/my-properties/new"
            className="flex items-center border px-3 py-2 pr-4 font-bold text-gray-500 text-sm rounded border-gray-200">
            <FaPlus className="text-green-500 mr-2 text-sm" /> Add new
          </Link>
        </div>
      )}
      <div>
        {loading ? (
          <Loader />
        ) : !list.length ? (
          <EmptyPanel />
        ) : (
          <div className="grid grid-cols-4 gap-0">
            {list?.map((item) => (
              <PropertyCard item={item} forSeller refetch={getAll} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;

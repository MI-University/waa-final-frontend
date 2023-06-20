import { EmptyPanel, Loader } from '@components/ui';
import { Empty } from '@components/ui/icons';
import { ownerService } from '@service/';
import { useEffect, useState } from 'react';
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyOffers = () => {
  const [list, setList] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const getAll = () => {
    setLoading(true);
    ownerService.getAll().then((data) => {
      setLoading(false);
      setList(data);
    });
  };

  const acceptRequest = (id) => {
    setLoading(true);
    ownerService
      .accept(id)
      .then(() => {
        setLoading(false);
        getAll();
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <div>
        {loading ? (
          <Loader />
        ) : !list.length ? (
          <EmptyPanel />
        ) : (
          <div className="grid">
            <div className="grid grid-cols-4 gap-4">
              <div className="p-2 px-6 font-bold text-sm text-gray-500">
                Name
              </div>
              <div className="p-2 px-6 font-bold text-sm text-gray-500">
                Email
              </div>
              <div className="p-2 px-6 font-bold text-sm text-gray-500">
                Role
              </div>
              <div className="p-2 px-6 font-bold text-sm text-gray-500">
                Action
              </div>
            </div>
            {list?.map((data) => {
              return (
                <div className="grid grid-cols-4 gap-4 [&:nth-child(2n)]:bg-gray-100">
                  <div className="p-2 px-6">{data.name || '-'}</div>
                  <div className="p-2 px-6">{data.email || '-'}</div>
                  <div className="p-2 px-6">{data.role || '-'}</div>
                  <div className="p-2 px-6">
                    <button
                      className="p-2 mr-2"
                      onClick={() => acceptRequest(data.id)}>
                      <FaCheck className="text-green-500" />
                    </button>
                    <button className="p-2">
                      <FaTimes className="text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOffers;

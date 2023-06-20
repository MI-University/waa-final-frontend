import { EmptyPanel, Loader } from '@components/ui';
import { Empty } from '@components/ui/icons';
import { ownerService } from '@service/';
import { useEffect, useState } from 'react';
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PendingOwners = () => {
  const [list, setList] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const getAll = () => {
    setLoading(true);
    ownerService.getAll({ approve: true }).then((list) => {
      setLoading(false);
      setList(list);
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
            <div className="grid grid-cols-4 gap-4 mb-2">
              <div className="p-2 px-6 font-bold text-sm text-gray-500">
                Name
              </div>
              <div className="p-2 px-6 font-bold text-sm text-gray-500">
                Email
              </div>
              <div className="p-2 px-6 font-bold text-sm text-gray-500">
                Approved
              </div>
              <div className="p-2 px-6 font-bold text-sm text-gray-500">
                Action
              </div>
            </div>
            {list?.map((data) => {
              return (
                <div className="grid grid-cols-4 gap-4 [&:nth-child(2n)]:bg-gray-100">
                  <div className="p-2 px-6 text-sm flex items-center">
                    {data.name || '-'}
                  </div>
                  <div className="p-2 px-6 text-sm flex items-center">
                    {data.email || '-'}
                  </div>
                  <div className={'p-2 px-6 text-sm flex items-center '}>
                    <span
                      className={
                        'px-4 py-[3px] inline-block rounded w-16 text-center ' +
                        (data.approved
                          ? 'text-white bg-green-500'
                          : ' text-white bg-yellow-400')
                      }>
                      {`${data.approved}`}
                    </span>
                  </div>
                  <div className="p-2 px-6">
                    {data.approved ? (
                      <span className="text-gray-300"></span>
                    ) : (
                      <>
                        <button
                          className="p-2 mr-2"
                          onClick={() => acceptRequest(data.id)}>
                          <FaCheck className="text-sm text-green-500" />
                        </button>
                        <button className="p-2">
                          <FaTimes className="text-sm text-red-500" />
                        </button>
                      </>
                    )}
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

export default PendingOwners;

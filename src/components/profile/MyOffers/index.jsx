import { EmptyPanel, Loader } from '@components/ui';
import { Empty } from '@components/ui/icons';
import { offerService } from '@service/';
import { ownerService } from '@service/';
import { useData } from '@store/providers/Provider';
import { userType } from '@utils/constants/types.contants';
import { useEffect, useState } from 'react';
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyOffers = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useData();
  const isOwner = user?.role == userType.OWNER;

  const getAll = () => {
    setLoading(true);
    offerService.getAll().then((list) => {
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

  const cancelApproval = (id) => {
    setLoading(true);
    ownerService
      .cancel(id)
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
              <div className="p-2 px-6 font-bold  py-3 text-sm text-gray-500">
                Property
              </div>
              <div className="p-2 px-6 font-bold  py-3 text-sm text-gray-500">
                Customer
              </div>
              <div className="p-2 px-6 font-bold  py-3 text-sm text-gray-500">
                Status
              </div>
              <div className="p-2 px-6 font-bold  py-3 text-sm text-gray-500">
                Action
              </div>
            </div>
            {list?.map((data) => {
              return (
                <div className="grid grid-cols-4 gap-4 [&:nth-child(2n)]:bg-gray-100">
                  <div className="p-2 px-6  py-3 text-sm flex items-center">
                    {data.name || '-'}
                  </div>
                  <div className="p-2 px-6  py-3 text-sm flex items-center">
                    {data.email || '-'}
                  </div>
                  <div className={'p-2 px-6  py-3 text-sm flex items-center '}>
                    <span
                      className={
                        'px-4 py-1 inline-block rounded w-[100px] text-xs text-center ' +
                        (data.approved
                          ? 'text-white bg-green-500'
                          : ' text-white bg-yellow-400')
                      }>
                      {`${data.approved ? 'APPROVED' : 'PENDING'}`}
                    </span>
                  </div>
                  <div className="p-2 px-6">
                    {data.approved ? (
                      <button
                        className="p-2"
                        onClick={() => cancelApproval(data.id)}>
                        <FaTimes className="text-red-500" />
                      </button>
                    ) : (
                      <button
                        className="p-2 mr-2"
                        onClick={() => acceptRequest(data.id)}>
                        <FaCheck className="text-green-500" />
                      </button>
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

export default MyOffers;

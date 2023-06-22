import { Input } from '@components/common';
import { EmptyPanel, Loader } from '@components/ui';
import { Empty } from '@components/ui/icons';
import { messageService } from '@service/';
import { offerService } from '@service/';
import { useData } from '@store/providers/Provider';
import {
  offerStatus,
  propertyStatus,
  userType
} from '@utils/constants/types.contants';
import { useEffect, useState } from 'react';
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyMessageDetails = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useData();
  const isOwner = user?.role == userType.OWNER;

  const getAll = () => {
    setLoading(true);
    messageService.getAll().then((list) => {
      setLoading(false);
      setList(list);
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
        ) : (
          <div className="grid">
            {list?.map((data) => {
              return (
                <div className="grid grid-cols-4 gap-4 [&:nth-child(2n)]:bg-gray-100">
                  <div className="p-2 px-6  py-3 text-sm flex items-center">
                    {data.message || '-'}
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

export default MyMessageDetails;

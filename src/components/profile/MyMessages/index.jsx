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
import React, { useEffect, useState } from 'react';
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import { Link, Outlet, useParams } from 'react-router-dom';

const MyMessages = () => {
  const [list, setList] = useState([1]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useData();
  const { propertyId } = useParams();
  const isOwner = user?.role == userType.OWNER;

  const getAll = () => {
    setLoading(true);
    messageService.getAll().then((list) => {
      setLoading(false);
      setList(list || [1]);
    });
  };

  const sendMessage = () => {
    setLoading(true);
    messageService
      .send({
        message: message,
        recipient: 1,
        sender: user?.userId,
        property: parseInt(propertyId)
      })
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
    <div className="h-full">
      <div className="h-full">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-4 h-full">
            <div className="col-span-1 bg-gray-100 p-4 h-full">
              {list.length ? (
                list?.map((data) => {
                  return (
                    <div className="flex flex-col gap-4 [&:nth-child(2n)]:bg-gray-100">
                      <div className="p-2 px-6  py-3 text-sm flex items-center">
                        {data.property?.title || '-'}(
                        <span className="text-xs">
                          {data?.property?.user?.name}
                        </span>
                        )
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm py-4">No Messages</p>
              )}
            </div>
            <div className="col-span-3 h-full flex flex-col">
              <div className="flex-grow">
                <Outlet />
              </div>
              <div className="mt-auto p-4 bg-gray-100 flex">
                <textarea
                  placeholder="Type"
                  onChange={(e) => setMessage(e.target.value)}
                  className="p-4 text-sm outline-none border-2 w-full"></textarea>
                <button className="px-6" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMessages;

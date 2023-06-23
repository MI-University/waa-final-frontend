import { EmptyPanel, Loader } from '@components/ui';
import { Empty } from '@components/ui/icons';
import { propertyService } from '@service/';
import { messageService } from '@service/';
import { offerService } from '@service/';
import { useData } from '@store/providers/Provider';
import { paths } from '@utils/constants/paths.contants';
import {
  offerStatus,
  propertyStatus,
  userType
} from '@utils/constants/types.contants';
import { DebounceHook } from '@utils/debounce';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaCheck,
  FaPaperPlane,
  FaPlane,
  FaPlus,
  FaTimes
} from 'react-icons/fa';
import { Link, Outlet, useParams } from 'react-router-dom';

const MyMessages = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [messageDetails, setMessageDetails] = useState(null);
  const { user } = useData();
  const { propertyId } = useParams();
  const { debounce } = DebounceHook();
  const isOwner = user?.role == userType.OWNER;

  const getAll = () => {
    setLoading(true);
    messageService.getAll().then((list) => {
      setLoading(false);
      setList(list || []);
    });
  };

  const getPropertyDetails = () => {
    if (propertyId) {
      setLoading(true);
      propertyService.getOne(propertyId).then((data) => {
        setLoading(false);
        setPropertyDetails(data);
      });
    }
  };

  const getMessageDetails = () => {
    if (propertyId) {
      setLoading(true);
      messageService.getOne(propertyId).then((data) => {
        setLoading(false);
        setMessageDetails(data);
      });
    }
  };

  const recipientId = isOwner
    ? parseInt(propertyId) // actually this is userId
    : propertyDetails?.user?.id; // this is property owner id

  const sendMessage = () => {
    if (!propertyId) {
      giveError('Please select recepient');
      return;
    }
    if (!recipientId) {
      giveError('Recepient not found');
      return;
    }
    if (message) {
      setLoading(true);
      messageService
        .send({
          message: message,
          recipientId: recipientId,
          senderId: user?.userId,
          propertyId: isOwner
            ? list.find((p) => p.sender?.id === recipientId)?.property?.id
            : parseInt(propertyId)
        })
        .then(() => {
          setLoading(false);
          getAll();
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const onTypeMessage = (e) => {
    debounce(() => setMessage(e.target.value), 800);
  };

  const giveError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (isOwner) getMessageDetails();
    else getPropertyDetails();
  }, [propertyId]);

  const senderMap = {};

  list.forEach((m) => {
    if (isOwner) {
      const senderId =
        user?.userId == m.sender?.id ? m.recipient?.id : m.sender?.id;
      if (senderMap[senderId]) {
        senderMap[senderId] = {
          displayName: m.sender?.name,
          messages: [...(senderMap[m.sender.id]?.messages || []), m]
        };
      } else {
        senderMap[senderId] = {
          displayName: m.sender?.name,
          messages: [m]
        };
      }
    } else {
      if (senderMap[m.property?.id]) {
        senderMap[m.property?.id] = {
          displayName: m.property?.title,
          messages: [...(senderMap[m.property?.id]?.messages || []), m]
        };
      } else {
        senderMap[m.property?.id] = {
          displayName: m.property?.title,
          messages: [m]
        };
      }
    }
  });

  return (
    <div className="h-full">
      <div className="h-full">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-4 h-screen">
            <div className="col-span-1 bg-gray-100 p-4 h-full">
              {Object.keys(senderMap).length ? (
                Object.entries(senderMap)?.map(([id, data]) => {
                  return (
                    <div className="flex flex-col gap-4 [&:nth-child(2n)]:bg-gray-100">
                      <div className="p-2 px-6  py-3 text-sm flex items-center border-b border-gray-200">
                        <Link
                          to={paths.MY_MESSAGE_DETAILS?.replace(
                            ':propertyId',
                            `${id}`
                          )}>
                          {data?.displayName || '-'}
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-center text-gray-400 font-bold p-4">
                  No Messages
                </p>
              )}
            </div>
            <div className="col-span-3 h-full flex flex-col">
              <div className="flex-grow">
                <Outlet context={{ senderMap: senderMap }} />
              </div>
              <div
                className={
                  'mt-auto border-t p-4 flex' + (errorMessage ? ' pb-2' : '')
                }>
                <textarea
                  rows={1}
                  placeholder="Type message here..."
                  onChange={onTypeMessage}
                  className="p-3 px-4 h-20 max-h-[100px] mr-4 rounded-4xl outline-orange-200 outline-1 border-gray-200 text-sm border w-full"></textarea>
                <button
                  className="px-4 text-accent flex items-center"
                  onClick={sendMessage}>
                  <span className="mr-2 mt-1 text-gray-500 hover:border-orange-300 border-b-4">
                    Send
                  </span>
                  <FaPaperPlane />
                </button>
              </div>
              {errorMessage && (
                <p className="text-xs text-red-500 px-4 mb-4">{errorMessage}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMessages;

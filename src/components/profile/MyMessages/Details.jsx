import { EmptyPanel, Loader } from '@components/ui';
import { useData } from '@store/providers/Provider';
import {
  offerStatus,
  propertyStatus,
  userType
} from '@utils/constants/types.contants';
import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaPlus, FaTimes, FaUser } from 'react-icons/fa';
import { Link, useOutletContext, useParams } from 'react-router-dom';

const MyMessageDetails = () => {
  const [list, setList] = useState([]);
  const { user } = useData();
  const isOwner = user?.role == userType.OWNER;
  const { senderMap } = useOutletContext();
  const { propertyId } = useParams();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (senderMap && propertyId)
      setList(senderMap?.[propertyId]?.messages || []);
  }, [senderMap, propertyId]);

  const property = list[0]?.property;

  useEffect(() => {
    scrollRef?.current?.scrollTo({
      top: scrollRef?.current?.scrollHeight
    });
  }, [list]);

  return (
    <div className="h-full">
      <div className="h-full">
        {!list.length ? (
          <EmptyPanel />
        ) : (
          <div className="flex flex-col h-full">
            {isOwner && (
              <div className="grid-cols-1 pb-0 border-b">
                <div className="flex m-4">
                  <img
                    src={property?.images?.[0]}
                    alt=""
                    className="h-24 w-28 bg-gray-100"
                  />
                  <div className="p-2">
                    <h4 className="text-gray-500">{property?.title}</h4>
                    <h4 className="font-bold flex">${property?.price || 0}</h4>
                    <p className="text-xs">
                      {(property?.address?.street, property?.address?.city)}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex-grow relative">
              <div
                className="h-full overflow-auto pr-4 absolute w-full"
                ref={scrollRef}>
                {list?.map((data, i) => {
                  return (
                    <div
                      className={
                        'flex first:mt-6 last:mb-6 ' +
                        (data?.recipient?.id === user?.id
                          ? 'justify-start'
                          : 'justify-end')
                      }>
                      <div
                        className={
                          'p-2 px-6  py-2 text-sm flex items-center ' +
                          (data?.recipient?.id === user?.id
                            ? 'mr-6'
                            : 'ml-6 flex-row-reverse')
                        }>
                        <FaUser
                          className={
                            'p-3 h-10 w-10 text-gray-400 rounded-full flex justify-center items-center bg-gray-200 ' +
                            (data?.recipient?.id === user?.id ? 'mr-2' : 'ml-2')
                          }
                        />
                        {data.message || '-'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMessageDetails;

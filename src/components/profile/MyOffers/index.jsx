import { EmptyPanel, Loader } from '@components/ui';
import { Empty } from '@components/ui/icons';
import { offerService } from '@service/';
import { ownerService } from '@service/';
import { useData } from '@store/providers/Provider';
import { paths } from '@utils/constants/paths.contants';
import {
  offerStatus,
  propertyStatus,
  userType
} from '@utils/constants/types.contants';
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

  const acceptOffer = (id) => {
    setLoading(true);
    if (user?.role === userType.OWNER)
      offerService
        .acceptByOwner(id)
        .then(() => {
          setLoading(false);
          getAll();
        })
        .catch((error) => {
          setLoading(false);
        });
    else
      offerService
        .acceptByCustomer(id)
        .then(() => {
          setLoading(false);
          getAll();
        })
        .catch((error) => {
          setLoading(false);
        });
  };

  const cancelOffer = (id) => {
    setLoading(true);
    offerService
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
                Offer Amount
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
                    <Link
                      to={(isOwner
                        ? paths.MY_PROPERTY_DETAILS
                        : paths.PROPERTY_DETAILS
                      ).replace(':id', data?.property?.id)}>
                      {data.property?.title || '-'}
                    </Link>
                  </div>
                  <div className="p-2 px-6  py-3 text-sm flex items-center">
                    ${data.offerAmount || '-'}
                  </div>
                  <div className={'p-2 px-6  py-3 text-sm flex items-center '}>
                    <span
                      className={
                        'px-4 pt-1 leading-none inline-block rounded w-[120px] text-xs text-center ' +
                        `${data.status?.toLowerCase()}`
                      }>
                      {data.status}
                      {data?.status === offerStatus?.ACCEPTED && (
                        <small className="text-[8px] pb-[.5px] leading-none block">
                          by{' '}
                          {data?.property?.status === propertyStatus?.PENDING
                            ? 'owner'
                            : 'both'}
                        </small>
                      )}
                    </span>
                  </div>
                  <div className="p-2 px-6">
                    {data?.status !== offerStatus.CANCELLED && (
                      <>
                        {((isOwner &&
                          data?.property?.status ===
                            propertyStatus.AVAILABLE) ||
                          (!isOwner &&
                            data?.status === offerStatus?.ACCEPTED &&
                            data?.property?.status ===
                              propertyStatus?.PENDING)) && (
                          <button
                            className="p-2 mr-2"
                            onClick={() => acceptOffer(data.id)}>
                            <FaCheck className="text-green-500" />
                          </button>
                        )}
                        {((isOwner &&
                          data?.property?.status !== propertyStatus?.SOLD) ||
                          (!isOwner &&
                            data?.property?.status ===
                              (propertyStatus?.AVAILABLE ||
                                data?.property?.status ===
                                  propertyStatus?.PENDING))) && (
                          <button
                            className="p-2"
                            onClick={() => cancelOffer(data.id)}>
                            <FaTimes className="text-red-500" />
                          </button>
                        )}
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

export default MyOffers;

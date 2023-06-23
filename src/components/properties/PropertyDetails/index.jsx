import { Button } from '@components/common';
import { OfferForm } from '@components/offer';
import { Container, EmptyPanel, Loader } from '@components/ui';
import { propertyService } from '@service/';
import { useData } from '@store/providers/Provider';
import { paths } from '@utils/constants/paths.contants';
import { propertyStatus, userType } from '@utils/constants/types.contants';
import React, { useState, useEffect } from 'react';
import {
  FaBath,
  FaBed,
  FaChartArea,
  FaMap,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { MdOutlineMessage } from 'react-icons/md';
import { Navigate, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

const PropertyDetails = ({ forSeller = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const params = useParams();
  const { isAuthenticated, user, openModal, setModalContent } = useData();
  const isOwner = user?.role === userType.OWNER;
  const navigate = useNavigate();

  const getDetails = () => {
    if (params.id) {
      setLoading(true);
      propertyService.getOne(params.id).then((data) => {
        setLoading(false);
        setData(data);
        setCurrentImage(data?.images?.[0] || '');
      });
    }
  };

  const sendOffer = () => {
  if(isAuthenticated){
      setModalContent(<OfferForm data={data} />);
      openModal();
    } else {
      navigate('/login');
    }
  };

  const sendMessage = () => {
    if (isAuthenticated) {
      navigate(`${paths.MY_MESSAGES}/${data?.id}`);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    getDetails();
  }, [params.id]);

  return (
    <div className={forSeller ? 'seller-p-details' : ''}>
      <div>
        {loading ? (
          <Loader />
        ) : !data ? (
          <EmptyPanel />
        ) : (
          <>
            <div className="bg-gray-100/50 bg">
              <Container>
                <div className="grid gap-20 grid-cols-1 lg:grid-cols-2 py-20">
                  <div className="col-span-1 bg-white">
                    <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-md shadow">
                      <div className="col-span-4">
                        <img
                          src={currentImage}
                          alt={data?.title}
                          className="w-full h-[400px] object-cover bg-gray-200 overflow-hidden border-gray-400"
                        />
                      </div>
                      <div className="col-span-4 grid gap-4 grid-cols-4">
                        {data?.images?.map((imageUrl) => (
                          <img
                            src={imageUrl}
                            alt={data?.title}
                            className="w-full h-28 bg-gray-200 object-cover cursor-pointer"
                            onClick={() => setCurrentImage(imageUrl)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="mt-4">
                      <span className={data?.status?.toLowerCase()}>
                        {data?.status}
                      </span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-600 my-6">
                      {data?.title}
                    </h2>
                    <div className="mb-4 flex items-baseline text-gray-400">
                      <FaMapMarkerAlt className="mr-2 pt-1 h-5 w-5" />{' '}
                      <div className="mb-1">
                        {data?.address?.street},
                        <div>
                          {data?.address?.city}, {data?.address?.zip},{' '}
                          {data?.address?.state}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end my-12 mt-8">
                      <span className="inline-block text-lg pb-[2px] text-gray-500">
                        $
                      </span>
                      <h1 className="text-5xl px-2 font-bold text-accent">
                        {data?.price || '00'}
                        <span className="text-sm text-gray-400">.00</span>
                      </h1>
                    </div>
                    <div className="mb-4">
                      <ul className="flex items-center flex-wrap">
                        {data?.noOfBedrooms && (
                          <li className="flex mb-2 items-center text-gray-400 text-sm px-2 pr-4 leading-none border-r-2 border-gray-300">
                            <FaBed className="mr-2 text-lg text-gray-400" />
                            Bedrooms{' '}
                            <span className="ml-2 font-bold text-gray-800">
                              {data?.noOfBedrooms}
                            </span>
                          </li>
                        )}
                        {data?.noOfBathrooms && (
                          <li className="flex mb-2 items-center text-gray-400 text-sm px-2 pr-4 leading-none border-r-2 border-gray-300">
                            <FaBath className="mr-2 text-lg text-gray-400" />
                            Bathrooms{' '}
                            <span className="ml-2 font-bold text-gray-800">
                              {data?.noOfBathrooms}
                            </span>
                          </li>
                        )}
                        {data?.plotSize && (
                          <li className="flex mb-2 items-center text-gray-400 text-sm px-2 pr-4 leading-none border-r-2 border-gray-300">
                            <FaMap className="mr-2 text-lg text-gray-400" />
                            Plot size{' '}
                            <span className="ml-2 font-bold text-gray-800">
                              {data?.plotSize}
                            </span>
                          </li>
                        )}

                        {data?.area && (
                          <li className="flex mb-2 items-center text-gray-400 text-sm px-2 pr-4 leading-none border-r-2 border-gray-300">
                            <FaChartArea className="mr-2 text-lg text-gray-400" />
                            Area{' '}
                            <span className="ml-2 font-bold text-gray-800">
                              {data?.area}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                    {forSeller ? (
                      <></>
                    ) : (
                      !isOwner && (
                        <div className="mb-4 flex items-center mt-8">
                          {data?.status !== propertyStatus.CONTINGENT &&
                            data?.status !== propertyStatus.SOLD && (
                              <Button
                                outlined
                                className="mr-4 bg-accent text-white"
                                onClick={sendOffer}>
                                Send Offer
                              </Button>
                            )}
                          <Button
                            outlined
                            className="flex items-center !px-5"
                            onClick={sendMessage}>
                            <MdOutlineMessage className="text-sm mr-2" />
                            <span>Send Message</span>
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Container>
            </div>

            <div className="py-12 min-h-[300px]">
              <Container>
                <div className="col-span-2x">
                  <h2 className="text-2xl font-bold text-gray-600 mb-6">
                    Description
                  </h2>
                  <div>
                    {data?.description ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data?.description || ''
                        }}
                      />
                    ) : (
                      <span className="text-gray-400">No description</span>
                    )}
                  </div>
                </div>
              </Container>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;

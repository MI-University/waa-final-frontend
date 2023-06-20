import { EmptyPanel, Loader } from '@components/ui';
import { propertyService } from '@service/';
import React, { useState, useEffect } from 'react';
import { FaMapMarker, FaMapMarkerAlt, FaMapPin } from 'react-icons/fa';
import { useParams } from 'react-router';
import s from './PropertyDetails.module.css';

const PropertyDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const params = useParams();

  const getDetails = () => {
    if (params.id) {
      setLoading(true);
      propertyService.getOne(params.id).then((res) => {
        setLoading(false);
        setData(res.data);
      });
    }
  };

  useEffect(() => {
    getDetails();
  }, [params.id]);

  return (
    <div className="">
      <div>
        {loading ? (
          <Loader />
        ) : data ? (
          <EmptyPanel />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 py-6">
            <div className="col-span-1">
              <div className="grid grid-cols-4">
                <div className="col-span-4">
                  <img src={data?.images[0]} alt={data?.title} />
                </div>
                <div className="col-span-4 grid gap-2 grid-cols-4">
                  {data?.images?.map((imageUrl) => (
                    <img src={imageUrl} alt={data?.title} />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <h4>{data?.name}</h4>
              <div className="flex items-end mb-4">
                <span className="inline-block text-lg pb-[2px] text-gray-500">
                  $
                </span>
                <h1 className="text-4xl font-bold">{data?.price || '00.00'}</h1>
              </div>
              <div className="mb-4">
                <ul className="flex items-center">
                  {data?.size && (
                    <li className="px-4 border-r-2 border-gray-300">
                      {data?.size}
                    </li>
                  )}
                  {data?.size && (
                    <li className="px-4 border-r-2 border-gray-300">
                      {data?.size}
                    </li>
                  )}
                </ul>
              </div>
              <div className="mb-4">
                <FaMapMarkerAlt /> {data?.address}
              </div>
            </div>
            <div className="col-span-2"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;

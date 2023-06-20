import { propertyService } from '@service/';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import s from './PropertyDetails.module.css';

const PropertyDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const params = useParams();

  const getDetails = () => {
    if (params.id) {
      setLoading(true);
      propertyService.getOne(params.id).then((data) => {
        setLoading(false);
        setData(data);
      });
    }
  };

  useEffect(() => {
    getDetails();
  }, [params.id]);

  return (
    <div className="">
      <div className="grid  grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1">
          <img src={data?.images[0]} alt={data?.title} />
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
};

export default PropertyDetails;

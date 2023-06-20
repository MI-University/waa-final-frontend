import PropertyDetails from '@components/properties/PropertyDetails';
import { propertyService } from '@service/';
import { useEffect, useState } from 'react';

const MyPropertyDetails = () => {
  const [list, setList] = useState([]);

  const getAll = () => {
    propertyService.getAll().then((data) => setList(data));
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <h2 className="p-title">My Property Details</h2>
      <PropertyDetails />
    </div>
  );
};

export default MyPropertyDetails;

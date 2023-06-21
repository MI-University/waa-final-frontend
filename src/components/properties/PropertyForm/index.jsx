import { Input, Button, Form } from '@components/common';
import { propertyService } from '@service/';
import { useData } from '@store/providers/Provider';
import { userType } from '@utils/constants/types.contants';
import { isValidUrl } from '@utils/helpers/validation.helpers';
import React, { useState, useRef, useEffect } from 'react';
import {
  FaUser,
  FaEnvelopeOpen,
  FaLock,
  FaPlus,
  FaMinus
} from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import s from './PropertyForm.module.css';

const PropertyForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ success: false, text: '' });
  const [role, setRole] = useState(userType.CUSTOMER);
  const [images, setImages] = useState([Date.now()]);
  const [data, setData] = useState(null);

  const form = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = (body) => {
    setLoading(true);
    const readyData = {
      ...body,
      address: {
        id: data?.address?.id,
        street: body?.street,
        zip: body?.zip,
        city: body?.city,
        state: body?.state
      }
    };
    if (id) {
      propertyService
        .updateOne(id, readyData)
        .then((resData) => {
          setLoading(false);
          setMessage({ success: true, text: 'Updated successfully' });
        })
        .catch((error) => {
          setLoading(false);
          setMessage({ success: false, text: error.message });
        });
    } else {
      propertyService
        .addOne(readyData)
        .then((resData) => {
          setLoading(false);
          setMessage({ success: true, text: 'Added successfully' });
        })
        .catch((error) => {
          setLoading(false);
          setMessage({ success: false, text: error.message });
        });
    }
  };

  const getDetails = () => {
    if (id) {
      setLoading(true);
      propertyService.getOne(id).then((resData) => {
        setLoading(false);
        setData(resData);
        setImages(resData?.images || [Date.now()]);
      });
    }
  };

  const add = () => {
    setImages((prevImages) => {
      return [...prevImages, Date.now()];
    });
  };

  const remove = (index) => {
    if (images.length > 1) {
      setImages((prevImages) => {
        return prevImages.filter((_, i) => i !== index);
      });
    }
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  return (
    <div className="w-full mt-6">
      <div>
        <div>
          <Form name="registerForm" doSubmit={onFinish} ref={form}>
            <div>
              <div className="mb-6">
                <h4 className="mb-4 text-sm font-bold mt-5">Basic Info</h4>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  <Input
                    name="title"
                    placeholder="Type title"
                    label="Title"
                    defaultValue={data?.title}
                  />
                  <Input
                    type="number"
                    name="price"
                    placeholder="Type price"
                    label="Price"
                    defaultValue={data?.price}
                  />
                </div>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  <Input
                    type="number"
                    name="noOfBedrooms"
                    placeholder="i.e 3"
                    label="No of Bedrooms"
                    defaultValue={data?.noOfBedrooms}
                  />
                  <Input
                    type="number"
                    name="noOfBathrooms"
                    placeholder="i.e 2"
                    label="No of Bathrooms"
                    defaultValue={data?.noOfBathrooms}
                  />
                </div>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  <Input
                    type="number"
                    name="plotSize"
                    placeholder="i.e 25000 sqft"
                    label="Plot size"
                    defaultValue={data?.plotSize}
                  />
                  <Input
                    type="number"
                    name="area"
                    placeholder="i.e 2000 sqft"
                    label="Area"
                    defaultValue={data?.area}
                  />
                </div>

                <h4 className="mb-4 text-sm font-bold mt-5">Address</h4>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  <Input
                    name="street"
                    placeholder="Type street"
                    label="Street"
                    defaultValue={data?.address?.street}
                  />
                  <Input
                    type="number"
                    name="zip"
                    placeholder="Type ZIP"
                    label="ZIP"
                    defaultValue={data?.address?.zip}
                  />
                </div>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  <Input
                    name="city"
                    placeholder="Type city"
                    label="City"
                    defaultValue={data?.address?.city}
                  />
                  <Input
                    name="state"
                    placeholder="Type state"
                    label="State"
                    defaultValue={data?.address?.state}
                  />
                </div>

                <h4 className="mb-4 text-sm font-bold mt-5">Description</h4>
                <div className="grid gap-4 grid-cols-1 mb-4">
                  <textarea
                    name="description"
                    className="p-4 border outline-accent"
                    defaultValue={data?.description || ''}
                    placeholder="Type description here..."></textarea>
                </div>

                <h4 className="mb-4 text-sm font-bold mt-5">Images</h4>
                <div className="grid gap-0 grid-cols-1">
                  {images.map((url, i) => (
                    <div key={i} className="flex items-center">
                      <Input
                        name="images[]"
                        placeholder="Url"
                        className="w-full flex-grow"
                        defaultValue={isValidUrl(url) ? url : ''}
                      />
                      {images.length - 1 === i ? (
                        <button
                          type="button"
                          className="mb-4 p-4 px-6"
                          onClick={() => add()}>
                          <FaPlus />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="mb-4 p-4 px-6"
                          onClick={() => remove(i)}>
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {message?.text && (
                <p
                  className={
                    'text-sm py-2 mb-4 px-4 rounded shadow-sm shadow-gray-200 ' +
                    (message?.success
                      ? 'text-green-500 bg-green-100'
                      : 'text-red-500 bg-red-100')
                  }>
                  {message?.text}
                </p>
              )}
              <Button
                type="primary"
                htmlType="submit"
                className=""
                loading={loading}>
                {id ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;

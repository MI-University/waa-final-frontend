import { Input, Button, Form } from '@components/common';
import { propertyService } from '@service/';
import { useData } from '@store/providers/Provider';
import { userType } from '@utils/constants/types.contants';
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

  const onFinish = (data) => {
    setLoading(true);
    const readyData = {
      ...data,
      address: {
        street: data?.street,
        zip: data?.zip,
        city: data?.city,
        state: data?.state
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
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  <Input name="title" placeholder="Type title" label="Title" />
                  <Input
                    type="number"
                    name="price"
                    placeholder="Type price"
                    label="Price"
                  />
                </div>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  <Input
                    type="number"
                    name="noOfBedrooms"
                    placeholder="i.e 3"
                    label="No of Bedrooms"
                  />
                  <Input
                    type="number"
                    name="noOfBathrooms"
                    placeholder="i.e 2"
                    label="No of Bathrooms"
                  />
                </div>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  <Input
                    type="number"
                    name="plotSize"
                    placeholder="i.e 25000 sqft"
                    label="Plot size"
                  />
                  <Input
                    type="number"
                    name="area"
                    placeholder="i.e 2000 sqft"
                    label="area"
                  />
                </div>

                <h4 className="mb-4 text-sm font-bold mt-5">Address</h4>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  <Input
                    name="street"
                    placeholder="Type street"
                    label="Street"
                  />
                  <Input
                    type="number"
                    name="zip"
                    placeholder="Type ZIP"
                    label="ZIP"
                  />
                </div>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  <Input name="city" placeholder="Type city" label="City" />
                  <Input name="state" placeholder="Type state" label="State" />
                </div>

                <h4 className="mb-4 text-sm font-bold mt-5">Description</h4>
                <div className="grid gap-4 grid-cols-1 mb-4">
                  <textarea
                    className="p-4 border outline-accent"
                    placeholder="Type description here..."></textarea>
                </div>

                <h4 className="mb-4 text-sm font-bold mt-5">Images</h4>
                <div className="grid gap-0 grid-cols-1">
                  {images.map((_, i) => (
                    <div key={i} className="flex items-center">
                      <Input
                        name="images"
                        placeholder="Url"
                        className="w-full flex-grow"
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
                    'text-sm pb-2 ' +
                    (message?.success ? 'text-green-500' : 'text-red-500')
                  }>
                  {message?.text}
                </p>
              )}
              <Button
                type="primary"
                htmlType="submit"
                className=""
                loading={loading}>
                Create
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;

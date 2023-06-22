import { Input, Button, Form } from '@components/common';
import { offerService } from '@service/';
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
import s from './OfferForm.module.css';

const OfferForm = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ success: false, text: '' });
  const { closeModal, user } = useData();
  const params = useParams();

  const onFinish = (body) => {
    if (data?.id) {
      setLoading(true);
      const readyData = {
        id: user?.userId,
        offerAmount: body?.offerAmount,
        propertyId: data?.id,
        details: body.details
      };
      offerService
        .addOne(readyData)
        .then((resData) => {
          setLoading(false);
          setMessage({ success: true, text: 'Offer sent successfully' });
        })
        .catch((error) => {
          setLoading(false);
          setMessage({ success: false, text: error.message });
        });
    }
  };

  return (
    <div>
      <div>
        <div>
          <Form doSubmit={onFinish}>
            <div>
              <div className="mb-6">
                <h4 className="mb-6 text-lg text-center font-bold">Offer</h4>
                <div className="grid gap-4 grid-cols-1">
                  <Input
                    type="number"
                    name="offerAmount"
                    placeholder="Type amount"
                    label="Offer Amount"
                    defaultValue={data?.price}
                  />
                  <textarea
                    name="details"
                    className="p-4 border outline-accent"
                    rows={3}
                    placeholder="Type details here..."></textarea>
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
              <div className="text-right">
                <Button
                  type="primary"
                  htmlType="submit"
                  className=""
                  loading={loading}
                  size="sm">
                  Send
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OfferForm;

import s from './Register.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@components/ui';
import { Button, Input } from '@components/common';
import { FaEnvelopeOpen, FaLock, FaMobileAlt, FaUser } from 'react-icons/fa';
import { Form } from '@components/common';
import { authService } from '@service';
import { useData } from '@store/providers/Provider';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const form = useRef(null);
  const navigate = useNavigate();
  const { registrationSuccess } = useData();

  const onFinish = (data) => {
    authService
      .register(data)
      .then((resData) => {
        registrationSuccess(resData);
        navigate('/');
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Registration</h2>
      <div>
        <div>
          <Form name="registerForm" doSubmit={onFinish} ref={form}>
            <div>
              <div className="mb-6">
                <Input
                  name="name"
                  prefix={<FaUser className="site-form-item-icon" />}
                  placeholder="Enter Your Name"
                  label="Name"
                />
                <Input
                  name="email"
                  prefix={<FaEnvelopeOpen className="site-form-item-icon" />}
                  placeholder="Enter Email"
                  label="Email"
                />
                <Input
                  name="password"
                  prefix={<FaLock className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  label="Password"
                />
              </div>

              {message && (
                <p className="text-red-500 text-sm pb-2">{message}</p>
              )}
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button w-full"
                loading={loading}>
                Proceed
              </Button>

              <div className="flex justify-between mt-6">
                <div className="text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold text-black">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

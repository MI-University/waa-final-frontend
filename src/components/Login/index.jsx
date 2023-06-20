import s from './Login.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@components/ui';
import { Button, Input } from '@components/common';
import { FaEnvelopeOpen, FaLock, FaMobileAlt, FaUser } from 'react-icons/fa';
import { Form } from '@components/common';
import { authService } from '@service';
import { useData } from '@store/providers/Provider';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const form = useRef(null);
  const navigate = useNavigate();
  const { loginSuccess } = useData();

  const onFinish = (data) => {
    setLoading(true);
    authService
      .login(data)
      .then((resData) => {
        loginSuccess(resData);
        navigate('/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.message);
      });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>
      <div>
        <div>
          <Form name="registerForm" doSubmit={onFinish} ref={form}>
            <div>
              <div className="mb-6">
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
                  Don't have any account?{' '}
                  <Link to="/register" className="font-bold text-black">
                    Register
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

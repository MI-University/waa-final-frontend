import s from './Register.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@components/ui';
import { Button, Input } from '@components/common';
import { FaEnvelopeOpen, FaLock, FaMobileAlt, FaUser } from 'react-icons/fa';
import { Form } from '@components/common';
import { authService } from '@service';
import { useData } from '@store/providers/Provider';
import { userType } from '@utils/constants/types.contants';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [role, setRole] = useState(userType.CUSTOMER);
  const form = useRef(null);
  const navigate = useNavigate();
  const { registrationSuccess } = useData();

  const onFinish = (data) => {
    setLoading(true);
    authService
      .register(data)
      .then((resData) => {
        registrationSuccess(resData);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.message);
      });
  };

  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
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
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <Input
                      type="radio"
                      name="role"
                      value={userType.CUSTOMER}
                      onChange={onRoleChange}
                      checked={role == userType.CUSTOMER}
                    />
                    User
                  </div>
                  <div className="flex items-center">
                    <Input
                      type="radio"
                      name="role"
                      value={userType.OWNER}
                      onChange={onRoleChange}
                      checked={role == userType.OWNER}
                    />
                    Seller
                  </div>
                </div>
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
                    Signin
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

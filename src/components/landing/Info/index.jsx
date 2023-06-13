import React, { useMemo } from 'react';
import Maps from '../../../assets/images/HugeGlobal.svg';
import { motion } from 'framer-motion';
import getScrollAnimation from '@utils/getScrollAnimation';
import { Button, ScrollAnimationWrapper } from '@components/common';
import s from './Info.module.css';
import { useNavigate } from 'react-router-dom';

const Info = () => {
  const navigate = useNavigate();
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="bg-white w-full" id="pricing">
      <div className="pb-14 px-6 sm:px-8 lg:px-16 flex flex-col w-full text-center justify-center">
        <div
          className="flex flex-col w-full max-w-screen-xl mx-auto"
          id="testimoni">
          <ScrollAnimationWrapper className="relative w-full">
            <motion.div variants={scrollAnimation} custom={{ duration: 3 }}>
              <div
                className={
                  s.infoTile +
                  ' absolute rounded-2xl py-6 sm:py-12 px-4 sm:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center z-10 bg-white'
                }>
                <div className="flex flex-col text-left w-10/12 sm:w-7/12 lg:w-5/12 mb-6 sm:mb-0">
                  <h2 className="font-bold text-gray-500">Join Now!</h2>
                  <p className="text-sm text-gray-400">
                    Let's subscribe with us and find the solution.{' '}
                  </p>
                </div>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Get Started
                </Button>
              </div>
              <div
                className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-60 sm:h-56 top-0 mt-8 mx-auto left-0 right-0"
                style={{ filter: 'blur(114px)' }}></div>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default Info;

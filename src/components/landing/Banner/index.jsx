import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, ScrollAnimationWrapper } from '@components/common';
import { bannerStatistics } from '@data/dynamic';
import s from './Banner.module.css';
import data from '@data/static.json';
import { LoadingCircle } from '@components/ui/icons';
import getScrollAnimation from '@utils/getScrollAnimation';
import homeImg from '@assets/images/home.svg';

const Banner = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const navigate = useNavigate();
  const bannerData = data.bannerData;

  return (
    <div className="bg-white mb-12 md:mb-0">
      <div className="bg-white max-w-screen-xl mt-6 lg:px-8 xl:px-16 mx-auto">
        <ScrollAnimationWrapper>
          <motion.div custom={{ duration: 2 }} variants={scrollAnimation}>
            <div
              className={s.searchBanner}
              style={{
                backgroundImage: `url(${homeImg})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom'
              }}>
              <div className="container">
                <div className="lg:w-3/5 mx-auto flexx relative z-30 flex-col lg:flex-row items-center py-28 pb-16 lg:h-auto justify-center lg:py-28">
                  <motion.div
                    custom={{ duration: 3 }}
                    variants={scrollAnimation}>
                    <div className="flex-grow pb-0 lg:pb-40 text-center mb-20 lg:mb-0 flex flex-col items-center justify-center">
                      <div className="mb-8 flexx text-center flex-col items-center justify-center">
                        <h2
                          className="text-gray-500 leading-10 font-bold text-5xl px-6 lg:px-0 flex flex-col lg:text-7xl font-extrabold mb-12"
                          dangerouslySetInnerHTML={{
                            __html: bannerData.title
                          }}></h2>
                        <p
                          className="text-white text-sm px-6 lg:px-0 lg:text-base font-extralight lg:my-8 mb-12"
                          style={{ color: 'white' }}>
                          {bannerData?.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>

        <div
          className="relative w-full flex shadow-xl shadow-gray-200 rounded-lg bg-white"
          style={{ marginBottom: -80 }}>
          <ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
            {bannerStatistics.map((listUsers, index) => (
              <motion.div
                className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
                key={index}
                custom={{ duration: 2 + index }}
                variants={scrollAnimation}>
                <div className="flex mx-auto w-40 sm:w-auto">
                  <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                    <img src={listUsers.icon} className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xl text-black-600 font-bold">
                      {listUsers.number}
                    </p>
                    <p className="text-lg text-black-500">{listUsers.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </ScrollAnimationWrapper>
          <div
            className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
            style={{ filter: 'blur(114px)' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

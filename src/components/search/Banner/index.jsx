import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, ScrollAnimationWrapper } from '@components/common';
import { bannerStatistics } from '@data/dynamic';
import s from './Banner.module.css';
import data from '@data/static.json';
import { LoadingCircle } from '@components/ui/icons';
import getScrollAnimation from '@utils/getScrollAnimation';
import homeImg from '@assets/images/home-5.jpg';

const Banner = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const navigate = useNavigate();
  const searchBannerData = data.searchBannerData;

  return (
    <div className="bg-white mb-6 md:mb-4">
      <div className="bg-white">
        <div
          className={s.searchBanner}
          style={{
            backgroundImage: `url(${homeImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 20%'
          }}>
          <div className={s.bannerMask} />
          <div className="container max-w-screen-xl mx-auto relative z-50">
            <div className="lg:w-3/5 mx-auto flexx relative z-30 flex-col lg:flex-row items-center lg:h-auto justify-center py-8 lg:py-16 mt-16 lg:mt-18">
              <div className="flex-grow text-center flex flex-col items-center justify-center">
                <div className="flexx text-center flex-col items-center justify-center">
                  <h2
                    className="text-white lg:leading-10 font-bold text-xl px-6 lg:px-0 flex flex-col lg:text-4xl font-extrabold"
                    dangerouslySetInnerHTML={{
                      __html: searchBannerData.title
                    }}></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

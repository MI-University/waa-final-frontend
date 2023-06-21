import { Container } from '@components/ui';
import {
  FaBuyNLarge,
  FaGripVertical,
  FaHandLizard,
  FaHandMiddleFinger,
  FaMoneyBill,
  FaMoneyCheck,
  FaRegFileArchive,
  FaRegGrinTears,
  FaRegHandshake,
  FaRegMoneyBillAlt,
  FaSellcast,
  FaWind
} from 'react-icons/fa';
import s from './Service.module.css';
import Img from '@assets/images/house/final.png';
import React, { useMemo } from 'react';
import { ScrollAnimationWrapper } from '@components/common';
import { motion } from 'framer-motion';
import getScrollAnimation from '@utils/getScrollAnimation';

const Service = () => {
  const scrollAnimation = useMemo(
    () => getScrollAnimation('x', 250, 'ease'),
    []
  );
  const services = [
    {
      title: 'Buying',
      description: 'Buy your dream home in a convenient manner',
      icon: <FaRegMoneyBillAlt className="text-xl" />
    },
    {
      title: 'Selling',
      description: 'Sell your home with a great support',
      icon: <FaWind className="text-xl" />
    },
    {
      title: 'Renting',
      description: 'Rent your home from a variety of options',
      icon: <FaRegHandshake className="text-xl" />
    }
  ];
  return (
    <div id="feature" className="bg-white overflow-hidden">
      <Container>
        <div className="grid gap-3 grid-cols-12">
          <div className="col-span-12 lg:col-span-5">
            <div className="relative flex items-end pt-12 h-full mr-6 mb-4">
              <span className={s.buyCircle}>
                Buy <span className="text-cyan-400 ml-1">90%</span>
              </span>
              <span className={s.sellCircle}>
                Sell <span className="text-red-400 ml-1">99%</span>{' '}
              </span>
              <span className={s.rentCircle}>
                Rent <span className="text-orange-400 ml-1">80%</span>{' '}
              </span>
              <img
                src={Img}
                width={650}
                height={678}
                alt="Service img"
                className={s.serviceImg}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center mb-8 py-8 lg:py-20">
            <h1 className="font-bold text-5xl lg:text-6xl mb-6">
              Your Dream <span className="text-accent">Home </span>
            </h1>

            <h4 className="text-secondary mb-6 ml-4">
              Submit your request and Get Quotations from Landers
            </h4>
            <ScrollAnimationWrapper>
              <div className="grid gap-2 container">
                {services.map(({ title, description, icon }, index) => (
                  <motion.div
                    custom={{ offscreen: { x: 1 }, duration: index / 2 + 0.5 }}
                    variants={scrollAnimation}
                    className="col-span-12 lg:col-span-6"
                    key={String(index)}>
                    <div className="px-6 py-4 shadow-gray-200 shadow-lg rounded-xl flex items-center">
                      <div className="bg-accent rounded-full h-12 w-12 text-white flex items-center justify-center">
                        {icon}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flex: 1,
                          flexDirection: 'column'
                        }}>
                        <h6
                          className="mb-1 pl-4 text-orange-400 uppercase"
                          style={{
                            fontSize: '1rem'
                          }}>
                          {title}
                        </h6>
                        <h4 className="text-gray-400 pl-4 text-sm">
                          {' '}
                          {description}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Service;

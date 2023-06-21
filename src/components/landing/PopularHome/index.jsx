import React, { FC, useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import { FaAngleRight, FaAngleLeft, FaArrowRight } from 'react-icons/fa';
import Container from '@components/ui/Container';
import ImgHome1 from '../../../assets/images/home-6.png';
import ImgHome2 from '../../../assets/images/home-7.png';
import { Link } from 'react-router-dom';
import { PropertyCard } from '@components/properties';
import { propertyService } from '@service/';

const SliderArrow = (props) => {
  const { onClick, type, className } = props;
  return (
    <button
      style={{
        right: type === 'prev' ? '60px !important' : '0 !important',
        zIndex: 10
      }}
      onClick={onClick}
      className={
        className +
        ' shadow-md text-lg rounded-full bg-white p-4 mr-2 hover:bg-accent hover:text-white'
      }>
      {type === 'next' ? <FaAngleRight /> : <FaAngleLeft />}
    </button>
  );
};

const PopularHomes = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const mqlRef = useRef(null);

  const getAll = () => {
    setLoading(true);
    propertyService.getAll().then((data) => {
      setLoading(false);
      setList(data);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    mqlRef.current = window.matchMedia('(max-width: 600px)');
  }, []);

  const sliderConfig = {
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: mqlRef.current?.matches ? 1 : 3,
    slidesToScroll: 1,
    prevArrow: <SliderArrow type="prev" />,
    nextArrow: <SliderArrow type="next" />,
    dots: true,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: () => (
      <div
        style={{
          height: 8,
          width: 30,
          backgroundColor: 'divider',
          display: 'inline-block',
          borderRadius: 4
        }}
      />
    )
  };

  return (
    <div
      id="popular-homes"
      className="slick-courses bg-light py-20 lg:pb-32 lg:py-28">
      <Container>
        <div className="grid grid-cols-12 gap-2 mt-12">
          <div className="col-span-12 lg:col-span-3">
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'start'
              }}
              className="flex flex-col justify-center">
              <h1 className="font-bold text-4xl lg:text-6xl mb-4">
                Most Popular Homes
              </h1>
              <div>
                <Link
                  to="/search"
                  className="text-gray-400 flex items-center carot-shift">
                  View more{' '}
                  <FaAngleRight className="text-accent px-1 w-5 hover:pl-2 transition-all duration-300 mt-[2px]" />{' '}
                </Link>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <Slider {...sliderConfig}>
              {list?.slice(0, 8)?.map((item) => (
                <PropertyCard key={String(item.id)} item={item} />
              ))}
            </Slider>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PopularHomes;

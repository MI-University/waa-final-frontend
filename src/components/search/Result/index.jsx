import React, { FC, useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import { FaAngleRight, FaAngleLeft, FaArrowRight } from 'react-icons/fa';
import Container from '@components/ui/Container';
import ImgHome1 from '../../../assets/images/home-6.png';
import ImgHome2 from '../../../assets/images/home-7.png';
import { Link, useLocation } from 'react-router-dom';
import { PropertyCard } from '@components/properties';
import { propertyService } from '@service/';
import { EmptyPanel } from '@components/ui';

export const data = [
  {
    id: 1,
    cover: ImgHome1,
    title: '1039 Milson Ln, Nolensville, TN 37135',
    rating: 5,
    ratingCount: 8,
    price: 25000000,
    category: 'Beginner'
  },
  {
    id: 2,
    cover: ImgHome2,
    title: '1039 Milson Ln, Nolensville, TN 37135',
    rating: 5,
    ratingCount: 15,
    price: 20000000,
    category: 'Intermediate'
  },
  {
    id: 3,
    cover: ImgHome1,
    title: '1039 Milson Ln, Nolensville, TN 37135',
    rating: 4,
    ratingCount: 7,
    price: 30000000,
    category: 'Beginner'
  },
  {
    id: 4,
    cover: ImgHome2,
    title: '1039 Milson Ln, Nolensville, TN 37135',
    rating: 4,
    ratingCount: 12,
    price: 30000000,
    category: 'Intermediate'
  }
];

const Result = ({ searchResult = false }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const mqlRef = useRef(null);
  const getAll = () => {
    setLoading(true);
    propertyService.getAll().then((list) => {
      setLoading(false);
      setList(list);
    });
  };
  useEffect(() => {
    getAll();
  }, []);
  useEffect(() => {
    mqlRef.current = window.matchMedia('(max-width: 600px)');
  }, []);

  return (
    <div className="bg-gray-100 pb-20 border-b">
      <Container>
        <div className="pt-6">
          <div className="col-span-12 lg:col-span-3 mt-6 px-2">
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'start'
              }}
              className="flex flex-col justify-center">
              <h1 className="font-bold text-lg text-gray-500 mb-4">
                {searchResult ? 'Search Result' : 'Properties'}
              </h1>
            </div>
          </div>

          <div className="grid gap-0 lg:gap-2 grid-cols-2 lg:grid-cols-4">
            {list?.length ? (
              list.map((item) => (
                <PropertyCard
                  isSearchResult
                  key={String(item.id)}
                  item={item}
                />
              ))
            ) : (
              <EmptyPanel className="col-span-2 lg:col-span-4" />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Result;

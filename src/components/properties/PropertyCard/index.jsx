import { Button, Rating } from '@components/common';
import { propertyService } from '@service/';
import { useData } from '@store/providers/Provider';
import { propertyStatus } from '@utils/constants/types.contants';
import React, { useMemo } from 'react';
import {
  FaArrowRight,
  FaCircle,
  FaEdit,
  FaHeart,
  FaStar,
  FaTrash
} from 'react-icons/fa';
import { MdFormatListBulleted } from 'react-icons/md';
import { Link } from 'react-router-dom';
import s from './PropertyCard.module.css';

const PropertyCard = ({
  item,
  isSearchResult = true,
  forSeller = false,
  refetch = () => {}
}) => {
  const { saveProperty, unsaveProperty, properties } = useData();
  const toggleProperty = () => {
    if (item) {
      if (isSaved) unsaveProperty(item.id);
      else saveProperty(item);
    }
  };
  const onDelete = () => {
    if (item?.id) {
      propertyService
        .deleteOne(item?.id)
        .then((res) => {
          refetch();
        })
        .catch(() => {});
    }
  };

  const isSaved = useMemo(() => {
    return item.id && !!properties?.find((p) => p.id == item.id);
  }, [properties]);
  const isPending = item?.status == propertyStatus.PENDING;
  const ConditionalLink = ({ children }) => {
    return forSeller ? (
      <div>{children}</div>
    ) : (
      <Link
        to={
          forSeller
            ? `/dashboard/my-properties/${item?.id}`
            : `/properties/${item?.id}`
        }
        className={s.cardImgArea}>
        {children}
      </Link>
    );
  };

  return (
    <div className={'px-1 lg:px-2 py-1 lg:py-4 h-full'}>
      <div
        className={
          s.homeCard +
          'p-2 lg:p-4 rounded-md bg-white relative transition-all h-full hover:shadow-lg' +
          (isSearchResult ? ' shadow-md' : '') +
          (forSeller ? ' appear-actions' : '')
        }>
        {forSeller && !isPending && (
          <div className="action-container">
            <Link
              to={`/dashboard/my-properties/${item?.id}/update`}
              className="edit">
              <FaEdit />
            </Link>
            <button className="delete" onClick={onDelete}>
              <FaTrash />
            </button>
          </div>
        )}
        <div className="mb-2 bg-gray-100 overflow-hidden rounded-sm leading-0">
          <ConditionalLink>
            <img
              src={item.images?.[0]}
              width={760}
              height={760}
              alt={'Course ' + item.id}
            />
          </ConditionalLink>
        </div>
        <div className="mb-2">
          <div
            className={`${(item?.status || 'UNAVAILABLE')?.toLowerCase()}-txt`}>
            <FaCircle className="text-xs mr-2" />{' '}
            {item?.status || 'UNAVAILABLE'}
          </div>
          <h4 className="mb-2">{item.title}</h4>
          <div className="flex items-center justify-between">
            <div
              className="flex items-center mr-4"
              style={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={item.rating} />
              <span>({item.ratingCount || 0})</span>
            </div>
            <div className="">
              {!forSeller && (
                <button
                  className="p-1 flex items-center justify-center w-8 h-8 rounded-full border border-gray-200"
                  onClick={toggleProperty}>
                  <FaHeart
                    className={isSaved ? 'text-orange-300' : 'text-gray-200'}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <div className="flex flex-wrap items-center">
            <h5 className="text-accent">{'$' + item.price}</h5>
            <span className="text-gray-400 text-sm">/ price</span>
          </div>
          <Link
            to={
              forSeller
                ? `/dashboard/my-properties/${item?.id}`
                : `/properties/${item?.id}`
            }
            className="p-4 detail-icon rounded-full hover:!bg-accent hover:!text-white hover:!shadow-lg transition-all duration-300">
            <FaArrowRight className="text-sm lg:text-lg" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

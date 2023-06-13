import { Button, Rating } from '@components/common';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import s from './Homes.module.css';

const HomeCardItem = ({ item, isSearchResult }) => {
  return (
    <div className="px-1 lg:px-2 py-1 lg:py-4 h-full">
      <div
        className={
          s.homeCard +
          ' p-2 lg:p-4 rounded-md bg-white transition-all h-full hover:shadow-lg' +
          (isSearchResult ? ' shadow-lg' : '')
        }>
        <div
          className="mb-2"
          style={{
            lineHeight: 0,
            overflow: 'hidden',
            borderRadius: 3
          }}>
          <img
            src={item.cover}
            width={760}
            height={760}
            alt={'Course ' + item.id}
          />
        </div>
        <div className="mb-2">
          <h4 className="mb-2 lg:h-12">{item.title}</h4>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={item.rating} />
            <span>({item.ratingCount})</span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <div className="flex flex-wrap lg:flex-nowrap items-center">
            <h5 className="text-accent">{'$' + item.price}</h5>
            <span className="text-gray-400 text-sm">/ actre</span>
          </div>
          <button className="p-4 detail-icon rounded-full hover:!bg-accent hover:!text-white hover:!shadow-lg transition-all duration-300">
            <FaArrowRight className="text-sm lg:text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCardItem;

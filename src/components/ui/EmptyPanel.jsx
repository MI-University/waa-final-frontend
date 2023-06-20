import { SVGProps } from 'react';
import { Empty } from './icons';

const EmptyPanel = ({ ...props }) => (
  <div
    className={
      'flex flex-col justify-center items-center my-20 lg:my-40 ' +
      props?.className
    }>
    <span className="mb-2">
      <Empty />
    </span>
    <h4 className="text-sm text-gray-500">Nothing found</h4>
  </div>
);

export default EmptyPanel;

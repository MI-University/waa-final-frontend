import React from 'react';
import { Empty, LoadingCircle } from './icons';

const Loader = ({ width = 40, height = 40, ...props }) => (
  <div
    className={
      'flex flex-col justify-center items-center my-20 lg:my-40 ' +
      props?.className
    }>
    <span className="mb-2">
      <LoadingCircle
        width={width}
        height={height}
        className="loader-anim text-lg text-accent"
      />
    </span>
  </div>
);

export default Loader;

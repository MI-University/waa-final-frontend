import React from 'react';

const sizes = {
  sm: 'px-8 py-2 rounded-md text-sm',
  md: 'rounded-md py-2 px-5 sm:px-8',
  lg: 'px-5 py-3 rounded-lg text-lg'
};

const Button = ({
  children,
  size = 'md',
  outlined = false,
  className = '',
  loading = false,
  htmlType = 'button',
  ...props
}) => {
  const sizeClasses = sizes[size];

  return (
    <button
      className={
        `${sizeClasses} ${className}` +
        (outlined
          ? ' font-medium tracking-wide border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-accent hover:text-white-500 transition-all hover:text-white hover:shadow-orange '
          : ' font-semibold rounded-lg bg-accent hover:shadow-2xl transition-300 shadow-accent transition-all outline-none text-white ')
      }
      {...props}
      disabled={loading}>
      {children}
    </button>
  );
};

export default Button;

import LogoImgHorizontal from '@assets/images/h-logo-sm.png';
import LogoImgVertical from '@assets/images/trans-v-logo-sm.png';
import { Link } from 'react-router-dom';

const Logo = ({ variant, orientation, className }) => {
  const logos = {
    h: LogoImgHorizontal,
    v: LogoImgVertical
  };
  return (
    <div className="">
      <Link to="/">
        <img
          src={logos[orientation]}
          height={50}
          alt="MyHome"
          className={
            `${className} ` + (orientation == 'v' ? 'h-16 lg:h-24' : 'h-16')
          }
        />
      </Link>
    </div>
  );
};

Logo.defaultProps = {
  variant: 'primary',
  orientation: 'h',
  className: ''
};

export default Logo;

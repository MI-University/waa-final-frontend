import UserIcon from '../assets/icons/heroicons_sm-user.svg';
import LocIcon from '../assets/icons/gridicons_location.svg';
import ServerIcon from '../assets/icons/bx_bxs-server.svg';
import { userType } from '@utils/constants/types.contants';
import { FaHome, FaRegListAlt } from 'react-icons/fa';
import { paths } from '@utils/constants/paths.contants';
import { MdListAlt, MdOfflineShare } from 'react-icons/md';

export const bannerStatistics = [
  {
    name: 'Users',
    number: '50K+',
    icon: UserIcon
  },
  {
    name: 'Locations',
    number: '100',
    icon: LocIcon
  },
  {
    name: 'Projects',
    number: '500+',
    icon: ServerIcon
  }
];

export const navItems = {
  [userType.ADMIN]: [
    {
      name: 'Dashboard',
      link: paths.DASHBOARD,
      icon: <FaHome />
    },
    {
      name: 'Requests',
      link: paths.PENDING_OWNERS,
      icon: <FaRegListAlt />
    }
  ],
  [userType.OWNER]: [
    {
      name: 'Dashboard',
      link: paths.DASHBOARD,
      icon: <FaHome />
    },
    {
      name: 'My Properties',
      link: paths.MY_PROPERTIES,
      icon: <MdListAlt />
    }
  ],
  [userType.CUSTOMER]: [
    {
      name: 'Dashboard',
      link: paths.DASHBOARD,
      icon: <FaHome />
    },
    {
      name: 'My Offers',
      link: paths.MY_OFFERS,
      icon: <MdOfflineShare />
    }
  ]
};

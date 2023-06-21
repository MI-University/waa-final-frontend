import { Underline } from '@components/ui/icons';
import {
  FaArrowRight,
  FaExclamation,
  FaForward,
  FaGofore,
  FaQuestion
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <div className="h-screen w-screen fixed z-50 left-0 top-0 bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-4 text-accent">404</h1>
        <Underline className="w-80 mb-6" />
        <h4 className="text-gray-500">
          SORRY! The requested page is unavailable
        </h4>
        <Link
          to="/"
          className="flex justify-center py-4 font-bold items-center">
          <span className="border-b-2"> Go Home</span>
          <FaArrowRight className="text-xs ml-2 p-1 h-6 w-6 rounded-full bg-gray-200 text-green-500" />
        </Link>
      </div>
    </div>
  );
};

export default Missing;

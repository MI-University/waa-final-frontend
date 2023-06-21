import { Underline } from '@components/ui/icons';
import { useData } from '@store/providers/Provider';
import { userType } from '@utils/constants/types.contants';
import { FaCircle } from 'react-icons/fa';
import s from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useData();

  return (
    <div>
      <div className={s.content}>
        {user?.role == userType.ADMIN && (
          <div className={s.card}>
            <h1 className={s.value}>1000</h1>
            <h4 className={s.name}>Total Users</h4>{' '}
            <Underline className={s.underline} />
          </div>
        )}

        {(user?.role == userType.OWNER || user?.role == userType.ADMIN) && (
          <div className={s.card}>
            <h1 className={s.value}>
              {user?.role == userType.OWNER ? 500 : 4000}
            </h1>
            <h4 className={s.name}>Total Properties</h4>
            <Underline className={s.underline} />
          </div>
        )}

        {(user?.role == userType.OWNER || user?.role == userType.CUSTOMER) && (
          <div className={s.card}>
            <h1 className={s.value}>
              {user?.role == userType.CUSTOMER ? 20 : 40}
            </h1>
            <h4 className={s.name}>Total Offers</h4>{' '}
            <Underline className={s.underline} />
          </div>
        )}

        {user?.role == userType.CUSTOMER && (
          <div className={s.card}>
            <h1 className={s.value}>10</h1>
            <h4 className={s.name}>Pending Offers</h4>{' '}
            <Underline className={s.underline} />
          </div>
        )}
      </div>
      <div>
        {user?.role === userType.OWNER && (
          <div className="mt-8 px-4 font-bold text-gray-500 text-sm flex items-center">
            Status:{' '}
            {user?.approved ? (
              <div className="px-4 py-2 inline-block rounded text-green-400">
                Approved
              </div>
            ) : (
              <div>
                <div className="px-4 py-2 inline-block rounded text-yellow-400">
                  Pending
                </div>
              </div>
            )}
          </div>
        )}
        {user?.role === userType.OWNER && (
          <div className="px-4 mb-8 font-thin text-sm flex items-center">
            {!user?.approved && (
              <p className="text-gray-800 flex items-center">
                <FaCircle className="text-gray-300 text-xs mr-1 p-[3px]" /> You can't create,
                update or get offers until become approved by admin.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

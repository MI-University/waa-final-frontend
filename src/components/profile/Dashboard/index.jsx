import { Underline } from '@components/ui/icons';
import { useData } from '@store/providers/Provider';
import { userType } from '@utils/constants/types.contants';
import s from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useData();

  return (
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
  );
};

export default Dashboard;

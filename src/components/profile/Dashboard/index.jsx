import s from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={s.content}>
      <div className={s.card}>
        <h1 className="text-4xl font-bold text-accent">1000</h1>
        <h4 className="text-gray-500">Total Users</h4>
      </div>
      <div className={s.card}>
        <h1 className="text-4xl font-bold text-accent">4000</h1>
        <h4 className="text-gray-500">Total Properties</h4>
      </div>
    </div>
  );
};

export default Dashboard;

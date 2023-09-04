import { Outlet, Navigate, useLocation } from 'react-router';
import Sidebar from '@/components/Sidebar'

const useAuth = () => {
  const {loggedIn} = JSON.parse(localStorage.getItem('user')!);
  return loggedIn;
};

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <>
      <Sidebar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" replace state={{ from: location }}/>
  );
};

export default ProtectedRoutes;

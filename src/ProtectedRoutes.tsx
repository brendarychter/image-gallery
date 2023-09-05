import { Outlet, Navigate, useLocation } from 'react-router';
import { Sidebar } from '@/components';

const useAuth = () => {
  const storage = JSON.parse(localStorage.getItem('user')!);
  return storage === null ? false : storage.loggedIn;
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
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;

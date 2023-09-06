import { Outlet, Navigate, useLocation } from 'react-router';
import { Sidebar } from '@/components';
import { useUserContext } from '@/context/UserContext';

const useAuth = () => {
  const { user } = useUserContext();
  return user.loggedIn;
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

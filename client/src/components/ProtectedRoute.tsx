import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProtectedRoute = () => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin/subscriptions" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

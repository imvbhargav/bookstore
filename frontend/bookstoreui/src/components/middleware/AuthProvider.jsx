import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { login, logout } from '../../store/slices/userSlice';
import Loader from '../ui/Loader';
import useFetch from '../../hooks/useFetch';

const AuthProvider = ({ children }) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);

  const { error, get } = useFetch();

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const data = await get('auth/me');
        const { email, isAdmin } = data;
        dispatch(login({ isAdmin, email }));
      } catch (err) {
        console.error(err);
        console.error(error);
        dispatch(logout());
      } finally {
        setAuthChecked(true);
      }
    }

    validateLogin();
  }, [location.pathname]);

  if (!authChecked) return <Loader />;

  return children;
};

export default AuthProvider;
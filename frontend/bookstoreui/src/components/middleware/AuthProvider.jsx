import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { login, logout } from '../../store/slices/userSlice';
import { BACKEND_URL } from '../../assets/options';
import Loader from '../ui/Loader';

const AuthProvider = ({ children }) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      setAuthChecked(false);
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Not authenticated');
        const { email, isAdmin } = await res.json();
        dispatch(login({ isAdmin, email }));
      } catch (err) {
        dispatch(logout());
      } finally {
        setAuthChecked(true);
      }
    };

    checkLogin();
  }, [location.pathname]);

  if (!authChecked) return <Loader />;

  return children;
};

export default AuthProvider;
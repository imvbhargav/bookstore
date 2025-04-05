import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { login, logout } from '../../store/slices/userSlice';
import { KOYEB_BACKEND } from '../../assets/options';

const AuthProvider = ({ children }) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      setAuthChecked(false);
      try {
        console.log("Fetching again");
        const res = await fetch(`${KOYEB_BACKEND}/api/auth/me`, {
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

  if (!authChecked) return <div>Loading...</div>;

  return children;
};

export default AuthProvider;
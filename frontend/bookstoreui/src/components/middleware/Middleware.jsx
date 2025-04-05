import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginMiddleware = ({ Component }) => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  return isLoggedIn ? <Navigate to="/" replace /> : <Component />;
};

const AuthMiddleware = ({ Component }) => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  return !isLoggedIn ? <Navigate to="/login" replace /> : <Component />;
};

const RoleMiddleware = ({ Component }) => {
  const {isLoggedIn, isAdmin} = useSelector(state => state.user);
  const validAccess = isLoggedIn && isAdmin;
  return !validAccess ? <Navigate to="/" replace /> : <Component />;
};

export { LoginMiddleware, RoleMiddleware, AuthMiddleware};
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/userSlice';
import { refreshCart } from '../../store/slices/cartSlices';
import { BACKEND_URL } from '../../assets/options';

function Header() {

  const location = useLocation();

  const dispatch = useDispatch();
  const { isLoggedIn, isAdmin } = useSelector(state => state.user);

  const logoutUser = async () => {
    const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) return;
    const data = await response.json();
    alert(data.message);
    dispatch(logout());
    dispatch(refreshCart());
  }

  return (
    <header>
      <div className="flex justify-between items-center px-2 py-1 sm:px-4 sm:py-2 bg-amber-100 m-2 border-2 border-amber-200 rounded-md">
        <Link to={"/"}>
          <img className='w-24 sm:w-38' src={Logo} alt="BookHive" />
        </Link>
        <nav className='flex gap-2'>
          { (isAdmin && location.pathname !== '/admin' ) &&
            <Link
              to={"/admin"}
              className="text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2 bg-amber-100 text-black rounded-md font-bold hover:bg-amber-200 transition-colors cursor-pointer border-2 border-black hover:border-amber-500"
            >Admin</Link>
          }
          { isLoggedIn
          ?
            <button
              className="text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded-md font-bold hover:bg-red-600 transition-colors cursor-pointer border-2 border-red-500"
              onClick={logoutUser}
            >
              Logout
            </button>
          :
            <>
              <Link to={"/login"} className="text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-600 transition-colors cursor-pointer border-2 border-blue-500">
                Login
              </Link>
              <Link to={"/register"} className="text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2 rounded-md font-bold hover:bg-gray-50 border-2 border-black transition-colors cursor-pointer">
                Register
              </Link>
            </>
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;
import { useState, useEffect } from 'react';
import Logo from '../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
import { validEmail } from '../utils/validator';
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import { refreshCart } from '../store/slices/cartSlices';
import { KOYEB_BACKEND } from '../assets/options';

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ user, setUser ] = useState({email: '', password: ''});
  const [ error, setError ] = useState('');

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUser(prev => ({...prev, [name]: value}));
  }

  const handleLogin = () => {

    // Validate password.
    if (user.password.length < 8) {
      setError("Password is at least 8 characters!");
      return;
    }

    // Validate email entered.
    if (!validEmail(user.email)) {
      setError("Enter valid E-mail address!");
      return;
    }

    async function loginUser() {
      const { email, password } = user;
      const response = await fetch(`${KOYEB_BACKEND}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email, password
        })
      });

      if (!response.ok) {
        setError("Invalid credentials!");
        return;
      };
      const data = await response.json();
      dispatch(login({isAdmin: data.isAdmin, email: data.email}));
      dispatch(refreshCart());
      navigate("/");
    }

    loginUser();
  }

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === 'Enter') {
        handleLogin();
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [handleLogin]);

  return (
    <section className="flex flex-col justify-center items-center gap-2 h-[100dvh]">
      <div className="border-2 border-black flex flex-col gap-4 px-5 py-4 rounded-md bg-amber-100">
        <Link to={"/"} className='w-full flex justify-center'>
          <img className='w-38' src={Logo} alt="BookHive" />
        </Link>
        <h1 className="text-2xl text-center font-bold border-b-2 border-black/50">
          Login
        </h1>
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              placeholder="Enter email..."
              type="email"
              autoComplete="off"
              value={user.email}
              className="border-2 border-gray-500 px-4 py-2 rounded-md sm:w-sm"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password"
              name="password"
              placeholder="Enter password..."
              value={user.password}
              type="password"
              autoComplete="off"
              className="border-2 border-gray-500 px-4 py-2 rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <p className="text-sm text-center text-red-500 min-h-6">{error}</p>
          <button
            className="py-2 px-4 bg-green-600 rounded-md font-bold text-white hover:bg-green-800 transition-colors cursor-pointer"
            onClick={handleLogin}
          >Login</button>
          <span>
            <Link to="/register" className="underline text-blue-500 hover:text-pink-500">Register</Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Login;
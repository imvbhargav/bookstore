import { useEffect, useState } from 'react';
import Logo from '../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
import { validEmail } from '../utils/validator';
import { BACKEND_URL } from '../assets/options';

function Register() {

  const navigate = useNavigate();

  const [ user, setUser ] = useState({email: '', password: ''});
  const [ isAdmin, setIsAdmin ] = useState(false);
  const [ repeat, setRepeat ] = useState('');
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUser(prev => ({...prev, [name]: value}));
  }

  const handleRepeatChange = (e) => {
    setRepeat(e.target.value);
  }

  const handleAdminChange = (e) => {
    setIsAdmin(e.target.checked);
  }

  const handleRegister = () => {

    function validCredentials() {

      // Validate all values entered.
      if (user.password < 8) {
        setError("Password must be at least 8 characters!");
        return false;
      };

      // Validate password and repeat password.
      if (user.password !== repeat) {
        setError("Password does not match!");
        return false;
      };

      // Validate email address entered
      const isValidMail = validEmail(user.email);
      if (!isValidMail) setError("Enter valid E-mail address!");
      return isValidMail;
    }

    async function createUser() {
      setLoading(true);
      const {email, password} = user;
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, password, isAdmin
        })
      });

      const data = await response.json();
      alert(data.message);
      setLoading(false);
      navigate("/login");
    }

    if (validCredentials()) {
      createUser();
    }
  }

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === 'Enter') {
        handleRegister();
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [handleRegister]);

  return (
    <section className="flex flex-col justify-center items-center gap-2 h-[100dvh]">
      <div className="border-2 border-black flex flex-col gap-4 px-5 py-4 rounded-md bg-amber-100">
        <Link to={"/"} className='w-full flex justify-center'>
          <img className='w-38' src={Logo} alt="BookHive" />
        </Link>
        <h1 className="text-2xl text-center font-bold border-b-2 border-black/50">
          Register
        </h1>
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              placeholder="Enter email..."
              value={user.email}
              type="email"
              autoComplete="off"
              required
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
              required
              className="border-2 border-gray-500 px-4 py-2 rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cpassword" className="text-sm font-medium">Repeat Password</label>
            <input
              id="cpassword"
              name="cpassword"
              placeholder="Repeat password..."
              value={repeat}
              type="password"
              autoComplete="off"
              required
              className="border-2 border-gray-500 px-4 py-2 rounded-md"
              onChange={handleRepeatChange}
            />
          </div>
          <div className='flex gap-2 justify-center'>
            <input id='admin' type='checkbox' checked={isAdmin} name='isAdmin'
              onChange={handleAdminChange}
            />
            <label htmlFor='admin'>Want to be a seller?</label>
          </div>
          <p className="text-sm text-center text-red-500 min-h-6">{error}</p>
          <button
            className="py-2 px-4 bg-green-600 rounded-md font-bold text-white hover:bg-green-800 transition-colors cursor-pointer disabled:bg-black disabled:cursor-auto"
            disabled={loading}
            onClick={handleRegister}
          >{loading ? "Registering..." : "Register"}</button>
          <span>
            <Link to="/login" className="underline text-blue-500 hover:text-pink-500">Login</Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Register;
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Pages/styles/Sign.css";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex justify-center items-center '>
      <div className='text-center font-bold'>
        <img src='../../public/logo.png' alt='Logo' className='logoSign' />
        <div className='flex flex-col items-center  '> 
          <label>E-mail</label>
          <input
            className="custom-input-text-color"
            type="text"
            placeholder="E-mail"
          />
          <label>Password</label>
          <div className="flex items-center ml-1">
            <input
              className={`custom-input-text-color w-60  ${
                  showPassword ? 'outline-none' : ''
              }`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ height: '2.5rem' }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-button"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div>
          <Link to="/register" className='custom-link'>
            Register
          </Link>
        </div>
        <button className='custom-button'>
          Login
        </button>
      </div>
    </div>
  );
};

export default SignIn;

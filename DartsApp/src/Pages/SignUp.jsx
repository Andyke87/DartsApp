/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../Pages/styles/Sign.css";
import "../app.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='text- font-bold '>
        <img src='../../public/logo.png' className='logoSign'/>
          <div className='flex flex-col items-center '>
            <label>Name</label>
            <input
              className="custom-input-text-color"
              type="text"
              placeholder="Name"
            />
            <label>Firstname</label>
            <input
              className="custom-input-text-color"
              type="text"
              placeholder="Firstname"
            />
            <label>E-mail</label>
            <input
              className="custom-input-text-color"
              type="text"
              placeholder="E-mail"
            />
            <label>Password</label>
            <div>
            <input
              className={`custom-input-text-color w-60 ${
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
          <NavLink to="/login" className='custom-link'>
            Already signed in?
          </NavLink>
          <button className='custom-button'>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';


function App() {


  return (
    <div className='flex flex-col items-center'>
      <div className='logo'>
        <img src="../public/logo.png" />
      </div>
      <div className='link-to'>
        <div>
          <NavLink to="/Login">
            Login
          </NavLink>
        </div>
        <div className='link-to'>
          <NavLink to="/Register">
            Register
          </NavLink>
        </div>
        <div className='link-to'>
          <NavLink to="/game">
            Game
          </NavLink>
        </div>
        <div>
          <NavLink to="/info">
            Practical info
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default App;

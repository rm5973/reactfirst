// src/Login.jsx

import React, { useState } from 'react';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Login Page</h1>
      <form className="w-1/3 bg-white rounded-lg shadow-lg p-6 login-form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-500 font-bold">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <span className="text-sm">Remember Me</span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/signup" // Replace with the link to the signup page
          >
            New Signup
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;

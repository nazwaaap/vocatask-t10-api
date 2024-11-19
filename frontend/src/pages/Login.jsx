import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="bg-customNavy w-full sm:max-w-lg p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_10px_3px_rgba(255,235,59,0.6)]">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-purple-400">VOCA</h1>
        <h2 className="text-xl font-light text-purple-100 mt-0 mb-2">TASK</h2>
        <p className="text-xs font-light text-purple-100 mt-4">
            Welcome to Vocasia Task! Your Productivity Hub!
        </p>
      </div>

      {/* Form Login */}
      <form className="space-y-4 mt-5" action="#">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-xs text-purple-100">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-white border border-gray-300 text-gray-700 rounded-lg w-full p-2 text-xs transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
            placeholder="nazwa.praditta@gmail.com"
            required />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block mb-1 text-xs font-medium text-purple-100">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="* * * * * * * * * * *"
            className="bg-white border border-gray-300 text-gray-700 rounded-lg w-full p-2 text-xs transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
            required />
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <a href="#" className="text-xs text-gray-400 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Sign In Button */}
        <div>
          <Link to="/task">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-purple-100 font-bold rounded-lg text-xs p-2 transition-all hover:bg-yellow-700">
              Sign In
            </button>
          </Link>
        </div>

        {/* Register Link */}
        <div className="text-xs font-medium text-gray-600 text-center mt-3">
          Don't have an account?{' '}
          <Link to="/register" className="text-gray-400 hover:underline">
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
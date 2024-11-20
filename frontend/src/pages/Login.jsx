import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, getUserProfile } from '../api/user'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [userProfile, setUserProfile] = useState(null); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const result = await loginUser(email, password);  

      if (result && result.data && result.data.token) {
        localStorage.setItem('token', result.data.token);  
      }

      const profile = await getUserProfile();
      setUserProfile(profile);  

      alert('Login successful!');
      navigate('/task'); 
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Login failed. Please try again!');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="bg-customNavy w-full sm:max-w-lg p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_10px_3px_rgba(255,235,59,0.6)]">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-purple-400">VOCA</h1>
        <h2 className="text-xl font-light text-purple-100 mt-0 mb-2">TASK</h2>
        <p className="text-xs font-light text-purple-100 mt-4">
          Welcome to Vocasia Task! Your Productivity Hub!
        </p>
      </div>

      <form className="space-y-4 mt-5" onSubmit={handleLogin}>
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-xs text-purple-100">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 rounded-lg w-full p-2 text-xs transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
            placeholder="nazwa.praditta@gmail.com"
            required
          />
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="* * * * * * * * * * *"
            className="bg-white border border-gray-300 text-gray-700 rounded-lg w-full p-2 text-xs transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
            required
          />
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <a href="#" className="text-xs text-gray-400 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-purple-100 font-bold rounded-lg text-xs p-2 transition-all hover:bg-yellow-700"
          disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        {/* Register Link */}
        <div className="text-xs font-medium text-gray-600 text-center mt-3">
          Don't have an account?{' '}
          <Link to="/register" className="text-gray-400 hover:underline">
            Register now
          </Link>
        </div>
      </form>

      {/* Menampilkan Profil User */}
      {userProfile && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-lg">User Profile</h3>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Name:</strong> {userProfile.name}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
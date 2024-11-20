import { Link } from 'react-router-dom';
import { useState } from 'react';
import { updateUserProfile } from '../api/user';

const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedProfile = await updateUserProfile(name, email, password, photoUrl);
      alert('Profile updated successfully!');
      console.log('Updated profile:', updatedProfile);
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to update profile. Please try again!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-customNavy w-full max-w-sm sm:max-w-md px-4 py-3 sm:px-5 sm:py-4 rounded-[10px] shadow-md space-y-3">
      <Link to="/task" className="flex items-center space-x-2 font-medium text-purple-50 hover:text-purple-200 hover:scale-105 transition duration-300">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19L7 12l8-7" />
        </svg>
        <p className="text-xs">Back to Task</p>
      </Link>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Photo Preview */}
        {photoUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={photoUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        )}

        {/* Profile URL */}
        <div>
          <label htmlFor="photoUrl" className="block text-xs font-medium text-purple-50">Profile URL</label>
          <input
            type="text"
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Enter photo URL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg w-full p-2"
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-purple-50">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg w-full p-2"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-purple-50">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg w-full p-2"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-xs font-medium text-purple-50">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg w-full p-2"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-200 text-gray-900 font-medium rounded-lg text-sm px-4 py-2"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
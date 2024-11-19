import { Link } from 'react-router-dom';
import { useState } from 'react';

const UpdateProfile = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-customNavy w-full max-w-sm sm:max-w-md px-4 py-3 sm:px-5 sm:py-4 rounded-[10px] shadow-md space-y-3">
      <Link to="/task" className="flex items-center space-x-2 font-medium text-purple-50 hover:text-purple-200 hover:scale-105 transition duration-300">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
        </svg>
        <p className="text-xs">Edit Profile</p> 
      </Link>

      <div className="flex flex-col justify-center items-center px-3 sm:px-4">
        <div className="mb-4">
          <img
            className="w-24 h-24 sm:w-27 sm:h-27 rounded-full object-cover transition-transform duration-300 hover:scale-110"
            src={image || '../../public/fotoprofile.jpg'} 
            alt="Profile"/>
        </div>

        <input
          type="file"
          id="profile"
          className="hidden"
          onChange={handleImageChange}/>

        {/* Form Update Profile*/}
        <form className="w-full space-y-4 sm:p-2 mt-2 sm:mt-2">
          {/* Profile URL */}
          <div>
            <label htmlFor="profileUrl" className="block text-xs font-medium text-purple-50">Profile URL</label>
            <input
              type="text"
              name="profileUrl"
              id="profileUrl"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2 mt-1 placeholder:text-xs hover:bg-yellow-50"
              placeholder="<Image URL>"
              required/>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-purple-50">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2 mt-1 placeholder:text-xs hover:bg-yellow-50"
              placeholder="Nazwa Praditta"
              required/>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-purple-50">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2 mt-1 placeholder:text-xs hover:bg-yellow-50"
              placeholder="nazwa.praditta@gmail.com"
              required/>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-purple-50">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="* * * * * * * *"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2 mt-1 placeholder:text-xs hover:bg-yellow-50"
              required/>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <Link to="/task">
              <button
                type="submit"
                className="w-full flex justify-center items-center bg-yellow-500 hover:bg-yellow-200 text-gray-900 font-medium rounded-lg text-sm px-3 py-2 mt-4 transition duration-300">
                <svg className="w-5 h-5 text-gray-900 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11.917 9.724 16.5 19 7.5" />
                </svg>
                <p className="font-semibold">Submit</p>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
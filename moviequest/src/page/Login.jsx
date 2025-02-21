import React, { useState } from 'react';
import { Header2 } from '../layouts/Header2';
import { Footer } from '../layouts/Footer';
import TheJungleBookImage from '../Images/Registerpic/TheJungleBook.jpeg'; // Background image
import Image1 from '../Images/Registerpic/image1.jpg'; // Local image for the left section
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'; // Import icons

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', password: '' };

    if (!formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${TheJungleBookImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <Header2 />

      {/* Main Content - Ensures Scrollability */}
      <section className="flex flex-grow items-center justify-center py-16 relative z-10">
        <div className="flex w-3/4 h-[80vh] shadow-2xl rounded-lg overflow-hidden relative">
          
          {/* Left Section - Background Image with Overlayed Illustration */}
          <div 
            className="w-1/2 relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${Image1})` }}
          >
            {/* Overlay Illustration */}
            <img 
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" 
              className="absolute inset-0 m-auto w-2/3 h-auto"
              alt="Illustration"
            />
          </div>

          {/* Right Section - Login Form */}
          <div className="w-1/2 flex flex-col items-center justify-start p-10 bg-green-50 relative">
            {/* Close Icon */}
            <button className="absolute top-4 right-4 text-black" onClick={() => window.history.back()}>
              <FaTimes size={20} />
            </button>

            <h2 className="text-4xl font-bold text-gray-800 lg:text-5xl mt-4">Welcome back!</h2>
            <p className="mt-4 text-xl text-gray-600 text-center">Enter your credentials below to access your account.</p>

            {/* Username Field */}
            <div className="mt-12 w-3/4">
              <label className="block text-lg font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                name="username"
                placeholder="Username"
                className={`w-full px-4 py-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-red-700`}
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mt-6 w-3/4">
              <label className="block text-lg font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-red-700`}
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button 
              className="mt-8 w-3/4 px-6 py-3 bg-red-600 rounded-full hover:bg-red-700 flex items-center justify-center text-white transition"
              onClick={validateForm}
            >
              Login
            </button>

            {/* Signup Link - Increased Size and Highlighted */}
            <p className="mt-8 text-xl text-gray-600">
              Don't have an account? <a href="/register" className="text-green-600 font-semibold text-2xl hover:text-red-700">Sign Up</a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Always at Bottom but Scrollable */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Login;

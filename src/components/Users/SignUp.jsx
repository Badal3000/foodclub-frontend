import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from '../../assets/logo.jpg';

const SignUp = () => {
  const [formdata, setFormdata] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    contact: "",
    role: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formdata.password !== formdata.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Update the endpoint to '/signup' for user registration
      const response = await axios.post("http://localhost:5050/user/signup", formdata);

      // Check if the signup was successful
      console.log(response.data);

      // Assuming the server returns a token, you can save it in localStorage
      localStorage.setItem("token", response.data.token);
      
      // Redirect to the homepage or login page after successful sign-up
      navigate("/login");  // Or you can navigate to the homepage '/' if you want
    } catch (error) {
      setError(error.response ? error.response.data.message : "Sign Up Failed");
    }

    console.log(formdata);
  };

  return (
    <div className=" h-screen flex justify-around items-center py-8 gap-3 bg-black">
      <img src={logo} alt="logo" className="w-[450px]"/>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-4 mb-4">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={HandleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullname"
              value={formdata.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              value={formdata.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formdata.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Contact */}
          <div>
            <input
              type="number"
              name="contact"
              value={formdata.contact}
              onChange={handleChange}
              placeholder="Contact"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Role */}
          <div>
            <input
              type="text"
              name="role"
              value={formdata.role}
              onChange={handleChange}
              placeholder="Role"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Address */}
          <div>
            <textarea
              name="address"
              value={formdata.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-orange-500 text-white rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

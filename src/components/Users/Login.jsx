import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const HandleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5050/user/login", formdata);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError(error.response ? error.response.data.message : "Login Failed");
    }
    console.log(formdata);
  };

  const Register = (e) => {
    e.preventDefault();
    navigate("/SignUp");
  };

  return (
    <div className="bg-slate-800 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={HandleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={HandleChange}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={HandleChange}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/SignUp"
            className="text-orange-500 font-semibold hover:text-orange-400"
            onClick={Register}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

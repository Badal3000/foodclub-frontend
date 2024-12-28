import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

function Header() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/SignUp");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  return (
    <header className="bg-black h-20 flex justify-between items-center px-6">
      {/* Logo Section */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="w-[50px] h-[40px] mr-3" />
        <span className="text-white text-xl font-bold">Food Order</span>
      </div>

      {/* Navigation Section */}
      <div className="flex items-center gap-4">
        <button
          className="border border-orange-500 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition"
          onClick={handleSignIn}
        >
          Sign Up
        </button>
        <button
          className="border border-orange-500 px-4 py-2 rounded-lg bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white transition"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </header>
  );
}

export default Header;

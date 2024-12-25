import {  useNavigate } from "react-router-dom";
import logo from '../../assets/logo.jpg';
function Header() {
    const navigate = useNavigate();
    const HandleSignIn = () =>{
        navigate('/SignUp');
    }
   const HandleLogin = () =>{
    navigate ('/Login');
   }
    return (
        <div className="bg-black h-20 flex justify-between">
            <div className="flex items-center justify-between w-full p-7">
                <span><img src={logo} className="w-[50px] h-[40px]"/></span>
                <div className="flex items-center gap-3">
                    <button className="border border-r-zinc-950 p-1 bg-slate-500"
                            onClick={HandleSignIn} >Signin</button>
                    <button className="border border-r-zinc-950 p-1 bg-slate-500"
                            onClick={HandleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Header
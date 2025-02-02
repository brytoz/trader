import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiService } from "../config/apiservice";
import { AiFillLock } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [info, setInfo] = useState("Open Webtrader");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/index";

  const handleLogin = async () => {
    const newEmail = email.toLowerCase()
    try {
      const response = await apiService.login( { newEmail, password });
      localStorage.setItem("token", response.data.token);
      navigate(from, { replace: true });
    } catch (error:any) {
      console.error("Login failed:", error.response?.data?.message || error);
    }
  };

  return (

    <div className="w-full b  h-full">

    <div className="md:hidden  absolute w-full h-full 100vh " />

    <div className="w-full flex-wrap md:flex bg-black/40 bg-opacity-20">
      <div className="w-full   h-full  bg-opacity-60 ">
        <div className="w-full flex justify-center items-center h-screen ">
          <div className="px-6 w-80 h-auto md:w-96 bg-black/50  rounded-lg flex-wrap justify-center items-center py-6  space-y-4 relative ">
            <div className="text-white flex justify-center items-center text-xl font-bold">
              Uptrise - Webtrader
            </div>
            <div className="flex justify-center ">
              {error ? (
                <span className="text-center text-red-600 bold">
                  {status}
                </span>
              ) :
              success ? (
                <span className="text-center text-xl text-green-600 bold">
                  {status}
                </span>
              ) : "" }
            </div>
            <form onSubmit={handleLogin} className="space-y-4  ">
              <div className="flex-wrap justify-center items-center w-full pt-10  ">
                <div className="relative px-2 w-full flex justify-center">
                  <input
                    type="text"
                    className="rounded border border-gray-200 font-base pl-2 text-black text-base p-2 border shadow-sm w-full md:w-72 text-gray-400"
                    placeholder="Account ID"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="absolute top-3 right-[10%] md:right-[15%]">
                    <FaUser className="opacity-30" />
                  </div>
                </div>
              </div>

              <div className="flex-wrap justify-center items-center w-full pt-2  ">
                <div className="relative px-2 w-full flex justify-center">
                  <input
                    type="password"
                    className="rounded font-base text-base p-2 border shadow-sm w-full md:w-72"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute top-3 right-[10%] md:right-[15%]">
                    <AiFillLock className="opacity-30" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center pt-6 pb-2">
                <button
                  type="submit"

                  className=" rounded bg-gray-800 hover:bg-green-600 px-4 py-2 text-white w-72 shadow-lg cursor-pointer transition-all duration-500"
                >
                  {info}
                </button>
              </div>
            </form>
            <div className="w-full flex-wrap text-xs font-light">
              <div className="text-white pt-4 flex justify-center items-center" />
            </div>

            <div className="text-white mt-12 cursor-pointer flex justify-center items-center font-light text-xs opacity-30">
              Uptrise &copy;
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


 
  );
};

export default Login;

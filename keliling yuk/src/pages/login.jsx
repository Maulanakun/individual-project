import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    let inputName = e.target.name;
    let inputvalue = e.target.value;
    setInput({
      ...input,
      [inputName]: inputvalue,
    });
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      let { data } = await axios.post("http://localhost:3000/login", input);
      localStorage.setItem("access_token", data.token);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  async function googleLogin(codeResponse) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/logingoogle",
        null,
        {
          headers: {
            token: codeResponse.credential,
          },
        }
      );
      localStorage.setItem("access_token", data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
          <p className="text-gray-600 mb-6 text-sm">welcome back</p>
          <form onSubmit={onSubmit}>
            <div className="space-y-2">
              <div>
                <label htmlFor="email" className="text-gray-600 mb-2 block">
                  Email address
                </label>
                <input
                  onChange={onChange}
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="youremail.@domain.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-600 mb-2 block">
                  Password
                </label>
                <input
                  onChange={onChange}
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-gray-600 ml-3 cursor-pointer"
                />
                Remember me
                <label />
              </div>
              <a href="#" className="text-primary">
                Forgot password
              </a>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Login
              </button>
            </div>
          </form>
          <div class="mt-6 flex justify-center relative">
            <div class="text-gray-600 uppercase px-3 bg-white z-10 relative">
              Or login with
            </div>
            <div class="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
          </div>
          <div class="mt-4 flex gap-4">
            <a
              href="#"
              class="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
            >
              facebook
            </a>
            <GoogleLogin onSuccess={googleLogin} />
          </div>
        </div>
      </div>

      {/* <!-- ./login with --> */}

      <p className="mt-4 text-center text-gray-600">
        Don't have account?{" "}
        <a className="text-primary">
          <button>Regist Now</button>
        </a>
      </p>
    </>
  );
};

export default Login;

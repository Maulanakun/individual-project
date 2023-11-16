import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../App.css";

function RegistPfp() {
  const inputChange = () => {};
  const addSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">
            Create an account
          </h2>
          <p className="text-gray-600 mb-6 text-sm">Register for new staff</p>
          <form
            action="#"
            method="post"
            autoComplete="off"
            onSubmit={addSubmit}
          >
            <div className="space-y-2">
              <div>
                <label for="name" className="text-gray-600 mb-2 block">
                  pfp
                </label>
                <input
                  onChange={inputChange}
                  type="file"
                  name="pfp"
                  id="pfp"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="your photo"
                />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="aggrement"
                  id="aggrement"
                  onChange={inputChange}
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                />
                <label
                  for="aggrement"
                  className="text-gray-600 ml-3 cursor-pointer"
                >
                  I have read and agree to the{" "}
                  <a href="#" className="text-primary">
                    terms & conditions
                  </a>
                </label>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                setProfile
              </button>
            </div>
          </form>

          {/* <!-- login with --> */}
          <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
              Or signup with
            </div>
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
          </div>
          <div className="mt-4 flex gap-4">
            <a
              href="#"
              className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
            >
              facebook
            </a>
            <a
              href="#"
              className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
            >
              google
            </a>
          </div>
          {/* <!-- ./login with --> */}

          <p className="mt-4 text-center text-gray-600">
            Already have account?{" "}
            <a href="login.html" className="text-primary">
              <button>Login now</button>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default RegistPfp;

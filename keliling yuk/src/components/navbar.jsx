import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();
  const ifClickWillLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        let user = await axios.get("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        setUserInfo({
          name: user.data.name,
          pfp: user.data.pfp,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <>
      <nav className="bg-gray-800">
        <div className="container flex">
          {/* <!-- all category --> */}
          <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
            <span className="text-white md:flex items-center  ">
              <i className="fa fa-bars">
                <img
                  src={userInfo.pfp}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <Link to="/profile">
                  <button className="text-white ml-2">Profile</button>
                </Link>
              </i>
            </span>
            {/* <!-- dropdown --> */}
          </div>
          {/* <!-- all category end--> */}
          {/* <!-- navbar link--> */}
          <div className="flex items-center justify-between flex-grow pl-12">
            <div className="flex items-center space-x-6 capitalize">
              <Link
                to="/home"
                className="text-gray-200 hover:text-white transition"
              >
                <button>Destination</button>
              </Link>
            </div>
            <button onClick={ifClickWillLogout} className="text-red-600">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

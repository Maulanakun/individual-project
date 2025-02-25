import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Profile = () => {
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
          email: user.data.email,
        });
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <>
      <div class="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
        <div class="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <div class="border-b px-4 pb-6">
            <div class="text-center my-4">
              <img
                class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                src={userInfo.pfp}
                alt=""
              />
              <div class="py-2">
                <h3 class="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                  {userInfo.name}
                </h3>
                <div class="inline-flex text-gray-700 dark:text-gray-300 items-center">
                  <svg
                    class="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      class=""
                      d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                    />
                  </svg>
                  {userInfo.email}
                </div>
              </div>
            </div>
            <div class="flex gap-2 px-2">
              <Link to={"/destinationuser"}>
                <button class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                  My Destination
                </button>
              </Link>
              <button
                onClick={ifClickWillLogout}
                class="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Card end --> */}
      </div>
    </>
  );
};
export default Profile;

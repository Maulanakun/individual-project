import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormAdd = () => {
  let data = useParams();
  console.log(data.tujuan);
  const [obj, setObj] = useState({
    tujuan: data.tujuan,
    budget: "",
    imgUrl: "",
  });
  const navigate = useNavigate();
  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    setObj({
      ...obj,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/destination", obj, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate("/destinationuser");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className=""
        style={{
          backgroundImage: `url(https://c.inilah.com/reborn/2023/08/1/0825_035900_50f9_inilah_com_db07e322cf.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Menambahkan ketinggian minimal
        }}
      >
        <br />
        <form className="p-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="tujuan"
                  id="tujuan"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-blue-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={data.tujuan}
                  onChange={onChange}
                />
                <label
                  htmlFor="tujuan"
                  className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tujuan kamu
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="budget"
                  id="budget"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={onChange}
                />
                <label
                  htmlFor="budget"
                  className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Budget yang Dibutuhkan?
                </label>
              </div>
            </div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="user_avatar"
            >
              Photo
            </label>
            <input
              type="text"
              name="imgUrl"
              id="imgUrl"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={onChange}
            />
            <div
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="user_avatar_help"
            ></div>

            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            ></label>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 to-blue-300 border border-primary text-white px-8 py-3 font-medium 
            rounded-md hover:bg-pink-400 hover:text-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default FormAdd;

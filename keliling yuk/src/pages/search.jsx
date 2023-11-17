import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.get(
        `https://api.goapi.io/places?api_key=74f011ee-947c-50b8-9a0d-167ced06&search=${input}`
      );
      setResults(data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (results !== null) {
    if (results.length > 0) {
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-100 screens">
            <div className="items-center text-center">
              <h1 className="text-3xl font-bold mb-4">
                Kami Menemukan Destinasi berikut
              </h1>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-100 screens">
              {results.map((el, index) => (
                <div
                  key={index}
                  className="card card-compact w-96 bg-base-100 shadow-xl mb-8"
                >
                  <div className="card-body">
                    <h2 className="card-title">{el.displayName}</h2>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/formAdd/${el.displayName}`)}
                      >
                        Lihat Destinasi
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <div
          className="flex justify-center items-center h-screen"
          style={{
            backgroundImage: `url(https://awsimages.detik.net.id/community/media/visual/2021/11/08/piaynemo-dan-telaga-bintang-raja-ampat-5_169.jpeg?w=1200)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <form onSubmit={onSubmit} className="w-full max-w-md">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none"></div>
              <input
                onChange={onChange}
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Apa Tujuan mu"
                required
              />
              <button
                type="submit"
                className="text-yellow-700 absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
};
export default Search;

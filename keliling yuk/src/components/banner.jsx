import { Link } from "react-router-dom";
import gambar from "../../public/pulau-derawan.webp";
const Banner = () => {
  return (
    <>
      <div
        className="bg-cover bg-no-repeat bg-center py-36 backdrop-blur-lg"
        style={{
          backgroundImage: `url(${gambar})`,
        }}
      >
        <div className="container">
          <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
            Selamat Datang Di <br /> Travel Kuy
          </h1>
          <p className=" text-gray-800 font-medium capitalize">
            Disini kami menyediakan banyak Destinasi tempat bagus untuk ada
            kunjungi
          </p>
          <div className="mt-12 flex flex-col items-center gap-2">
            <Link
              to={"/destinationuser"}
              className="bg-gradient-to-r from-green-400 to-blue-500 border border-primary text-white px-8 py-3 font-medium 
                    rounded-md hover:bg-pink-400 hover:text-primary"
            >
              Lihat Destinasi yang belum saya kunjungi
            </Link>
            <Link
              to={"/search"}
              className="bg-gradient-to-r from-red-400 to-blue-300 border border-primary text-white px-8 py-3 font-medium 
                    rounded-md hover:bg-pink-400 hover:text-primary"
            >
              Punya Destinasi Sendiri?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;

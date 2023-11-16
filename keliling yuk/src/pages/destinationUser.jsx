import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/card";
import Banner from "../components/banner";
import { useNavigate } from "react-router-dom";

const DestinationUser = () => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [destination, setDestination] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const deleteDes = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/destinationuser/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // Tidak perlu menggunakan useEffect untuk memuat data setelah penghapusan
      getDestination();
      navigate("/destinationuser", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const getDestination = async () => {
    try {
      setLoading(true);
      let data = await axios.get("http://localhost:3000/destinationuser", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setDestination(data.data.destinationUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Memuat data destinasi saat komponen pertama kali di-mount
    getDestination();
  }, []);

  return (
    <>
      <Banner />
      <div className="grid grid-cols-3 md:grid-cols-5 gap-100 screens">
        {destination.map((el, index) => (
          <div
            key={index}
            className="card card-compact w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={el.Destination.imgUrl}
                alt="wisata"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{el.Destination.tujuan}</h2>
              <p>budget diperlukan {el.Destination.budget}</p>
              <div className="card-actions justify-end">
                <button
                  className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                  onClick={() => deleteDes(el.id)}
                >
                  Saya sudah Destinasi kesini
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default DestinationUser;

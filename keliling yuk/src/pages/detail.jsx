import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { TECollapse, TERipple } from "tw-elements-react";
import GoogleMapReact from "google-map-react";

const Detail = () => {
  const navigate = useNavigate();
  const AnyReactComponent = ({ text }) => (
    <div style={{ color: "red", fontSize: "20px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        fill="red"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M12 2C7.48 2 4 5.48 4 10c0 5.25 7.55 13.36 7.9 13.74a1 1 0 0 0 1.19 0C12.45 23.36 20 15.25 20 10 20 5.48 16.52 2 12 2zm0 14c-2.67 0-5-1.29-6.47-3.33a1 1 0 0 1 .32-1.37l8.15-5.75 8.15 5.75a1 1 0 0 1 .32 1.37C17 14.71 14.67 16 12 16z" />
      </svg>
      {text}
    </div>
  );

  const [detail, setDetail] = useState({
    tujuan: "",
    imgUrl: "",
    budget: "",
  });

  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const { id } = useParams();
  const onclickAdd = async (desId) => {
    try {
      await axios.post(`http://localhost:3000/destination/${desId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate("/destinationuser");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDetail = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/destination/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          }
        );

        setDetail({
          id: data.Detail.id,
          tujuan: data.Detail.tujuan,
          imgUrl: data.Detail.imgUrl,
          budget: data.Detail.budget,
        });
      } catch (error) {
        console.error("Error fetching destination details:", error);
        // Tambahkan penanganan kesalahan di sini jika diperlukan
      }
    };

    getDetail();
  }, [id]);

  useEffect(() => {
    const location = async () => {
      try {
        const response = await axios.get(
          `https://api.goapi.io/places?api_key=061ecc72-0add-5d2a-9849-5d36c739&search=${detail.tujuan}`
        );

        const newCenter = {
          lat: +response.data.data.results[0].lat,
          lng: +response.data.data.results[0].lng,
        };

        setCenter(newCenter);
      } catch (error) {
        console.error("Error fetching location details:", error);
        // Tambahkan penanganan kesalahan di sini jika diperlukan
      }
    };
    location();
  }, [detail.tujuan]);

  if (!detail.tujuan || !center.lat || !center.lng) {
    // Tampilkan loading spinner atau pesan loading jika diperlukan
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="mt-4 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-[200px]s">
        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <TERipple>
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <img className="rounded-t-lg" src={detail.imgUrl} alt="" />
              <a href="#!">
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
          </TERipple>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {detail.tujuan}
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {detail.budget}
            </p>
            <TERipple>
              <button
                type="button"
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={() => onclickAdd(detail.id)}
              >
                saya mau kesini
              </button>
            </TERipple>
          </div>
        </div>
      </div>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          defaultCenter={center}
          defaultZoom={11}
          options="AIzaSyDWPyro22GPXuV76GGGLwMi2WNA_tmDSXM"
        >
          <AnyReactComponent text="My Marker" />
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Detail;

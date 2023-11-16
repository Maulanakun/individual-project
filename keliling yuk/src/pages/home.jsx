import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/card";
import Banner from "../components/banner";

const Home = () => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [destination, setDestination] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDestination() {
      try {
        setLoading(true);
        let data = await axios.get("http://localhost:3000/destination", {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        setDestination(data.data.destination);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getDestination();
  }, []);
  return (
    <>
      <Banner />
      <div className="grid grid-cols-3 md:grid-cols-5 gap-100 screens">
        <Card destination={destination} loading={loading} />
      </div>
    </>
  );
};
export default Home;

import NavBar from "../components/navbar";
import { Outlet } from "react-router-dom";
const Parent = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
export default Parent;

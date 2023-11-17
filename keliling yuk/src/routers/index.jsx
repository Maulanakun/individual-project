import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/login";
import Regist from "../pages/regist";
import Home from "../pages/home";
import Parent from "../pages/parent";
import Detail from "../pages/detail";
import DestinationUser from "../pages/destinationUser";
import Profile from "../pages/profile";
import Search from "../pages/search";
import FormAdd from "../pages/formAdd";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/home");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Regist />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/home");
      }
      return null;
    },
  },

  {
    element: <Parent />,
    children: [
      {
        path: "/home",
        element: <Home />,
        loader: async () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/destination/:id",
        element: <Detail />,
        loader: async () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/destinationuser",
        element: <DestinationUser />,
        loader: async () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/search",
        element: <Search />,
        loader: async () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/formAdd/:tujuan",
        element: <FormAdd />,
        loader: async () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
    ],
  },
  {
    path: "/profile",
    element: <Profile />,
    loader: async () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
  },
]);

export default router;

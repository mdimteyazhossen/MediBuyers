import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import CategoryData from "../pages/CategoryData";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Secret";
  


const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/shop',
            element:<Shop/>
        },
        {
            path:'login',
            element:<Login/>
        },
        {
            path:'signup',
            element:<Signup/>
        },
        {
            path:'secret',
            element:<PrivateRoute><Secret/></PrivateRoute>
        },
        {
            path:'/category/:category',
            element:<CategoryData/>
        }
      ]
    },
  ]);

export default router;

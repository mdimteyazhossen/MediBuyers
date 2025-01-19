import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import CategoryData from "../pages/CategoryData";
  


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
            path:'/category/:category',
            element:<CategoryData/>
        }
      ]
    },
  ]);

export default router;

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
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/Dashboard/Cart";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManageMedicine from "../pages/Dashboard/ManageMedicine";
import Checkout from "../pages/Dashboard/Checkout";
import PaymentUser from "../pages/Dashboard/PaymentUser";
import Paymentseller from "../pages/Dashboard/Paymentseller";
import Paymentadmin from "../pages/Dashboard/Paymentadmin";
import Salesreport from "../pages/Dashboard/Salesreport";
import InvoicePage from "../pages/Dashboard/Invoice";
import Categoryadmin from "../pages/Dashboard/Categoryadmin";
import { Helmet } from "react-helmet";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <>
          <Helmet>
            <title>Home | MediBuyers</title>
            <meta name="description" content="Welcome to the home page of MediBuyers" />
          </Helmet>
          <Home />
        </>
      },
      {
        path: '/shop',
        element: <>
          <Helmet>
            <title>Shop | MediBuyers</title>
            <meta name="description" content="Browse our collection of products on MediBuyers" />
          </Helmet>
          <Shop />
        </>
      },
      {
        path: 'login',
        element: <>
          <Helmet>
            <title>Login | MediBuyers</title>
            <meta name="description" content="Login to your MediBuyers account" />
          </Helmet>
          <Login />
        </>
      },
      {
        path: 'signup',
        element: <>
          <Helmet>
            <title>Sign Up | MediBuyers</title>
            <meta name="description" content="Create a new account on MediBuyers" />
          </Helmet>
          <Signup />
        </>
      },
      {
        path: 'secret',
        element: <PrivateRoute><Secret /></PrivateRoute>
      },
      {
        path: '/category/:category',
        element: <>
          <Helmet>
            <title>Category  | MediBuyers</title>
            <meta name="description" content={`Browse products in the category`} />
          </Helmet>
          <CategoryData />
        </>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: 'cart',
        element: <>
          <Helmet>
            <title>Cart | MediBuyers</title>
            <meta name="description" content="View the items in your cart" />
          </Helmet>
          <Cart />
        </>
      },
      {
        path: 'manageusers',
        element: <AdminRoute><ManageUsers /></AdminRoute>
      },
      {
        path: 'managemedicine',
        element: <>
          <Helmet>
            <title>Manage Medicine | MediBuyers</title>
            <meta name="description" content="Manage the available medicines in your store" />
          </Helmet>
          <ManageMedicine />
        </>
      },
      {
        path: 'payment',
        element: <>
          <Helmet>
            <title>Payment | MediBuyers</title>
            <meta name="description" content="Proceed with your payment for the items" />
          </Helmet>
          <Checkout />
        </>
      },
      {
        path: 'paymentHistory',
        element: <>
          <Helmet>
            <title>Payment History | MediBuyers</title>
            <meta name="description" content="View your payment history on MediBuyers" />
          </Helmet>
          <PaymentUser />
        </>
      },
      {
        path: 'paymentseller',
        element: <>
          <Helmet>
            <title>Seller Payments | MediBuyers</title>
            <meta name="description" content="Manage your payments as a seller on MediBuyers" />
          </Helmet>
          <Paymentseller />
        </>
      },
      {
        path: 'paymentadmin',
        element: <>
          <Helmet>
            <title>Payment Admin | MediBuyers</title>
            <meta name="description" content="Admin panel for managing payments on MediBuyers" />
          </Helmet>
          <Paymentadmin />
        </>
      },
      {
        path: 'salesreport',
        element: <>
          <Helmet>
            <title>Sales Report Admin | MediBuyers</title>
            <meta name="description" content="View sales reports in the admin panel" />
          </Helmet>
          <Salesreport />
        </>
      },
      {
        path: 'invoice',
        element: <>
          <Helmet>
            <title>Invoice | MediBuyers</title>
            <meta name="description" content="View your invoice for purchases made on MediBuyers" />
          </Helmet>
          <InvoicePage />
        </>
      },
      {
        path: 'categorymanage',
        element: <>
          <Helmet>
            <title>Category Management | MediBuyers</title>
            <meta name="description" content="Manage the categories of products in your store" />
          </Helmet>
          <Categoryadmin />
        </>
      }
    ]
  },
]);

export default router;

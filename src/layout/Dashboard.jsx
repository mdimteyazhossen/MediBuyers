import { NavLink, Outlet } from "react-router-dom"
import useAdmin from "../hooks/useAdmin";
import UseSeller from "../hooks/UseSeller";

// import useSeller from "../hooks/UseSeller";


const Dashboard = () => {
  const [isAdmin] = useAdmin();
  // const isAdmin = false;
  const [isSeller] = UseSeller();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-gray-300 py-20 ">
        <img src="https://i.ibb.co.com/CM47mvS/Screenshot-2025-01-28-144553.png" alt=""  className="rounded-full w-20 h-20 mx-auto"/>
        <h2 className="text-4xl font-bold text-center py-3">MediBuyers </h2>
        <ul className="menu">
          {isAdmin &&
            <>
              <li>
                <NavLink to='/dashboard/manageusers'>Manage Users</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/categorymanage'>Manage Category</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/paymentadmin'>Payment Admin</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/salesreport'>Sales Report</NavLink>
              </li>
            </>}
          {isSeller &&
            <>
              <li>
                <NavLink to='/dashboard/managemedicine'>Manage Medicine</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/paymentseller'>Patment Seller</NavLink>
              </li>
            </>
          }
          {isAdmin || isSeller ?
            <></>
            :
            <>
              <li>
                <NavLink to='/dashboard/cart'>My Cart</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/paymentHistory'>Patment History</NavLink>
              </li>
            </>}
          <div className="divider"></div>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/shop'>Shop</NavLink>
          </li>

        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard

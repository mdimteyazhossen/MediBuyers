import { NavLink, Outlet } from "react-router-dom"


const Dashboard = () => {
  const isAdmin = true;
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-gray-300 hidden lg:block">
        <ul className="menu">
          {isAdmin ?
            <>
            <li>
            <NavLink to='/dashboard/manageusers'>Manage Users</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/cart'>My Cart</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/checkout'>My Checkout</NavLink>
          </li>
            </>
            :
            <>
              <li>
                <NavLink to='/dashboard/userHome'>User Home</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/cart'>My Cart</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/checkout'>My Checkout</NavLink>
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

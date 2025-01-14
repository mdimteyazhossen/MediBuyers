import React from 'react'
import { Outlet } from 'react-router-dom'
import Navber from '../component/Navber'
import Footer from '../component/Footer'

const Layout = () => {
    return (
        <div>
            <Navber />
            <div className='min-h-screen bg-gray-100'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout

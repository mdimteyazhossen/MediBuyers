import React, { useState } from 'react'
import DetailsModal from '../component/DetailsModal';
import { FaEye } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
const Products = ({ categorydata }) => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const [isModalOpen, setModalOpen] = useState(false);
    const [medicine, setDetailsData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const openModal = (e) => {
        setModalOpen(true);
        setDetailsData(e);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    const handleAddToCart = medicine => {
        if (user && user.email) {
            const cartItem = {
                mediId: medicine._id,
                email: user.email,
                drugName: medicine.drugName,
                manufacturer: medicine.manufacturer,
                price: medicine.price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${medicine.drugName} added to your cart!`,
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                })

        }
        else {
            Swal.fire({
                title: "You are not Logged in.",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state: {from: location}})
                }
            });
        }
    }
    return (
        <div className="overflow-x-auto lg:w-4/5 mx-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='text-center'>Medicine</th>
                        <th className='text-center'>Disclaimer</th>
                        <th className='text-center'>Favorite Color</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row */}
                    {categorydata.map((medicine, index) => (
                        <tr>
                            <td>
                                <div className="flex items-center gap-3 justify-center">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={medicine.image}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{medicine.drugName}</div>
                                        <div className="text-sm opacity-50">{medicine.countInStock} items is avialable.</div>
                                    </div>
                                </div>
                            </td>
                            <td className='text-center'>
                                {medicine.disclaimer}
                                <br />
                                <span className="badge badge-ghost badge-sm">{medicine.manufacturer}</span>
                            </td>
                            <td className='text-center'>{medicine.price}bdt / {medicine.price / 100}$</td>
                            <th className='grid gap-2'>
                                <button onClick={() => handleAddToCart(medicine)} className="btn w-full bg-gray-300">Select</button>
                                <button onClick={() => openModal(medicine)} className='btn w-full bg-gray-300'><FaEye /></button>
                            </th>
                        </tr>
                    ))}
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th className='text-center'>Medicine</th>
                        <th className='text-center'>Disclaimer</th>
                        <th className='text-center'>Favorite Color</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </tfoot>
            </table>

            <DetailsModal isOpen={isModalOpen} closeModal={closeModal} medicine={medicine} />
        </div>
    )
}

export default Products

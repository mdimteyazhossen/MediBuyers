import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DetailsModal from '../component/DetailsModal';
import { FaEye } from 'react-icons/fa';

const CategoryData = () => {
    const { category } = useParams();
    const [categorydata, setCategorydata] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [medicine, setDetailsData] = useState([]);
    console.log(categorydata)
    useEffect(() => {
        fetch(`http://localhost:5000/category/${category}`)
            .then(res => res.json())
            .then(data => {
                setCategorydata(data);
            })
    }, [])
    const openModal = (e) => {
        setModalOpen(true);
        setDetailsData(e);
    }
    const closeModal = () => {
        setModalOpen(false);
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
                                <button className="btn w-full bg-gray-300">Select</button>
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

export default CategoryData

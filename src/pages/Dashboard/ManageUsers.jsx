import React from 'react'
import useAxios from '../../hooks/useAxios'
import { useQuery } from '@tanstack/react-query';
import { FaChevronDown, FaChevronUp, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
const ManageUsers = () => {
    const axiosSecure = useAxios();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })
    const handleRoleChange = (id, newRole) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Convert it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Updated!",
                    text: "User has been updated.",
                    icon: "success"
                });
                axiosSecure
                    .put(`/update-user/${id}`, { role: newRole })
                    .then((res) => {
                        refetch(); // Refetch cart after quantity update
                    })
                    .catch((err) => {
                        console.error("Error updating quantity", err);
                        Swal.fire({
                            title: "Error!",
                            text: "There was an issue updating the quantity.",
                            icon: "error",
                        });
                    });
            }
        });

    };
    return (
        <div>
            <h2 className="text-4xl">Total Users: {users.length}</h2>

            <div className="overflow-x-auto lg:w-4/5 mx-auto">
                <table className="table overflow-x-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Drug Name</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {users.map((item, index) =>
                            <tr id={index} className="hover">
                                <th>{index + 1}</th>
                                <td>{item.name}n</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className='btn'
                                        onClick={() => handleRoleChange(item._id, item.role === "user" ? "seller" : "user")}>{`Convert to the ${item.role === "user" ? "seller" : "user"}`}</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageUsers

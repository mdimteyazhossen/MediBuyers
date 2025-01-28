import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";
import useCart from "../../hooks/useCart"
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = useCart()
    const axiosSecure = useAxios();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                refetch();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                            }
                        });
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    const handleQuantityChange = (id, newQuantity) => {
        // Ensure newQuantity is valid
        if (newQuantity <= 0) return; // Avoid setting invalid quantities

        axiosSecure
            .put(`/update-cart/${id}`, { quantity: newQuantity })
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
    };

    const incrementQuantity = (item) => {
        const newQuantity = item.quantity + 1;
        handleQuantityChange(item._id, newQuantity);
    };

    const decrementQuantity = (item) => {
        if (item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            handleQuantityChange(item._id, newQuantity);
        }
    };

    return (
        <div>
            <div>
                <h2 className="text-4xl">Total Items:{cart.length}</h2>
                <h2 className="text-4xl">Total Price:{totalPrice}</h2>
                {cart.length ?
                    <Link to='/dashboard/payment'>
                        <button className="btn px-5">Check Out</button>
                    </Link>
                    :
                    <button disabled className="btn px-5">Check Out</button>
                }
            </div>
            <div className="overflow-x-auto lg:w-4/5 mx-auto">
                <table className="table overflow-x-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Drug Name</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {cart.map((item, index) =>
                            <tr id={index} className="hover">
                                <th>{index + 1}</th>
                                <td>{item.drugName}n</td>
                                <td>{item.manufacturer}</td>
                                <td>{item.price}</td>
                                <td className="flex gap-4">{item.quantity}
                                    <div className="grid items-center gap-1">
                                        <button
                                            onClick={() => incrementQuantity(item)} className="bg-gray-200 p-1 rounded-lg"><FaChevronUp /></button>
                                        <button
                                            onClick={() => decrementQuantity(item)} className="bg-gray-200 p-1 rounded-lg"><FaChevronDown /></button>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn bg-red-600 text-white font-bold"><FaTrashAlt /></button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cart

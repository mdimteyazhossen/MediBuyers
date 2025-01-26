import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import useAuth from '../hooks/useAuth'
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                Swal.fire({
                    title: "User Sign In successfully.",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                const userInfo ={
                    email:result.user?.email,
                    name: result.user?.displayName,
                    role: 'user'
                }
                axiosPublic.post('/users' , userInfo)
                .then(res =>{
                    console.log(res)
                })
                navigate('/')
            })
    }
    return (
        <div className='p-4 justify-center'>
            <div className="divider"></div>
            <button
                onClick={handleGoogleSignIn}
                className='btn bg-gray-600 text-white'>
                <FaGoogle className='mr-4'></FaGoogle>
                Google
            </button>
        </div>
    )
}

export default SocialLogin

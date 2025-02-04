import React, { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import SocialLogin from '../component/SocialLogin';
import Swal from 'sweetalert2';

const Signup = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { createuser } = useContext(AuthContext);
  const onSubmit = (data) => {
    createuser(data.email, data.password)
      .then(result => {
        console.log(result.user)
        const userInfo = {
          name: data.name,
          email: data.email,
          role: data.role
        }
        axiosPublic.post('/users', userInfo)
          .then(res => {
            if (res.inserted.dataId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/')
            }
          })
      })
  }


  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required name='email'{...register("email", { required: true })} />
              {errors.email && <span>This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="name" className="input input-bordered" required name='name' {...register("name", { required: true })} />
              {errors.name && <span>This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" required name='password' {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$%&*])(?=.*[0-9])(?=.*[a-z])/ })} />
              {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
              {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 characters.</p>}
              {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must be 6 characters and one uppercase and one lowercase and one number and one spcial character.</p>}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select className="select select-bordered" name='role' {...register("role", { required: true })}>
                <option value="">Select Role</option>
                <option value="seller">Seller</option>
                <option value="user">User</option>
              </select>
              {errors.role && <span>This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="input input-bordered"
              />
            </div>

            <div className="form-control mt-6">
              <input className="btn btn-primary" type='submit' value='Sign Up'></input>
            </div>
          </form>
          <p><small>Already have an account? <Link to='/login' className='text-red-700 font-bold'>Please login!</Link></small></p>
          <SocialLogin />
        </div>
      </div>
    </div>
  )
}

export default Signup

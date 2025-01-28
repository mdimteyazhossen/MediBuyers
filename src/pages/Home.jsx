import React from 'react'
import Slider from '../component/Slider'
import Category from '../component/Category'
import Uploadprescription from '../component/Uploadprescription'
import useAuth from '../hooks/useAuth'

const Home = () => {
  return (
    <div className='grid gap-20'>
      <Slider/>
      <Uploadprescription/>
      <Category/>
    </div>
  )
}

export default Home

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  const [categoryData , setCategory] = useState([])
  const [loading , setLoading] = useState(true);
   useEffect(()=>{
          fetch('https://y-pearl-nu.vercel.app/allcategory')
          .then(res => res.json())
          .then(data =>{
              setCategory(data);
              setLoading(false);
          })
      },[])


  return (
    <div className='grid gap-12'>
      <h1 className='text-3xl font-bold text-center'>Shop By Category</h1>
      <div className='flex gap-2 flex-wrap w-4/5 mx-auto justify-center'>
        {categoryData && categoryData.map((category, index) => (
          <Link to={`/category/${category.category}`} id={index} className='border-2 w-36 h-42'>
            <img src={category.image} alt="" className='h-32 w-36' />
            <p className='text-sm text-center font-bold'>{category.category}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Category

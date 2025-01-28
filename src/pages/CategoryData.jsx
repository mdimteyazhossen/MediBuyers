import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Products from '../component/Products';

const CategoryData = () => {
    const { category } = useParams();
    const [categorydata, setCategorydata] = useState([]);
    // console.log(categorydata)
    useEffect(() => {
        fetch(`https://y-pearl-nu.vercel.app/category/${category}`)
            .then(res => res.json())
            .then(data => {
                setCategorydata(data);
            })
    }, [])

    return (
        <div>
            <Products categorydata={categorydata}/>
        </div>
    )
}

export default CategoryData

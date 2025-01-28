import React, { useEffect, useState } from 'react'
import Products from '../component/Products';


const Shop = () => {
    const [categorydata, setCategorydata] = useState([]);
    const [loading , setLoading] = useState(true);
    useEffect(()=>{
        fetch('http://localhost:5000/medicine')
        .then(res => res.json())
        .then(data =>{
            setCategorydata(data);
            setLoading(false);
        })
    },[])

    return (
        <div>
            <Products categorydata={categorydata}/>
        </div>
    )
}

export default Shop

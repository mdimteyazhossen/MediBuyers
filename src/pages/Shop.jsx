import React, { useEffect, useState } from 'react'
import Products from '../component/Products';


const Shop = () => {
    const [categorydata, setCategorydata] = useState([]);
    const [loading , setLoading] = useState(true);
    useEffect(()=>{
        fetch('https://y-pearl-nu.vercel.app/medicine')
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

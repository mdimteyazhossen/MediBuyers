import React from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  const categoryData = [
    {
      category: "Diuretics",
      image: "https://example.com/diuretics.jpg"
    },
    {
      category: "Depression",
      image: "https://example.com/depression.jpg"
    },
    {
      category: "Cholesterol (HMG-CoA reductase inhibitors - Statins)",
      image: "https://example.com/cholesterol.jpg"
    },
    {
      category: "Blood Pressure",
      image: "https://example.com/blood_pressure.jpg"
    },
    {
      category: "Antiplatelet",
      image: "https://example.com/antiplatelet.jpg"
    },
    {
      category: "Pain Killer",
      image: "https://example.com/pain_killer.jpg"
    },
    {
      category: "H2 Blockers",
      image: "https://example.com/h2_blockers.jpg"
    },
    {
      category: "Dermatology",
      image: "https://example.com/dermatology.jpg"
    },
    {
      category: "Antibiotics",
      image: "https://example.com/antibiotics.jpg"
    },
    {
      category: "Diabetes",
      image: "https://example.com/diabetes.jpg"
    },
    {
      category: "Gastroesophageal",
      image: "https://example.com/gastroesophageal.jpg"
    },
    {
      category: "Insomnia",
      image: "https://example.com/insomnia.jpg"
    },
    {
      category: "Anticonvulsants",
      image: "https://example.com/anticonvulsants.jpg"
    },
    {
      category: "Inhaler",
      image: "https://example.com/inhaler.jpg"
    },
    {
      category: "Antihistamine",
      image: "https://example.com/antihistamine.jpg"
    },
    {
      category: "Inflammatory",
      image: "https://example.com/inflammatory.jpg"
    },
    {
      category: "Gynaecology",
      image: "https://example.com/gynaecology.jpg"
    },
    {
      category: "Corticosteroid",
      image: "https://example.com/corticosteroid.jpg"
    },
    {
      category: "Dental",
      image: "https://example.com/dental.jpg"
    },
    {
      category: "Fracture",
      image: "https://example.com/fracture.jpg"
    },
    {
      category: "Women Care",
      image: "https://example.com/women_care.jpg"
    },
    {
      category: "Personal Care",
      image: "https://example.com/personal_care.jpg"
    },
    {
      category: "Baby Care",
      image: "https://example.com/baby_care.jpg"
    },
    {
      category: "Ayurveda",
      image: "https://example.com/ayurveda.jpg"
    },
    {
      category: "Health Devices",
      image: "https://example.com/health_devices.jpg"
    },
    {
      category: "Nutritional Drinks & Supplements",
      image: "https://example.com/nutritional_drinks.jpg"
    }
  ]


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

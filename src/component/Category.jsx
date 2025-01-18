import React from 'react'

const Category = () => {
  const categoryData = [
    {
      "title": "Pain Relief",
      "image": "https://i.ibb.co.com/4t0bNz5/painrelif-ass12.jpg"
    },
    {
      "title": "Antibiotics",
      "image": "https://i.ibb.co.com/SBJ1Rn3/antibiotics-ass-12.jpg"
    },
    {
      "title": "Vitamins & Supplements",
      "image": "https://i.ibb.co.com/jMbpCwH/Vitamins-and-supplements-ass-12.jpg"
    },
    {
      "title": "Cold & Flu Remedies",
      "image": "https://i.ibb.co.com/rmHwhd8/Cold-Flu-Remedies-ass-12.jpg"
    },
    {
      "title": "Skin Care",
      "image": "https://i.ibb.co.com/Vj6cNGm/Skin-Care-ass-12.jpg"
    },
    {
      "title": "Weight Loss Products",
      "image": "https://i.ibb.co.com/m6XFt5d/Weight-Loss-Products-ass-12.jpg"
    },
    {
      "title": "Eye Care",
      "image": "https://i.ibb.co.com/D8y4xC8/Eye-Care-ass-12.jpg"
    },
    {
      "title": "Hair Care",
      "image": "https://i.ibb.co.com/GM2Z0Ns/Hair-Care-ass-12.jpg"
    },
    {
      "title": "Sexual Health",
      "image": "https://i.ibb.co.com/tXvfTNr/Sexual-Health-ass-12.jpg"
    },
    {
      "title": "Digestive Health",
      "image": "https://i.ibb.co.com/fxynbCy/Digestive-Health-ass-12.jpg"
    },
    {
      "title": "First Aid Supplies",
      "image": "https://i.ibb.co.com/wRD703K/First-Aid-Supplies-ass-12.jpg"
    },
    {
      "title": "Medical Devices",
      "image": "https://i.ibb.co.com/273dCSn/Medical-Devices-ass-12.jpg"
    }
  ]
  return (
    <div className='grid gap-12'>
      <h1 className='text-3xl font-bold text-center'>Shop By Category</h1>
      <div className='flex gap-2 flex-wrap w-4/5 mx-auto justify-center'>
        {categoryData && categoryData.map((category, index) => (
          <div id={index} className='border-2 w-36 h-42'>
            <img src={category.image} alt="" className='h-32 w-36' />
            <p className='text-sm text-center font-bold'>{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category

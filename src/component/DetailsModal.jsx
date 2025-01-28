import React from 'react'

const DetailsModal = ({ isOpen, closeModal, medicine }) => {
    if (!isOpen) return null;
    // {
    //     drugName: "Atorvastatin",
    //     manufacturer: "Pfizer Inc.",
    //     image:
    //         "https://cdn01.pharmeasy.in/dam/products/J21424/atorvastatin-10-mg-tablet-10-medlife-pure-generics-combo-3-1626532296.jpg",
    //     description: "Used to lower cholesterol and triglyceride levels.",
    //     consumeType: "Oral",
    //     expirydate: "2025-1-15",
    //     price: 60,
    //     sideEffects: "Muscle pain, nausea, headache",
    //     disclaimer: "Consult your doctor before use.",
    //     category: "HMG-CoA reductase inhibitors, or statins.",
    //     countInStock: 100,
    // },
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-gray-200 p-10 rounded-lg  overflow-auto"
                onClick={(e) => e.stopPropagation()} // Prevent closing on clicking inside modal
            >
                <div>
                    <h2 className="text-2xl font-bold mb-4">Medicine Details</h2>
                    <div className='grid  gap-10'>
                        <div className='flex gap-10'>
                            <img src={medicine.image} alt="" className='h-72 w-72 rounded-2xl' />
                            <div className='grid items-center'>
                                <p className='text-xl'><span className='font-semibold'>Name: </span> {medicine.drugName}</p>
                                <p className='text-lg'><span className='font-medium'>Price: </span> {medicine.price} BDT / {medicine.price / 100}$</p>
                                <p className='text-lg'><span className='font-medium'>Disclaimer: </span> {medicine.disclaimer}</p>
                                <p className='text-lg'><span className='font-medium'>Stock Status: </span> {medicine.countInStock}</p>
                                <p className='text-lg'><span className='font-medium'>Consume Type: </span> {medicine.consumeType}</p>
                                <p className='text-lg'><span className='font-medium'>Expire Date: </span> {medicine.expirydate}</p>
                                {/* <p className='text-lg'><strong>Manufacturer: </strong> {medicine.manufacturer}</p> */}
                            </div>
                        </div>
                        <div className='grid  gap-2'>
                            <p><span className='font-medium text-lg'>Decription: </span> {medicine.description}</p>
                            <p><span className='font-medium text-lg'>Side Effects:</span> {medicine.sideEffects}</p>
                            <p ><pan className='font-medium text-lg' g>Manufacturer: </pan> {medicine.manufacturer}</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <button
                        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg text-lg font-bold w-full "
                        onClick={closeModal}
                    >
                        Close
                    </button>
                    {/* <button className='mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg text-lg font-bold w-full'>Select</button> */}
                </div>
            </div>
        </div>
    )
}

export default DetailsModal

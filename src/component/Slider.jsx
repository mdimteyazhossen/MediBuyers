import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Slider = () => {
    const slides = [
        { image: 'https://i.ibb.co.com/8cd2rRq/slider1-Medi-Buyers.webp', alt: 'Slide 1' },
        { image: 'https://i.ibb.co.com/n7qNPyt/happy10-web-banner-01-1726143458480.webp', alt: 'Slide 2' },
        { image: "https://i.ibb.co.com/QHQk3Vw/doctor-web-banner-1673094490295.webp", alt: 'Slide 3' },
    ];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative w-full overflow-hidden">
            <div className="relative flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 flex">
                        <img src={slide.image} alt={slide.alt} className="w-full object-contain" />
                        {/* <div className='fixed w-full p-5 lg:p-10 text-base-100 text-center grid gap-5'>
            <h1 className='md:text-2xl lg:text-4xl font-extrabold text-white'>{slide.title}</h1>
            <p className='text-sm md:text-xl lg:text-2xl font-bold text-white'>{slide.desc}</p>
            <Link to='allsportequipment' className='btn w-[250px] md:w-[300px] text-white lg:w-[300px] mx-auto bg-green-600 md:text-xl lg:text-xl font-bold text-base-100' >See All Sports Equipment</Link>
            </div> */}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-green-600' : 'bg-gray-300'} transition-all`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Slider;
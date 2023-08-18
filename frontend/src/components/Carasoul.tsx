import React, { useEffect, useRef, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled,RxDot } from 'react-icons/rx'; 


const  CarouselCustom = () => {
  const slides = [
    {
      url: "/assets/transfer.jpg",
      msg:"Easy money Transfer",
      color:"#61677A",
      marginbottom:30,
      marginleft:0
    },
    {
      url: "/assets/deposit.jpg",
      msg:"Fixed deposits",
      color:"#FB2576",
      marginbottom:380,
      marginleft:150
    },
    {
      url: "/assets/savings.jpg",
      msg:"Money savings",
      color:"#060047",
      marginbottom:250,
      marginleft:130
    },
  ];
  
 
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | undefined>(undefined);

  const startInterval = () => {
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
  };

useEffect(()=>{
startInterval()
},[])
  const stopInterval = () => {
    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
    }
  };

  const restartInterval = () => {
    if (intervalRef.current === undefined) {
      startInterval();
    }
  };
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex:number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[800px] h-[500px] w-full m-6 relative group' onMouseEnter={stopInterval} onMouseLeave={restartInterval}>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='flex flex-row justify-center items-end py-5 w-full h-full rounded-2xl bg-center bg-cover duration-1000'
      >
        <p className="font-mono text-3xl font-bold duration-1000" style={{color:`${slides[currentIndex].color}`,marginBottom:`${slides[currentIndex].marginbottom}px`,marginLeft:`${slides[currentIndex].marginleft}px`}}>{slides[currentIndex].msg}</p>
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            {currentIndex==slideIndex?<RxDotFilled color='white' />:<RxDot color='white'/>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarouselCustom;
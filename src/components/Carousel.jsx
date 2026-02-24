import React from 'react';
import './Carousel.css';
import HowItWorks from './HowItWorks';
import HistoryOfCipher from './HistoryOfCipher';
import EncryptorTool from './EncryptorTool';

function Carousel({ activeSlide }) {
  const transformValue = `translateX(-${(activeSlide * 100) / 3}%)`;

  return (
    <div className='carousel-container'>
      <div className='carousel-track' style={{ transform: transformValue }}>

        <div className='carousel-slide'>
          <div className='slide-content'>
            <HowItWorks />
          </div>
        </div>

        <div className='carousel-slide'>
          <div className='slide-content'>
            <EncryptorTool />
          </div>
        </div>

        <div className='carousel-slide'>
          <div className='slide-content'>
            <HistoryOfCipher />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Carousel;
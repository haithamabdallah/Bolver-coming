// src/components/Slider.jsx
import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Slider.css';
import { gsap } from 'gsap';

function Slider({ swiperRef, activeIndex, setActiveIndex }) {
    const animateSlide = (slide) => {
        if (!slide) return;
        const imageContent = slide.querySelector('.image-content img');
        const tl = gsap.timeline();
        tl.fromTo(imageContent, { opacity: 0, y: 150 }, { opacity: 1, y: 0, duration: 3, ease: 'power3.out' }, '<0.5');
    };

    useEffect(() => {
        const swiper = swiperRef.current.swiper;

        // Trigger animation for the initial active slide
        animateSlide(swiper.slides[swiper.activeIndex]);

        swiper.on('slideChange', () => {
            setActiveIndex(swiper.activeIndex); // Update active index on slide change
            animateSlide(swiper.slides[swiper.activeIndex]);
        });

        return () => {
            swiper.off('slideChange');
        };
    }, [swiperRef, setActiveIndex]);

    const slides = [
        { imgSrc: '/images/slider/slide-01.png' },
        { imgSrc: '/images/slider/slide-02.png' },
        { imgSrc: '/images/slider/slide-03.png' },
        { imgSrc: '/images/slider/slide-04.png' },
    ];

    return (
        <Swiper
            ref={swiperRef} // Reference to the Swiper instance
            effect="fade" // Use fade effect
            speed={600}
            modules={[Autoplay, EffectFade]} // Include EffectFade module
            slidesPerView={1}
            autoplay={{
                delay: 5500,
                disableOnInteraction: false,
            }}
            className="swiper-container"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className="slide">
                    <div className="slide-content">
                        <div className="image-content">
                            <img src={slide.imgSrc} alt={`Slide ${index + 1}`} />
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default Slider;

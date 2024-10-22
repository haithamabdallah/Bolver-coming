
// src/components/Slider.jsx
import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination'; // Ensure to import pagination styles
import './Slider.css';
import { gsap } from 'gsap';

function Slider() {
    const slideRefs = useRef([]);

    const animateSlide = (slide) => {
        if (!slide) return;
        const imageContent = slide.querySelector('.image-content img');
        const tl = gsap.timeline();
        tl.fromTo(imageContent, { opacity: 0, y: 150 }, { opacity: 1, y: 0, duration: 3, ease: 'power3.out' }, '<0.5');
    };

    useEffect(() => {
        const swiper = slideRefs.current.swiper;
        animateSlide(slideRefs.current[swiper.activeIndex]);

        swiper.on('slideChange', () => {
            const activeIndex = swiper.activeIndex;
            animateSlide(slideRefs.current[activeIndex]);
        });

        return () => {
            swiper.off('slideChange');
        };
    }, []);

    const slides = [
        { imgSrc: '/images/slider/slide-01.png' },
        { imgSrc: '/images/slider/slide-02.png' },
        { imgSrc: '/images/slider/slide-03.png' },
        { imgSrc: '/images/slider/slide-04.png' },
    ];

    return (
        <Swiper
            ref={slideRefs}
            effect="fade"
            speed={600}
            modules={[Autoplay, EffectFade, Pagination]} // Include Pagination module
            slidesPerView={1}
            pagination={{
                clickable: true, // Make bullets clickable
                renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`, // Custom bullet render
            }}
            autoplay={{
                delay: 5500,
                disableOnInteraction: false,
            }}
            className="swiper-container"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className="slide">
                    <div ref={(el) => (slideRefs.current[index] = el)} className="slide-content">
                        <div className="image-content">
                            <img src={slide.imgSrc} alt={`Slide ${index + 1}`} />
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;

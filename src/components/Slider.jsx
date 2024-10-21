// src/components/Slider.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useEffect } from 'react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'; // Import fade effect styles
import './Slider.css';
import { gsap } from 'gsap';

const Slider = () => {
    const slideRefs = useRef([]);

    // GSAP animation function for text and image
    const animateSlide = (slide) => {
        const textContent = slide.querySelector('.text-content');
        const imageContent = slide.querySelector('.image-content img');

        const tl = gsap.timeline();

        // Text animation: From top to center
        tl.fromTo(
            textContent,
            { opacity: 0, y: -150 },
            { opacity: 1, y: 0, duration: 2, ease: 'power3.out' }
        );

        // Image animation: From bottom with fade-in
        tl.fromTo(
            imageContent,
            { opacity: 0, y: 150 },
            { opacity: 1, y: 0, duration: 3, ease: 'power3.out' },
            '<0.5' // Start slightly overlapping with text animation
        );
    };

    useEffect(() => {
        const swiperEl = document.querySelector('.swiper-container').swiper;

        // Trigger animation for the initial active slide
        animateSlide(slideRefs.current[swiperEl.activeIndex]);

        // Add event listener to animate on every slide change
        swiperEl.on('slideChange', () => {
            const activeIndex = swiperEl.activeIndex;
            animateSlide(slideRefs.current[activeIndex]);
        });
    }, []);

    const slides = [
        {
            heading: 'Skincare Pro Advisor',
            text: 'With our expertise, we craft tailored strategies that align with your business goals, creating captivating brand identities and positioning you for growth.',
            imgSrc: '/images/slider/slide-01.png',
        },
        {
            heading: 'BOLVER BEAUTY SERVICES',
            text: 'We create captivating brand identities and strategies that align with your business goals and empower your business to thrive in today’s competitive landscape.',
            imgSrc: '/images/slider/slide-02.png',
        },
        {
            heading: 'Instant Makeup Try-On',
            text: 'Explore our innovative instant makeup try-on feature, designed to provide customers with a seamless shopping experience.',
            imgSrc: '/images/slider/slide-03.png',
        },
    ];

    return (
        <Swiper
            effect="fade" // Use fade effect
            speed={600}
            pagination={{ clickable: true }}
            modules={[Autoplay, EffectFade, Pagination]} // Include EffectFade module
            slidesPerView={1}
            autoplay={{
                delay: 5500,
                disableOnInteraction: false,
            }}
            className="swiper-container"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className="slide">
                    <div ref={(el) => (slideRefs.current[index] = el)} className="slide-content">
                        <div className="text-content">
                            <h1>{slide.heading}</h1>
                            <p>{slide.text}</p>
                        </div>
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

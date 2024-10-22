// src/Layout.jsx
import { useState, useEffect } from 'react';
import Slider from './components/Slider';
import PopupForm from "./components/PopupForm";
import './Layout.css';
import { gsap } from 'gsap';

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo('.heading h1', { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' })
            .fromTo('.heading p', { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
            .fromTo('.heading button', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.25');

        gsap.to('.layout', {
            backgroundPosition: '50% 50%',
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }, []);

    return (
        <div className="layout" style={{
            backgroundImage: "url('/images/backs/back.png')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <header className="header">
                <div className="topbar">
                    <p>Something big is coming! We’re working hard to bring you an amazing experience. Stay tuned!</p>
                </div>
                <div className="header-contents">
                    <img src="/logo.png" alt="Logo" className="logo" />
                </div>
            </header>
            <main className="main-content">
                <div className="heading">
                    <h1>Something big is coming!</h1>
                    <p>We’re working hard to bring you an amazing experience. Stay tuned!</p>
                    <button onClick={togglePopup}>Sign up</button>
                </div>
                {/* Include the Slider component */}
                <Slider />
                <PopupForm isOpen={isOpen} togglePopup={togglePopup} />
            </main>
        </div>
    );
};

export default Layout;

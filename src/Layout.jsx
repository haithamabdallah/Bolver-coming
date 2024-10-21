// src/Layout.jsx
import { useEffect } from 'react';
import Slider from './components/Slider';
import './Layout.css';
import { gsap } from 'gsap';

const Layout = () => {
    useEffect(() => {


        // Optional: Add a wave effect by changing the background position
        gsap.to('.layout', {
            backgroundPosition: '50% 50%', // Move from right to left
            duration: 10, // Duration of movement
            repeat: -1, // Loop indefinitely
            yoyo: true, // Reverse animation
            ease: 'sine.inOut' // Easing function
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
                <div className="header-contents">
                    <img src="/logo.png" alt="Logo" className="logo" />
                    <div className="contacts">
                        <a href="mailto:info@bolverusa.com">contacts</a>
                    </div>
                </div>
            </header>
            <main className="main-content">
                <Slider />
            </main>
        </div>
    );
};

export default Layout;

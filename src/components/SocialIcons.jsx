import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import './SocialIcon.css';

export default function SocialIcons() {
    return (
        <div className="social-icons">
            <h1>Follow us</h1>
            <div className="icons">
                <a href="https://www.facebook.com/Bolverusacosmetics" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF size={24} />
                </a>
                <a href="https://www.instagram.com/bolverusa/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={24} />
                </a>
                <a href="https://www.tiktok.com/@bolverusa?_t=8qlBpRtjUNK&_r=1" target="_blank" rel="noopener noreferrer">
                    <FaTiktok size={24} />
                </a>
            </div>
        </div>
    );
}

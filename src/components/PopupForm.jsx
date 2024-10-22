import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS
import './PopupForm.css';

export default function PopupForm({ isOpen, togglePopup }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [emailStatus, setEmailStatus] = useState(''); // For feedback message
    const [isSubmitted, setIsSubmitted] = useState(false); // Track if form is submitted

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Set your EmailJS keys here
        const serviceId = 'service_1c2azgj'; // Find this in your EmailJS dashboard
        const templateId = 'template_bldeuuc'; // Find this in your EmailJS dashboard
        const userId = 'Jm8I-s7AiSeMTK2ps'; // Find this in your EmailJS account

        // Send email
        emailjs
            .send(serviceId, templateId, formData, userId)
            .then(
                (response) => {
                    setEmailStatus('Email sent successfully!');
                    setIsSubmitted(true); // Mark as submitted
                },
                (error) => {
                    setEmailStatus('Failed to send email. Please try again later.');
                    setIsSubmitted(true); // Mark as submitted even on error
                }
            );
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target.classList.contains('popup')) {
                togglePopup();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        {!isSubmitted ? ( // Check if form has been submitted
                            <>
                                <h2>Contact Form</h2>
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Full Name:
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Email:
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Phone:
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Subject:
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Message:
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <button type="submit">Send</button>
                                </form>
                            </>
                        ) : ( // Show this content when form is submitted
                            <div className="email-status">
                                <p>{emailStatus}</p>
                            </div>
                        )}
                        <button className="btn_close" onClick={togglePopup}>x</button>
                    </div>
                </div>
            )}
        </>
    );
}


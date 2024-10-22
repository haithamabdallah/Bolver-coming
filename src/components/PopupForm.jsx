import React, { useEffect } from 'react';
import './PopupForm.css';

function PopupForm({ isOpen, togglePopup }) {
    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

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
        console.log('Form Data:', formData);
        togglePopup(); // Close the popup after submit
    };

    useEffect(() => {
        // Close popup if clicked outside of the content
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
                        <h2>If you have any questions or inquiries, please fill out the form below, and we will get back to you as soon as possible.</h2>
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
                        <button className="btn_close" onClick={togglePopup}>x</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default PopupForm;

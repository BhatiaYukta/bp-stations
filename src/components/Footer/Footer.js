import React from 'react';
import './Footer.css';  // Import the custom Footer styles

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                <p>
                    Privacy Policy | 
                    Terms & Conditions
                </p>
            </div>
        </footer>
    );
};

export default Footer;

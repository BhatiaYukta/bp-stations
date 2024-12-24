import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import './Header.css';  // Import the custom CSS file
import bplogo from '../../assets/images/bplogo.webp'

const Header = () => {
    return (
        <header className="header">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {/* Left side with white background and logo */}
                <div className="logo-container">
                    <img src={bplogo} alt="BP Logo" className="logo" />
                </div>

                {/* Right side with background image and text */}
                <div className="content-container">
                    <div className="content">
                        <h1 className="heading">Find your nearest bp</h1>
                        <p className="subheading">Discover the closest locations for fuel, convenience, and more.</p>
                    </div>
                </div>
            </div>
         </header>
    );
}

export default Header;

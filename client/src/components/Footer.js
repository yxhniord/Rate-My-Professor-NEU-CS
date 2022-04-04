import React from 'react';
import "../styles/Footer.css";

function Footer() {
    return (
        <footer>
            {/*TODO: add social media if needed*/}
            Copyright &copy; {new Date().getFullYear()} NEU Rate My Professor
        </footer>
    );
}

export default Footer;
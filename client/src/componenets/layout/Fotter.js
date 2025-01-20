import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <div className='footer' style={{ background: '#f5b82e' }}>

      <div className='footer-content'>
        <div className='first-footer'>
          <h2 className='website-name'>Purchase now</h2>
          <p className='website-d'>It is an E-Commerce Website.<br />Buy from your apni dukkan</p>
          <h5 className='social-heading'>Follow us</h5>
          <div className="social-media">
            <Link to="https://www.linkedin.com/in/abhishek--sharma--/" target="_blank" className="social-link linkedin"><FaLinkedin /></Link>
            <Link to="https://twitter.com/Abhishe10155800" target="_blank" className="social-link twitter"><FaTwitter /></Link>
            <Link to="https://github.com/abhisheksharma010" target="_blank" className="social-link github"><FaGithub /></Link>

          </div>


          <Link to="https://abhishek-sharma-omega.vercel.app/" target="_blank" className="social-link portfolio">Portfolio</Link>
        </div>
        <div className='explore-section'>
          <h4 className='explore-h'>Explore More</h4>
          <Link to='/about' className="social-link footer-link">About</Link>
          <br />
          <Link to='/contact' className="social-link footer-link">Contact</Link>
          <br />
          <Link to='/policy' className=" social-link footer-link">Privacy and Policy</Link>
        </div>
        <div className='third-footer'>
          <h4 className='explore-h'>Contact Details</h4>
          <p>
            Address: 123 Main Street, City, Country<br />
            Phone: +1234567890<br />
            Email: abhisheksharma32344@gmail.com
          </p>
        </div>
      </div>
      <div className='col-md-12 text-center rights-r'>
        <p>All Right Reserved &copy; Abhishek Sharma</p>
      </div>
    </div>
  );
};

export default Footer;

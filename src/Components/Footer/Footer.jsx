import React from 'react'
import './Footer.css'
import footer_logo from '../../assets/footer_logo.svg'
import user_icon from '../../assets/user_icon.svg'
import theme_pattern from '../../assets/theme_pattern.svg'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-top">
        <div className="footer-top-left">
          <div className="footer-top-left-name">
            <h4>Rajasekhar Reddy K</h4>
            <img src={theme_pattern} alt="" />
          </div>
          <p>I am a Full Stack developer, from USA with 4+ years of experience.</p>
        </div>
        <div className="footer-top-right">
          <div className="footer-email-input">
            <img src={user_icon} alt="" />
            <input type="email" placeholder='Enter your email' />
          </div>
          <div className="footer-subscribe">Subscribe</div>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p className="footer-bottom-left"> © Rajasekhar Reddy Kolagotla. All Rights Reserved</p>
        <div className="footer-bottom-right">
          <p>Term of Services</p>
          <p>Privacy Policy</p>
          <p>Connect With Me</p>
        </div>
      </div>
    </div>
  )
}

export default Footer

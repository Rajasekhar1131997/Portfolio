import React from 'react'
import './Hero.css'
import profile_img from '../../assets/profile_img.jpg'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Hero = () => {
  return (
    <div id = 'home' className='hero'>
      <img src={profile_img} alt="" />
      <h1><span>I'm Rajasekhar Reddy Kolagotla,</span> Full Stack developer based in USA.</h1>
      <p>I am a frontend developer from California, USA with 4 years of experience</p>
      <div className="hero-action">
        <div className="hero-connect"><AnchorLink className='anchor-link' offset={50} href='#contact'>Connect With Me</AnchorLink></div>
        <div className="hero-resume" onClick={()=> window.open("https://rajasekharcertifications.s3.us-east-2.amazonaws.com/Rajasekhar_Reddy_FS_Resume.pdf","_blank")}>My Resume</div>
      </div>
    </div>
  )
}

export default Hero

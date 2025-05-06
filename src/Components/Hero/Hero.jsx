import React, { useEffect, useState } from 'react';
import './Hero.css';
import profile_img from '../../assets/profile_img.jpg';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Hero = () => {
  const titles = [
    "Software Engineer",
    "Front-end Developer",
    "Back-end Developer",
    "Full Stack Developer",
    "Data Analyst",
  ];

  const [text, setText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setText(
        isDeleting
          ? currentTitle.substring(0, charIndex - 1)
          : currentTitle.substring(0, charIndex + 1)
      );
      setCharIndex(isDeleting ? charIndex - 1 : charIndex + 1);

      if (!isDeleting && charIndex === currentTitle.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTitleIndex((titleIndex + 1) % titles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  return (
    <div id='home' className='hero'>
      <img src={profile_img} alt="Profile" />
      <h1>
        <span>I'm Rajasekhar Reddy Kolagotla,</span><br />
        <span className='typewriter-text'>{text}</span> based in USA.
      </h1>
      <p>I am a full Stack Software developer from California, USA with 4+ years of experience.</p>
      <div className="hero-action">
        <div className="hero-connect">
          <AnchorLink className='anchor-link' offset={50} href='#contact'>Connect With Me</AnchorLink>
        </div>
        <div
          className="hero-resume"
          onClick={() => {
            const link = document.createElement('a');
            link.href = "https://raw.githubusercontent.com/Rajasekhar1131997/Portfolio/main/Rajasekhar_Reddy_FS_Resume.pdf";
            link.download = "Rajasekhar_Reddy_FS_Resume.pdf";
            link.click();
          }}
        >
          My Resume
        </div>
      </div>
    </div>
  );
};

export default Hero;

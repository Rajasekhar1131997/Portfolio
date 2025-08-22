import React from 'react'
import './About.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import profile_img from '../../assets/about_profile.jpg'

const About = () => {
    return (
        <div id = 'about' className='about'>
            <div className="about-title">
                <h1>About Me</h1>
                <img src={theme_pattern} alt="" />
            </div>
            <div className="about-sections">
                <div className="about-left">
                    <img src={profile_img} alt="" />
                </div>
                <div className="about-right">
                    <div className="about-para">
                        <p>I love building end-to-end solutions that seamlessly connect the front-end 
                            and back-end, ensuring both functionality and great user experience. 
                            From crafting sleek interfaces with React to designing optimized databases and 
                            APIs, I thrive on solving complex problems with clean, efficient code. </p>
                        <p>
                            Beyond the code, I’m an innovator at heart — always curious about the latest 
                            technologies and how they can make products faster, smarter, and more impactful. 
                            My journey spans industry-leading projects, academic research, and real-world 
                            challenges that shaped me into a developer who values quality, collaboration, 
                            and continuous learning.</p>
                    </div>
                    <div className="about-skills">
                        <div className="about-skill"><p>HTML & CSS</p><hr style={{ width: "60%" }} /></div>
                        <div className="about-skill"><p>React JS</p><hr style={{ width: "50%" }} /></div>
                        <div className="about-skill"><p>Java Script</p><hr style={{ width: "60%" }} /></div>
                        <div className="about-skill"><p>Python</p><hr style={{ width: "60%" }} /></div>
                        <div className="about-skill"><p>SQL</p><hr style={{ width: "70%" }} /></div>
                    </div>
                </div>
            </div>
            <div className="about-achievements">
                <div className="about-achievement">
                    <h1>4+</h1>
                    <p>Years of Experience</p>
                </div>
                <hr />
                <div className="about-achievement">
                    <h1>5+</h1>
                    <p>Projects</p>
                </div>
                <hr />
                <div className="about-achievement">
                    <h1>20+</h1>
                    <p>Skills</p>
                </div>
            </div>
        </div>
    )
}
export default About

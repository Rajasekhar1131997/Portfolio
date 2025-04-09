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
                        <p>Innovative and detail-oriented Full Stack Developer with 4+ years of experience in designing, developing, and deploying end-to-end
                            web applications. Proficient in both front-end and back-end technologies. Skilled in building scalable, secure, and user-centric
                            applications while ensuring seamless integration between client-side and server-side components. Experienced in the full software
                            development life cycle (SDLC), from concept to deployment, with a strong focus on delivering high-quality solutions on time.
                            Passionate about leveraging cutting-edge technologies to solve complex problems and enhance user experiences. Strong academic
                            foundation in Computer Science, complemented by hands-on experience in industry-leading projects.</p>
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

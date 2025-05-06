import React from "react";
import "./Experience.css";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import theme_pattern from "../../assets/theme_pattern.svg";
import AOS from "aos";
import "aos/dist/aos.css";

const experienceData = [
    {
        title: "Full Stack Software Developer",
        company: "Skeyee Dynamics",
        location: "Hyderabad, Telangana, India",
        date: "Sep. 2022 – Dec. 2024",
        icon: <FaBriefcase />,
    },
    {
        title: "Software Engineer Intern",
        company: "UL Solutions",
        location: "Fremont, CA",
        date: "May 2024 – Aug 2024 | June 2023 – July 2023",
        icon: <FaBriefcase />,
    },
    {
        title: "Master of Science in Computer Science",
        company: "California State University, Sacramento",
        location: "Sacramento, CA",
        date: "May 2022 - Dec. 2024",
        icon: <FaGraduationCap />,
    },
    {
        title: "I.T Analyst Intern",
        company: "Tata Consultancy Services Pvt. Ltd. (TCS)",
        location: "Kolkata, West Bengal, India",
        date: "Jan. 2019 – May 2022",
        icon: <FaBriefcase />,
    },
    {
        title: "Bachelor of Engineering in Computer Science",
        company: "K L University",
        location: "Vijayawada, Andhra Pradesh, India",
        date: "Aug. 2014 - May 2018",
        icon: <FaGraduationCap />,
    },
];

const Experience = () => {
    return (
        <div className="experience-section" id="experience">
            <div className="experience-title">
                <h1>My Experience</h1>
                <img src={theme_pattern} alt="" />
            </div>
            <p>My professional journey and educational background that have shaped my career.</p>
            <div className="timeline">
                {experienceData.map((item, index) => (
                    <div className="timeline-item" key={index}>
                        <div className="timeline-icon">{item.icon}</div>
                        <div className="timeline-content">
                            <h3>{item.title}</h3>
                            <h4>{item.company}</h4>
                            <span className="location">{item.location}</span>
                            {item.date && <p className="date">{item.date}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;

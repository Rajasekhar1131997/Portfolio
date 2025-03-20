import React from 'react'
import './Certifications.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import Certifications_Data from '../../assets/certifications_data'
import download_icon from '../../assets/download_icon.png'

const Certifications = () => {
    return (
        <div id='certifications' className='certifications'>
            <div className="certifications-title">
                <h1>My Certifications</h1>
                <img src={theme_pattern} alt="" />
            </div>
            <div className="certifications-container">
                {Certifications_Data.map((certification, index) => {
                    return (
                        <div className="certifications-format" key={index}>
                            <h4>{certification.c_no}</h4>
                            <h3>{certification.c_name}</h3>
                            <p>{certification.c_desc}</p>
                            <div className="certifications-download">
                                <a href={certification.c_link} target="_blank" download>
                                    <p>Download Certificate</p>
                                    <img src={download_icon} alt="" />
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Certifications

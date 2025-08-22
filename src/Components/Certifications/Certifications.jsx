import React, { useState } from 'react';
import './Certifications.css';
import theme_pattern from '../../assets/theme_pattern.svg';
import Certifications_Data from '../../assets/certifications_data';
import download_icon from '../../assets/download_icon.png';

function CertificationCard({ certification, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="certifications-format" key={index}>
      <h4>{certification.c_no}</h4>
      <h3>{certification.c_name}</h3>

      <p className={`certifications-desc ${expanded ? 'expanded' : 'clamped'}`}>
        {certification.c_desc}
      </p>

      <div className="certifications-actions">
        <button
          type="button"
          className="readmore-btn"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>

        <div className="certifications-download">
          <a href={certification.c_link} target="_blank" rel="noreferrer" download>
            <p>Download Certificate</p>
            <img src={download_icon} alt="Download" />
          </a>
        </div>
      </div>
    </div>
  );
}

const Certifications = () => {
  return (
    <div id="certifications" className="certifications">
      <div className="certifications-title">
        <h1>My Certifications</h1>
        <img src={theme_pattern} alt="" />
      </div>

      <div className="certifications-container">
        {Certifications_Data.map((certification, index) => (
          <CertificationCard
            certification={certification}
            index={index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Certifications;
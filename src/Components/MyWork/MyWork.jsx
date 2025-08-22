import React, { useState } from 'react';
import './MyWork.css';
import theme_pattern from '../../assets/theme_pattern.svg';
import mywork_data from '../../assets/mywork_data';
import github_icon from '../../assets/github_icon.png';

function WorkCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mywork-format" key={index}>
      <h4>{item.w_no}</h4>
      <h3>{item.w_name}</h3>

      <p className={`mywork-desc ${expanded ? 'expanded' : 'clamped'}`}>
        {item.w_desc}
      </p>

      <div className="mywork-actions">
        <button
          type="button"
          className="readmore-btn"
          aria-expanded={expanded}
          onClick={() => setExpanded(v => !v)}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>

        <div className="mywork-download">
          <a href={item.w_link} target="_blank" rel="noopener noreferrer">
            <img src={github_icon} alt="GitHub" />
          </a>
        </div>
      </div>
    </div>
  );
}

const MyWork = () => {
  return (
    <div id="mywork" className="mywork">
      <div className="mywork-title">
        <h1>My Latest Work</h1>
        <img src={theme_pattern} alt="" />
      </div>

      <div className="mywork-container">
        {mywork_data.map((item, index) => (
          <WorkCard item={item} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MyWork;
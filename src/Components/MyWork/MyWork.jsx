import React from 'react'
import './MyWork.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import mywork_data from '../../assets/mywork_data'
import github_icon from '../../assets/github_icon.png'

const MyWork = () => {
  return (
    <div id='mywork' className='mywork'>
      <div className="mywork-title">
        <h1>My Latest Work</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="mywork-container">
        {mywork_data.map((mywork, index) => {
          return (
            <div className="mywork-format" key={index}>
              <h4>{mywork.w_no}</h4>
              <h3>{mywork.w_name}</h3>
              <p>{mywork.w_desc}</p>
              <div className="mywork-download">
                <a href={mywork.w_link} target="_blank" rel="noopener noreferrer">
                  <img src={github_icon} alt="GitHub" />
                </a>
              </div>
            </div>
          )
        })}
      </div>
      {/*<div className="mywork-showmore">
        <p>Show More</p>
        <img src={arrow_icon} alt="" />
      </div>*/}
    </div>
  )
}

export default MyWork

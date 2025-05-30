import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import About from './Components/About/About'
import Certifications from './Components/Certifications/Certifications'
import MyWork from './Components/MyWork/MyWork'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import Experience from './Components/Experience/Experience'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Certifications/>
      <MyWork/>
      <Experience/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App

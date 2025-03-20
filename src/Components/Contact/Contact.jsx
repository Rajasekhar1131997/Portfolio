import React from 'react'
import './Contact.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import mail_icon from '../../assets/mail_icon.svg'
import call_icon from '../../assets/call_icon.svg'
import location_icon from '../../assets/location_icon.svg'
import github_icon from '../../assets/github.svg'
import linkedin_icon from '../../assets/linkedin.svg'

const Contact = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        if (!name || !email || !message) {
            alert("Please fill all the fields");
            return;
        }
        setResult("Sending....");
        formData.append("access_key", "0a538950-a2a6-4e92-b665-dcccda8f7bbc");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div id='contact' className='contact'>
            <div className="contact-title">
                <h1>Get in Touch</h1>
                <img src={theme_pattern} alt="" />
            </div>
            <div className="contact-sections">
                <div className="contact-left">
                    <h1>Let's Talk</h1>
                    <p>I'm currently looking for new opportunities, and my inbox is always open. Whether you have a question, opportunity, or just want to say hi, I'll get back to you!</p>
                    <div className="contact-details">
                        <div className="contact-detail">
                            <a href="mailto:rajakolagotla@gmail.com" target="_blank" rel="noopener noreferrer">
                                <img src={mail_icon} alt="Email" /> <p>rajakolagotla@gmail.com</p>
                            </a>
                        </div>
                        <div className="contact-detail">
                            <a href="tel:+19162395267" target="_blank" rel="noopener noreferrer">
                                <img src={call_icon} alt="Phone" /><p>+1 (916)-239-5267</p>
                            </a>
                        </div>
                        <div className="contact-detail">
                            <a href="https://maps.app.goo.gl/KvDHkTxP1ioqNfAe7" target="_blank" rel="noopener noreferrer">
                                <img src={location_icon} alt="Location" /><p>Newark, California, USA</p>
                            </a>
                        </div>
                        <div className="contact-detail">
                            <a href="https://github.com/Rajasekhar1131997" target="_blank" rel="noopener noreferrer">
                                <img src={github_icon} alt="GitHub" className='github-icon' /><p>/Rajasekhar1131997</p>
                            </a>
                        </div>
                        <div className="contact-detail">
                            <a href="https://www.linkedin.com/in/rajasekharreddyk" target="_blank" rel="noopener noreferrer">
                                <img src={linkedin_icon} alt="LinkedIn" /><p>/rajasekharreddyk</p>
                            </a>
                        </div>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="contact-right">
                    <label htmlFor="">Your Name</label>
                    <input type="text" placeholder='Enter your name' name='name' />
                    <label htmlFor="">Your Email</label>
                    <input type="email" placeholder='Enter your email' name='email' />
                    <label htmlFor="">Write your Message here</label>
                    <textarea placeholder='Enter your message' name='message' rows="8"></textarea>
                    <button className="contact-submit" type='submit'>Submit Now</button>
                </form>
            </div>
        </div>
    )
}

export default Contact

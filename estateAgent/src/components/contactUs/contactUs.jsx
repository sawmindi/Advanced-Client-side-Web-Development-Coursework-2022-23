// src/components/contactUs/ContactUs.jsx
import React from 'react';
import ContactForm from './ContactForm';
import './ContactUs.css'; 

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h2 className="text-center">Contact Us</h2>
      <ContactForm />
    </div>
  );
};

export default ContactUs;

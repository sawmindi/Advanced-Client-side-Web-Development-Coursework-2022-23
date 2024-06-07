import React from 'react';
import NavBar from './components/Navbar/NavBar';
import HomePage from './components/home_page/HomePage';
import Properties from './components/properties_page/Properties';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Aboutus from './components/aboutus_page/Aboutus';
import Property from './components/properties_page/Property';
import { FavoriteProvider } from './components/properties_page/FavoriteContext';
import Footer from './components/Navbar/Footer'; 
import ContactUs from './components/contactUs/contactUs'

function App() {
  return (
    <BrowserRouter>
      <FavoriteProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/properties/:id" element={<Property />} />
        </Routes>
        <Footer />
      </FavoriteProvider>
    </BrowserRouter>
  );
}

export default App;

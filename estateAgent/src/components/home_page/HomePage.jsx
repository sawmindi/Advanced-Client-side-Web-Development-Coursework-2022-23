// HomePage.jsx
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/src/components/CarouselImage/3.jpg"
            alt="First slide"
            style={{ maxHeight: '600px' }}
          />
          <Carousel.Caption>
            <h2>Discover Your Dream Home</h2>
            <p>Explore a curated selection of luxurious homes and find the perfect residence for your lifestyle at Future Estates.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/src/components/CarouselImage/a1.jpg"
            alt="Second slide"
            style={{ maxHeight: '600px' }}
          />
          <Carousel.Caption>
            <h2>Modern Living Spaces</h2>
            <p>Experience modern living with our carefully designed contemporary houses. Future Estates offers the best in modern architecture.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/src/components/CarouselImage/aaa.jpg"
            alt="Third slide"
            style={{ maxHeight: '600px' }}
          />
          <Carousel.Caption>
            <h2>Luxury Villas Awaits You</h2>
            <p>Indulge in opulence with our collection of luxurious villas. Future Estates presents the epitome of elegance and comfort.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container fluid>
        <Row className="justify-content-center mt-5 mb-5">
          <div className="col-md-8">
            <h2 className="text-center">Our Services</h2>
            <p className="text-center">
              Find premium apartments and houses in prime locations at Future Estates. We are your trusted destination for all your real estate needs. At Future Estates, we don't just sell properties; we assist in finding your dream home. Explore our website to discover the perfect property to call home.
            </p>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;

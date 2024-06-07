import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import data from "./properties.json";
import "./Property.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState(null); // Initialize as null

  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    // From json file
    setProperties(data.properties);
    setProperty(data.properties.find((prop) => prop.id === state.id));
    console.log("Property:", property);
  }, [state.id]);

  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const CustomPrevArrow = (props) => (
    <button {...props}>
      <svg
        className="svg-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M17.815 19.157l-11.927-7.157 11.927-7.157-2.982 7.157 2.982 7.157zm4.185 4.843l-5-12 5-12-20 12 20 12z" />
      </svg>
    </button>
  );

  const CustomNextArrow = (props) => (
    <button {...props}>
      <svg
        className="svg-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M6.185 4.843l11.927 7.157-11.927 7.157 2.982-7.157-2.982-7.157zm-4.185-4.843l5 12-5 12 20-12-20-12z" />
      </svg>
    </button>
  );
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ marginTop: "50px", padding: "25px" }}>
      <Slider {...slickSettings} className="slick-slider-custom">
        {property &&
          property.pictures.map((pic, index) => (
            <div key={index}>
              <img
                className="d-block w-100 img-fluid"
                src={pic}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
      </Slider>

      <div
        style={
          windowSize.current[0] > 1000
            ? { maxWidth: "50%", margin: "auto", marginTop: "50px" }
            : { margin: "auto" }
        }
      >
        <h1>{property ? property.location : ""}</h1>
        {/* {property && `${property.added.month} ${property.added.day}, ${property.added.year}`} */}
      </div>

      <Tabs
        defaultActiveKey="desc"
        transition={false}
        className="mb-3"
        style={
          windowSize.current[0] > 1000
            ? {
                maxWidth: "50%",
                margin: "auto",
                marginTop: "20px",
                backgroundColor: "white",
                borderRadius: "8px",
              }
            : {
                margin: "auto",
                marginTop: "20px",
                backgroundColor: "#20247b",
                borderRadius: "10px",
              }
        }
      >
        <Tab
          eventKey="desc"
          title="Description"
          style={
            windowSize.current[0] > 1000
              ? {
                  maxWidth: "50%",
                  margin: "auto",
                  marginTop: "20px",
                  backgroundColor: "#ffffff!important",
                  border: "1px solid #000",
                  borderRadius: "10px",
                  padding: "20px",
                  color: "#000",
                }
              : {
                  margin: "auto",
                  backgroundColor: "#ffffff",
                  border: "1px solid #000",
                  borderRadius: "10px",
                  padding: "20px",
                  color: "#000",
                }
          }
        >
          <div>
            {property && (
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Type: {property.type}</li>
                <li className="list-group-item">
                  Bedrooms: {property.bedrooms}
                </li>
                <li className="list-group-item">Tenure: {property.tenure}</li>
                <li className="list-group-item">Price: ${property.price}</li>
                <li className="list-group-item">
                  Date Added:{" "}
                  {property.added
                    ? `${property.added.month} ${property.added.day}, ${property.added.year}`
                    : "N/A"}
                </li>
                <li className="list-group-item">
                  Postal Code: {property.postalCode || "N/A"}
                </li>
              </ul>
            )}
          </div>
          <div style={{ padding: "20px" }}>
            {property ? property.description : ""}
          </div>
          <Link to="/contactus">
            <Button variant="primary ms-3">Contact Us</Button>
          </Link>
        </Tab>
        <Tab
          eventKey="fp"
          title="Floor plan"
          style={
            windowSize.current[0] > 1000
              ? {
                  maxWidth: "50%",
                  margin: "auto",
                  marginTop: "20px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #000",
                  borderRadius: "10px",
                  padding: "20px",
                  color: "#000",
                }
              : {
                  margin: "auto",
                  backgroundColor: "#ffffff",
                  border: "1px solid #000",
                  borderRadius: "10px",
                  padding: "20px",
                  color: "#000",
                }
          }
        >
          Floor plan
          <div>
            <img
              src="/src/assets/floor_plan.png"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </Tab>
        <Tab
          eventKey="map"
          title="Map"
          style={
            windowSize.current[0] > 1000
              ? {
                  maxWidth: "50%",
                  margin: "auto",
                  marginTop: "20px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #000",
                  borderRadius: "10px",
                  padding: "20px",
                  color: "#000",
                }
              : {
                  margin: "auto",
                  backgroundColor: "#ffffff",
                  border: "1px solid #000",
                  borderRadius: "10px",
                  padding: "20px",
                  color: "#000",
                }
          }
        >
          Map
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={property ? property.map : ""}
              title="Property Map"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Property;

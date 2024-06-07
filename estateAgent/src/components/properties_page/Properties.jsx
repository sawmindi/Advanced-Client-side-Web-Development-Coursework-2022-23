import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "./FavoriteContext";
import data from "./properties.json";
import "./Properties.css";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minRooms, setMinRooms] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [searchDate, setSearchDate] = useState(null);
  const [searchPostalCode, setSearchPostalCode] = useState("");
  const { dispatch, state } = useFavorite();

  useEffect(() => {
    // From json file
    setProperties(data.properties);
  }, []);

  const monthToIndex = (month) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.indexOf(month);
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearchTerm = property.location
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMinRooms = property.bedrooms >= minRooms;
    const matchesPrice =
      property.price >= minPrice && property.price <= maxPrice;
    const matchesPostalCode = searchPostalCode
      ? property.postalCode
          .toLowerCase()
          .includes(searchPostalCode.toLowerCase())
      : true;
    const matchesDate =
      !searchDate ||
      (property.added &&
        new Date(
          property.added.year,
          monthToIndex(property.added.month),
          property.added.day
        ).getTime() === searchDate.getTime());

    return (
      matchesSearchTerm &&
      matchesMinRooms &&
      matchesPrice &&
      matchesPostalCode &&
      matchesDate
    );
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  function showAll() {
    setProperties(data.properties);
  }

  function showFavorites() {
    setProperties(state.favorites);
  }

  const handleMinRoomsChange = (e) => {
    setMinRooms(parseInt(e.target.value, 10));
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(parseInt(e.target.value, 10));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value, 10));
  };

  function sortByPrice() {
    const sortedProperties = [...properties].sort((a, b) => a.price - b.price);
    setProperties(sortedProperties);
  }

  function sortByRooms() {
    const sortedProperties = [...properties].sort(
      (a, b) => a.bedrooms - b.bedrooms
    );
    setProperties(sortedProperties);
  }

  let navigate = useNavigate();
  const handleClick = (e) => {
    navigate("/Properties/" + e, { state: { id: e, name: "just name" } });
  };

  const handleFavorites = (item) => {
    const isItemInFavorites = state.favorites.some((i) => i.id === item.id);
    !isItemInFavorites ? addToFavorites(item) : removeFromFavorites(item);
  };

  const addToFavorites = (item) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: item });
    console.log("added to favorites: " + item.id);
  };

  const removeFromFavorites = (item) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: item });
    console.log("removed from favorites: " + item.id);
  };

  const handleSearchPostalCodeChange = (e) => {
    setSearchPostalCode(e.target.value);
  };

  return (
    <div>
      <div className="container"></div>

      <div style={{ marginTop: 10 }}>
        <Container fluid>
          <Row className="justify-content-center">
            <div className="col-md-6 col-sm-12">
              <form>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by location"
                  />
                </div>
              </form>
            </div>
          </Row>
          <Row className="justify-content-center mt-3">
            <div className="col-md-8 col-sm-12">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <span className="me-2">Price:</span>
                  <span className="me-2">Min</span>
                  <input
                    type="number"
                    id="minPrice"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="form-control me-2"
                  />
                  <span className="me-2">Max</span>
                  <input
                    type="number"
                    id="maxPrice"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="form-control me-2"
                  />
                </div>
                <div className="d-flex align-items-center mt-2 mt-md-0">
                  <span className="me-2">Min Rooms:</span>
                  <input
                    type="number"
                    id="rooms"
                    value={minRooms}
                    onChange={handleMinRoomsChange}
                    className="form-control me-2"
                  />
                </div>
                <div className="d-flex align-items-center mt-2 mt-md-0">
                  <DatePicker
                    selected={searchDate}
                    onChange={(date) => setSearchDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Search by date"
                    className="form-control me-2"
                  />
                  <input
                    className="form-control"
                    type="text"
                    id="searchPostalCode"
                    value={searchPostalCode}
                    onChange={handleSearchPostalCodeChange}
                    placeholder="Search by postal code"
                  />
                </div>
                <div className="d-flex align-items-center mt-2 mt-md-0">
                  <Button onClick={sortByPrice} className="btn btn me-2">
                    Sort by Price
                  </Button>
                  <Button onClick={sortByRooms} className="btn btn me-2">
                    Sort by Rooms
                  </Button>
                  <Button
                    onClick={showFavorites}
                    variant="danger text-white"
                    className="me-2"
                  >
                    View Favorites
                  </Button>
                  <Button onClick={showAll} variant="danger text-white">
                    Show All
                  </Button>
                </div>
              </div>
            </div>
          </Row>

          <Row className="justify-content-center mt-2">
            {filteredProperties.map((property) => (
              <Card
                key={property.id}
                className="card col-md-3 col-sm-5 m-5 p-0"
                style={{ color: "blue", backgroundColor: "#44aeff" }}
              >
                <Card.Img
                  variant="top"
                  src={property.pictures[0]}
                  alt="Card image"
                  style={{ height: "200px" }}
                />
                <Card.Title className="text-black p-2">
                  {property.location}
                </Card.Title>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Type: {property.type}</li>
                  <li className="list-group-item">
                    Bedrooms: {property.bedrooms}
                  </li>
                  <li className="list-group-item">Tenure: {property.tenure}</li>
                  <li className="list-group-item">Price: ${property.price}</li>
                  <li className="list-group-item">
                    Date Added: {property.added.month} {property.added.day},{" "}
                    {property.added.year}
                  </li>
                  <li className="list-group-item">
                    Postal Code: {property.postalCode}
                  </li>
                </ul>
                <Card.Text className="p-2">
                  {property.description.substring(0, 200) + "..."}
                </Card.Text>
                <div className="d-flex justify-content-center align-items-center p-2">
                  <Button
                    onClick={() => {
                      handleClick(property.id);
                    }}
                    className="btn btn-danger me-1"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => {
                      handleFavorites(property);
                    }}
                    className="btn btn-danger"
                  >
                    {state.favorites.some((i) => i.id === property.id)
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </Button>
                </div>
              </Card>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Properties;

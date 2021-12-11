import React, { useState, useEffect } from "react";

import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import NavBar from "../components/NavBar";
import first from "../assets/1.jpeg";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <div>
      <NavBar />
      <br />
      <div className="container">
        <Search />
        <hr style={{ backgroundColor: "white" }} />
        <h2 className="centralHeading">New Arrivals</h2>
        <hr style={{ backgroundColor: "white" }} />
        <div className="row">
          {productsByArrival.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>

        <hr style={{ backgroundColor: "white" }} />
        <h2 className="centralHeading">Trending</h2>
        <hr />
        <div className="row">
          {productsBySell.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
      {/* </Layout> */}
      <Footer />
    </div>
  );
};

export default Home;

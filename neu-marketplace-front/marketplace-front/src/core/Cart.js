import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h4 style={{ textAlign: "center" }}>
          Your cart has {`${items.length}`} items
        </h4>
        <hr />
        <div style={{ display: "flex", flexDirection: "row" }}>
          {items.map((product, i) => (
            <div key={i} className="col-6 mb-4">
              <Card
                key={i}
                product={product}
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
                setRun={setRun}
                run={run}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <div>
      <NavBar />
      {/* <Layout
        title="Shopping Cart"
        description="Following items have been added to your cart.."
        className="container-fluid"
      > */}
      <br />
      <hr style={{ backgroundColor: "white" }} />
      <h2 style={{ textAlign: "center" }}> MY CART </h2>
      <hr style={{ backgroundColor: "white" }} />
      <br />
      <h4 style={{ textAlign: "center" }}> CART SUMMARY </h4>
      <div>
        <div className="col-6" style={{ margin: "0 auto" }}>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
      {/* </Layout> */}
      <Footer />
    </div>
  );
};

export default Cart;

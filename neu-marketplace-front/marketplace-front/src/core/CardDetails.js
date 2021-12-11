import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import ShowImageDetails from "./ShowImageDetails";
import Button from "@mui/material/Button";

const CardDetails = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn3 btn btn-outline-primary mt-2 mb-2 card-btn-1">
            View Product
          </button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
    shouldRedirect(true);
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      window.location.href = "/cart";
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button
          variant="contained"
          style={{ backgroundColor: "green", marginLeft: "40%" }}
          onClick={addToCart}
        >
          {" "}
          Add to cart{" "}
        </Button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span></span>
    ) : (
      <span className="badge badge-primary badge-pill">Sold out</span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  return (
    <div className="card2 card">
      <Card style={{ height: "800px" }}>
        {/* <CardMedia
        component="img"
        height="140"
        image=""
        alt="product.name"
      > */}
        <div>
          <ShowImageDetails
            style={{ height: "100%" }}
            item={product}
            url="product"
          />
        </div>
        <CardContent>
          <Typography variant="p" color="text.secondary" textAlign="right">
            Added {moment(product.createdAt).fromNow()}
          </Typography>
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Typography gutterBottom variant="h6" color="text.secondary">
              Price : ${product.price}
            </Typography>
            <Typography gutterBottom variant="6" color="text.secondary">
              Category: {product.category && product.category.name}
            </Typography>
          </div>
          <Typography
            gutterBottom
            variant="p"
            color="text.secondary"
            textAlign="center"
          >
            " {product.description} "
          </Typography>

          <Badge>{showStock(product.quantity)}</Badge>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
          {showViewButton(showViewProductButton)}

          {showAddToCartBtn(showAddToCartButton)}

          {showRemoveButton(showRemoveProductButton)}

          {showCartUpdateOptions(cartUpdate)}
        </CardActions>
      </Card>
      {/* <div className="card-header card-header-1 ">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        
        <p className="card-p mt-2">{product.description.substring(0, 100)} </p>
        <p className="card-p1 black-10">$ {product.price}</p>
        <p className="black-9">Category: {product.category && product.category.name}</p>
        <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br />

        {showViewButton(showViewProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div> */}
    </div>
  );
};

export default CardDetails;

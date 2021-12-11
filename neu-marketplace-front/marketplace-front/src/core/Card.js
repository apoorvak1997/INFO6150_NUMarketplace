import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import "./Card.css";
import Button from "@mui/material/Button";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

const Cards = ({
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

  const showProductDetails = () => {
    window.location.href = "/product/" + product._id;
  };

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <button
          onClick={showProductDetails}
          className="btn3 btn btn-outline-primary mt-2 mb-2 card-btn-1"
        >
          View Product
        </button>
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
          style={{ backgroundColor: "green" }}
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
      <span className="badge badge-primary badge-pill">Available</span>
    ) : (
      <span
        className="badge badge-primary badge-pill"
        style={{ backgroundColor: "red" }}
      >
        Sold out
      </span>
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
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "10ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            placeholder={count}
            onChange={handleChange(product._id)}
            label="Quantity"
            focused
          />
        </Box>
        // <FormControl
        //   style={{ float: "right" }}
        //   sx={{ m: 1 }}
        //   variant="standard"
        // >
        //   <InputLabel id="demo-simple-select-label">Qty</InputLabel>
        //   <TextField value={count} onChange={handleChange(product._id)} />
        //   {/* <Select
        //     labelId="demo-simple-select-label"
        //     id="demo-simple-select"
        //     value={count}
        //     label="Quantity"
        //     onChange={handleChange(product._id)}
        //   >
        //     <MenuItem value={1}>1</MenuItem>
        //     <MenuItem value={2}>2</MenuItem>
        //     <MenuItem value={3}>3</MenuItem>
        //   </Select> */}
        // </FormControl>
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
    <div>
      <Card className="productCard" style={{ height: "450px" }}>
        {/* <CardMedia
        component="img"
        height="140"
        image=""
        alt="product.name"
      > */}

        <ShowImage item={product} url="product" />

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            ${product.price}
            <Badge>{showStock(product.quantity)}</Badge>
          </Typography>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {showViewButton(showViewProductButton)}

            {showAddToCartBtn(showAddToCartButton)}
            {showRemoveButton(showRemoveProductButton)}
            {showCartUpdateOptions(cartUpdate)}
          </div>
          <br />
        </CardContent>
        <CardActions>
          {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}

          <br />
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

export default Cards;

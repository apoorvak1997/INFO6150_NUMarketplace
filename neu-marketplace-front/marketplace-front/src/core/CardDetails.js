import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import ShowImageDetails from './ShowImageDetails';

const CardDetails = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn3 btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn1 btn btn-outline-warning mt-2 mb-2 card-btn-1">
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span></span>
    ) : (
      <span className="badge badge-primary badge-pill">Sold out</span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
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
       <Card style={{height:"800px"}}>
      {/* <CardMedia
        component="img"
        height="140"
        image=""
        alt="product.name"
      > */}
      <div>
        <ShowImageDetails style={{height:"100%"}}item={product} url="product" />
        </div>
       
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Category: {product.category && product.category.name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
        Added on {moment(product.createdAt).fromNow()}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
        {product.description}
        </Typography>
        


        <Badge>
        {showStock(product.quantity)}
        </Badge>
        {showViewButton(showViewProductButton)}

{showAddToCartBtn(showAddToCartButton)}

{showRemoveButton(showRemoveProductButton)}

{showCartUpdateOptions(cartUpdate)}

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

export default CardDetails;
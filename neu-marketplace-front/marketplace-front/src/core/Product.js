import React, { useState, useEffect } from 'react';
import { read, listRelated } from './apiCore';
import Cards from './Card';
import CardDetails from './CardDetails';
import NavBar from '../components/NavBar';

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <div>
        <NavBar/>
        <div className="container" style={{padding:"3%"}}>
        <hr />
        <h3 style={{textAlign:"center"}}> {product.name} </h3>
        <hr style={{backgroundColor:"white"}}/>
        </div>
        <div style={{width:"50%", margin:"0 auto"}}>
        
                    {product && product.description && <CardDetails style={{height:"100%"}} product={product} showViewProductButton={false} />}
                
        </div>
        <br/>
        <hr style={{backgroundColor:"white"}}/>
        <h3 style={{textAlign:"center"}}>Related products</h3>
        <hr style={{backgroundColor:"white"}}/>
        <div style={{display:"flex", flexDirection:"row"}}>
        {relatedProduct.map((p, i) => (
            <div key={i} className="col-4 mb-3">
                    <Cards product={p} />
                    </div>
                
                        
            ))}
            </div>
        
            </div>
       
    );
};

export default Product;

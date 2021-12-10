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
        <hr style={{backgroundColor:"white"}}/>
        <h3 style={{textAlign:"center"}}> {product.name} </h3>
        <hr/>
        </div>
            <div className="row">
                <div className="col-8">
                    {product && product.description && <CardDetails style={{height:"100%"}} product={product} showViewProductButton={false} />}
                </div>

                <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Cards product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;

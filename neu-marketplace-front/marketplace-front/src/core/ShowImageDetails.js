import React from "react";
import { API } from "../config";

const ShowImageDetails = ({ item, url }) => (
    <div className="product-img productDetailsCard">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ height:"500px", width: "100%" }}
        />
    </div>
);

export default ShowImageDetails;
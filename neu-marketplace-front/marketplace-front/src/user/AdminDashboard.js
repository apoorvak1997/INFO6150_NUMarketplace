import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, nuid, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group ">
          <li className="ls list-group-item ">
            <Link className="nav-link black-color " to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="ls list-group-item">
            <Link className="nav-link black-color" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="ls list-group-item">
            <Link className="nav-link black-color" to="/admin/orders">
              View Orders
            </Link>
          </li>
          <li className="ls list-group-item">
            <Link className="nav-link black-color" to="/admin/products">
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item black-color ">{name}</li>
          <li className="list-group-item black-color ">{email}</li>
          <li className="list-group-item black-color">
            {role === 1 ? "Seller" : "Buyer"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <br />
      <hr style={{ backgroundColor: "white" }} />
      <h2 className="heading" style={{ textAlign: "center" }}>
        {" "}
        SELLER DASHBOARD{" "}
      </h2>
      <hr style={{ backgroundColor: "white" }} />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-3">{adminLinks()}</div>
          <div className="col-9">{adminInfo()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

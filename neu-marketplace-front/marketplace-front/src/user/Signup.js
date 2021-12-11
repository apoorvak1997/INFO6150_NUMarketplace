import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";
import Footer from "../components/Footer";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    //nuid: '',
    role: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, role, email, password, success, error } = values;
  var roleValue = null;
  console.log(values);
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, role, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          // nuid: '',
          role: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });

    

      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Role</label>
        <br></br>
        <select
          className="dropdown"
          onChange={handleChange("role")}
          value={roleValue}

        >
          <option value={0}>Buyer</option>
          <option value={1}>Seller</option>
        </select>
        {/* <input onChange={handleChange('role')} type="text" className="form-control" value={roleValue} /> */}
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <div>
      <Layout
        title="Sign Up"
        description="Signup to NEU Marketplace"
        className="container col-md-8 offset-md-2"
      >
        {showSuccess()}
        {showError()}
        {signUpForm()}
      </Layout>
      <Footer />
    </div>
  );
};

export default Signup;

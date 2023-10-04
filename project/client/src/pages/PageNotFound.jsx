import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import "./Pages_Css/PageNotFound.css";
function PageNotFound() {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="btn btn-secondary btn-lg pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
}

export default PageNotFound;

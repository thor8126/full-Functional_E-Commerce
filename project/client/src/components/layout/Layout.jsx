import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Layout({ children, title, description, keywords, author }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <ToastContainer />
        {children}</main>
      <Footer />
    </>
  );
}
Layout.defaultProps = {
  title: "E-Commerce Website",
  description: "mern stack Project, Full stack Project",
  keywords: "mern, react, node.js, node, mongodb, express",
  author: "Sahil Garg",
};

export default Layout;

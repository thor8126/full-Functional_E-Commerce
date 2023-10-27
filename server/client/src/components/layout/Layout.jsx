import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

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
      <main>
        {children}
        <Toaster />
      </main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "E-Commerce Website",
  description: "MERN stack Project, Full stack Project",
  keywords: "MERN, React, Node.js, Node, MongoDB, Express",
  author: "Sahil Garg",
};

export default Layout;

import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";

function HomePage() {
  const { auth, setAuth } = useAuth();
  return (
    <Layout title={"Get All Products"}>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
      <h1>HomePage</h1>
    </Layout>
  );
}

export default HomePage;

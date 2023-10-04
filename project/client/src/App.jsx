import { useState } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Layout>
        <h1>hii</h1>
      </Layout>
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { all } from "axios";
import toast from "react-hot-toast";
import "./AuthStyles/authstyle.css";
import { useLocalCart } from "../../context/Cart";
import { useAuth } from "../../context/Auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, setCart } = useLocalCart();
  const [allProducts, setAllProducts] = useState([]);
  // Fetch products data and update the state
  console.log(useLocalCart());
  const fetchProducts = async () => {
    try {
      
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-products`
      );
      if (data?.success) {
        setAllProducts(data?.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // handle the cart items
  // i am fetching cart items after the login
  const getCartFromDataBase = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/cart/get-cart`
      );
      const newCart = [];
      if (data?.success && data?.item?.length > 0) {
        // now i will find the cart items from products
        for (const item of data?.item) {
          const product = allProducts.find((pro) => pro._id === item._id);
          if (product) {
            newCart.push({ ...product, quantity: item.quantity });
          }
        }
        setCart([...newCart]);
        localStorage.setItem("cart", JSON.stringify([...newCart]));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        const user = JSON.parse(localStorage.getItem("auth"));
        setTimeout(() => {
          if (user?.user?.role == 0) {
            setCart([]);
            getCartFromDataBase();
          }
        }, 2000);
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container " style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn forgot-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;

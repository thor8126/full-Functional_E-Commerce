import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // deleteitem
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "transparent" }}
      >
        <h1 className="text-center bg-light p-1 mb-1">
          {`Hello ${auth?.token && auth?.user?.name}`}
        </h1>
        <h4 className="text-center">
          {cart?.length > 0
            ? `You have ${cart.length} item in ur cart ${
                auth?.token ? "" : "Please Login to check out"
              }`
            : "Your cart is empty"}
        </h4>
        {cart.length > 0 && (
          <div className="container py-2 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-lg-7">
                        <h5 className="mb-3">
                          <a href="#!" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2" />
                            Continue shopping
                          </a>
                        </h5>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <p className="mb-1">Shopping cart</p>
                            <p className="mb-0">
                              You have 4 items in your cart
                            </p>
                          </div>
                          <div>
                            <p className="mb-0">
                              <span className="text-muted">Sort by:</span>{" "}
                              <a href="#!" className="text-body">
                                price <i className="fas fa-angle-down mt-1" />
                              </a>
                            </p>
                          </div>
                        </div>
                        {cart?.map((p) => (
                          <div className="card mb-3 mb-lg-0">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_API
                                      }/api/v1/product/product-photo/${p._id}`}
                                      className="img-fluid rounded-3"
                                      alt="Shopping item"
                                      style={{ width: 65 }}
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h5>{p.name}</h5>
                                    <p className="small mb-0">
                                      {p.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                  <div style={{ width: 50 }}>
                                    <h5 className="fw-normal mb-0">
                                      {p.quantity}
                                    </h5>
                                  </div>
                                  <div style={{ width: 80 }}>
                                    <h5 className="mb-0">${p.price}</h5>
                                  </div>
                                  <button
                                    style={{
                                      background: "transparent",
                                      border: "none",
                                    }}
                                  >
                                    <DeleteIcon
                                      className="text-danger"
                                      onClick={() => {
                                        removeCartItem(p._id);
                                      }}
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="col-lg-5">
                        <div className="card bg-secondary text-white rounded-3">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <h5 className="mb-0">Card details</h5>
                            </div>
                            <p className="small mb-2">Card type</p>
                            <a href="#!" type="submit" className="text-white">
                              <i className="fab fa-cc-mastercard fa-2x me-2" />
                            </a>
                            <a href="#!" type="submit" className="text-white">
                              <i className="fab fa-cc-visa fa-2x me-2" />
                            </a>
                            <a href="#!" type="submit" className="text-white">
                              <i className="fab fa-cc-amex fa-2x me-2" />
                            </a>
                            <a href="#!" type="submit" className="text-white">
                              <i className="fab fa-cc-paypal fa-2x" />
                            </a>
                            <form className="mt-4">
                              <div className="form-outline form-white mb-4">
                                <input
                                  type="text"
                                  id="typeName"
                                  className="form-control form-control-lg"
                                  siez={17}
                                  placeholder="Cardholder's Name"
                                />
                                <label
                                  className="form-label"
                                  htmlFor="typeName"
                                >
                                  Cardholder's Name
                                </label>
                              </div>
                              <div className="form-outline form-white mb-4">
                                <input
                                  type="text"
                                  id="typeText"
                                  className="form-control form-control-lg"
                                  siez={17}
                                  placeholder="1234 5678 9012 3457"
                                  minLength={19}
                                  maxLength={19}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="typeText"
                                >
                                  Card Number
                                </label>
                              </div>
                              <div className="row mb-4">
                                <div className="col-md-6">
                                  <div className="form-outline form-white">
                                    <input
                                      type="text"
                                      id="typeExp"
                                      className="form-control form-control-lg"
                                      placeholder="MM/YYYY"
                                      size={7}
                                      minLength={7}
                                      maxLength={7}
                                    />
                                    <label
                                      className="form-label"
                                      htmlFor="typeExp"
                                    >
                                      Expiration
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-outline form-white">
                                    <input
                                      type="password"
                                      id="typeText"
                                      className="form-control form-control-lg"
                                      placeholder="●●●"
                                      size={1}
                                      minLength={3}
                                      maxLength={3}
                                    />
                                    <label
                                      className="form-label"
                                      htmlFor="typeText"
                                    >
                                      Cvv
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </form>
                            <hr className="my-4" />
                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Subtotal</p>
                              <p className="mb-2">$4798.00</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Shipping</p>
                              <p className="mb-2">$20.00</p>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                              <p className="mb-2">Total(Incl. taxes)</p>
                              <p className="mb-2">{totalPrice()}</p>
                            </div>
                            <button
                              type="button"
                              className="btn btn-info btn-block btn-lg"
                            >
                              <div className="d-flex justify-content-between">
                                <span>$4818.00</span>
                                <span>
                                  Checkout{" "}
                                  <i className="fas fa-long-arrow-alt-right ms-2" />
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default CartPage;

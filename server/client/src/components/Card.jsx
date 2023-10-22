import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
const Card = ({ p }) => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  let size = p.size;
  if (size) {
    size = size.replace(/"/g, "");
    size = size.split("-");
  } else {
    console.error("Error parsing size:", error);
  }
  return (
    <div className="mb-4 mx-3 " key={p._id}>
      <div className="card mb-2" style={{ width: "18rem" }}>
        <img
          src={`${import.meta.env.VITE_APP_API}/api/v1/product/product-photo/${
            p._id
          }`}
          className="card-img-top rounded-3"
          alt={p.name}
          height={"270px"}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <p className="small">
                {p.brand}
            </p>
          </div>
          <div className="d-flex mb-3 ms-1">
            <h5 className="text-dark mb-0 fs-4">${p.price}</h5>
            <p className="small text-secondary ms-3">
              <s className="fs-5">${p.price + p.price * 0.5}</s>
            </p>
          </div>

          <div>
            {size.length > 0 ? (
              <p>Size: {size.join(", ")}</p>
            ) : (
              <p>No sizes available</p>
            )}
          </div>

          <div className="d-flex flex-row">
            {/* <button
              type="button"
              className="btn btn-primary flex-fill me-1"
              data-mdb-ripple-color="dark"
              // onClick={() => navigate(`/product/${p.slug}`)}
            >
              More Details
            </button> */}
            <Link
              to={`/product/${p.slug}`}
              className="btn btn-primary flex-fill me-1"
              data-mdb-ripple-color="dark"
            >
              More Details
            </Link>

            <button
              type="button"
              className="btn btn-secondary flex-fill ms-1"
              onClick={() => {
                setCart([...cart, p]);
                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                toast.success("item added To Cart");
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu/UserMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/Auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth, setAuth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/orders`
      );
      setOrders(data?.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title="User - All Orders">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.map((order, index) => (
              <div key={index} className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{order?.status}</td>
                      <td>{order?.buyer?.name}</td>
                      <td>{moment(order?.createAt).fromNow()}</td>
                      <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {order?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4 w-25 ">
                        <img
                          src={`${
                            import.meta.env.VITE_APP_API
                          }/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          height={"150px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

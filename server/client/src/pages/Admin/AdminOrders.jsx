import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useAuth } from "../../context/Auth";
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delievrd",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/all-orders`
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

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      if (data?.success) {
        toast.success(data?.message);
        getOrders();
      } else {
        toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"All Order Data"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
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
                    <td>
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(order._id, value)}
                        defaultValue={order?.status}
                      >
                        {status?.map((s, i) => (
                          <Select.Option key={i} value={s}>
                            {s}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>
                    <td>{order?.buyer?.name}</td>
                    <td>{moment(order?.createAt).fromNow()}</td>
                    <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                    <td>{order?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                {order?.products?.map((p, i) => (
                  <div className="row mb-2 p-3 card flex-row" key={i}>
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
    </Layout>
  );
};

export default AdminOrders;

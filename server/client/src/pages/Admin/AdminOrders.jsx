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
    "Delivered",
    "Cancelled",
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
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"All Order Data"}>
      <div className="container mx-auto mt-6">
        <div className="lg:flex">
          <div className="w-full lg:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full lg:w-3/4">
            <h1 className="text-2xl text-center mt-4 mb-8">All Orders</h1>
            {orders.map((order, index) => (
              <div key={index} className="border shadow mb-8 p-4">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                  <div className="lg:col-span-1 text-sm">
                    <strong>Order #:</strong> {index + 1}
                  </div>
                  <div className="lg:col-span-1 text-sm">
                    <strong>Status:</strong>
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
                  </div>
                  <div className="lg:col-span-1 text-sm">
                    <strong>Buyer:</strong> {order?.buyer?.name}
                  </div>
                  <div className="lg:col-span-1 text-sm">
                    <strong>Date:</strong> {moment(order?.createAt).fromNow()}
                  </div>
                  <div className="lg:col-span-1 text-sm">
                    <strong>Payment:</strong>{" "}
                    {order?.payment?.success ? "Success" : "Failed"}
                  </div>
                  <div className="lg:col-span-1 text-sm">
                    <strong>Quantity:</strong> {order?.products?.length}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-4">
                  {order?.products?.map((p, i) => (
                    <div key={i} className="lg:col-span-2 flex items-center">
                      <img
                        src={`${
                          import.meta.env.VITE_APP_API
                        }/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="h-24 w-24 object-cover mr-4"
                      />
                      <div>
                        <p className="text-base font-medium">{p.name}</p>
                        <p className="text-sm text-gray-500">
                          {p.description.substring(0, 30)}
                        </p>
                        <p className="text-base font-medium">
                          Price: {p.price}
                        </p>
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

export default AdminOrders;

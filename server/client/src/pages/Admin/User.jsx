import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu/AdminMenu";

const User = () => {
  return (
    <Layout title={"DashBoard - All Users"}>
      <div className="lg:flex">
        <div className="w-full lg:w-1/4 p-3">
          <AdminMenu />
        </div>
        <div className="w-full lg:w-3/4 p-3">
          <h1 className="text-2xl">Users</h1>
        </div>
      </div>
    </Layout>
  );
};

export default User;

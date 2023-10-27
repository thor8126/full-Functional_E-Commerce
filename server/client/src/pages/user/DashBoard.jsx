import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu/UserMenu";
import { useAuth } from "../../context/Auth";

const DashBoard = () => {
  const { auth, setAuth } = useAuth();
  return (
    <Layout title={"Dashboard E-Commerce"}>
      <div className="container mx-auto p-4">
        <div className="lg:flex">
          <div className="lg:w-1/4 p-3">
            <UserMenu />
          </div>
          <div className="lg:w-3/4 p-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">
                Admin Name: {auth?.user?.name}
              </h3>
              <h3 className="text-xl font-semibold mb-2">
                Admin E-Mail: {auth?.user?.email}
              </h3>
              <h3 className="text-xl font-semibold mb-2">
                Admin Phone: {auth?.user?.phone}
              </h3>
              <h3 className="text-xl font-semibold mb-2">
                Admin Address: {auth?.user?.address}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;

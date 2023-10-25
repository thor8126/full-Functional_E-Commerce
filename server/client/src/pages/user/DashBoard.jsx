import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu/UserMenu";
import { useAuth } from "../../context/Auth";

const DashBoard = () => {
  const { auth, setAuth } = useAuth();
  return (
    <Layout title={"DashBoard E-Commerce"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin Name :{auth?.user?.name}</h3>
              <h3>Admin E-Mail :{auth?.user?.email}</h3>
              <h3>Admin Phone :{auth?.user?.phone}</h3>
              <h3>Admin Address :{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;

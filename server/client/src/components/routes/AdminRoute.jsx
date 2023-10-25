import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useAuth } from "../../context/Auth";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}` + "/api/v1/auth/admin-auth"
      );
      res.data.ok === true ? setOk(true) : setOk(false);
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}

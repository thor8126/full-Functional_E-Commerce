import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [allCategories, setAllCategories] = useState([]);

  // get categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setAllCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return allCategories;
}

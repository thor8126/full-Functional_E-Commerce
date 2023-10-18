import React, { useEffect, useState } from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const { values, setValues } = useSearch();
  const [timeIOutChange, setTimeOutChange] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (keyword) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/search/${keyword}`
      );
      setValues({ ...values, results: data.results });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setValues({ ...values, keyword });
    clearTimeout(timeIOutChange);
    if (keyword.trim() !== "") {
      setTimeOutChange(
        setTimeout(() => {
          handleSearch(keyword);
        }, 1700)
      );
    }
  };

  useEffect(() => {
    return () => {
      if (timeIOutChange) {
        clearTimeout(timeIOutChange);
      }
    };
  }, [timeIOutChange]);

  const clearSearch = () => {
    setValues({ ...values, keyword: "" });
  };
  return (
    <div>
      <form className="d-flex input-group w-auto">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          value={values.keyword}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default SearchInput;

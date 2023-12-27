import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "./search.css";
import SearchItem from "./SearchItem";

const Search = ({ searchType }) => {
  const location = useLocation();
  const [approximateData, setApproximateData] = useState([]);
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("searchTerm");
    axios
      .get("/api/v1/home/search-book", {
        params: {
          searchTerm: searchTerm,
        },
        headers: {
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        console.log(res.data);
        setApproximateData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [searchParams, location.search]);
  console.log(approximateData);
  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="search-container container">
          <div className="row">
            <div className="col-12">
              <p>Kế quả tìm kiếm cho "{searchParams.get("searchTerm")}"</p>
              <p>
                {approximateData && approximateData.length} Sách được tìm thấy
              </p>
            </div>
          </div>
          <div className="row item-list-container">
            {approximateData &&
              approximateData.map((item) => {
                return <SearchItem item={item} />;
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;

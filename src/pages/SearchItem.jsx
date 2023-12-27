import React from "react";
import ProductCardRating from "../components/SliderCard/ProductCardRating";

const SearchItem = ({ item }) => {
  return (
    <div className="col-2 search-item-container" key={item.id}>
      <ProductCardRating canAddToCartCard={true} book={item} />
    </div>
  );
};

export default SearchItem;

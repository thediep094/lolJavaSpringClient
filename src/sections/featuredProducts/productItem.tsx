import React from "react";
import "../../styles/sections/featuredProducts/productItem.scss";
import { IProduct } from "../../types/product";
import { API_IMAGES } from "../../default-value";
type TProp = {
  item: IProduct;
};
const ProductItem = ({ item }: TProp) => {
  return (
    <div className="productItem">
      <div className="productItem__img-wrapper">
        <img
          src={`${API_IMAGES}/images/${item.image}`}
          alt=""
          className="productItem__img"
        />
        {item?.tags && (
          <div className="productItem__tags">
            <div
              className="productItem__tag"
              style={{
                backgroundColor: `#cd3b37`,
                color: `#ffffff`,
              }}
            >
              {item?.tags}
            </div>
          </div>
        )}
      </div>
      <div className="productItem__title">{item.name}</div>
      <div className="productItem__price">${item.price}</div>
    </div>
  );
};

export default ProductItem;

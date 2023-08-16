import React, { useState, useEffect } from "react";
import "../../styles/sections/cart/cart.scss";
import ButtonShop from "../../components/button/ButtonShop";
import { ICart, ICartItem, IProduct, IProductDTO } from "../../types/product";
import axios from "axios";
import { API_IMAGES, API_LINK } from "../../default-value";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const [data, setData] = useState<ICart>();
  const user = useSelector((state: RootState) => state.account.user);
  const [cartId, setCartId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_LINK}/carts/${user?.username}`, {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
        },
      });
      setData(res.data.data);
      setTotalPrice(
        res.data.data.items.reduce((acc: number, obj: ICartItem) => {
          return acc + obj.productDTO.price * obj.cartItemDTO.quantity;
        }, 0)
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleQuantity = (id: number, quantity: number) => {
    const updateData = async () => {
      setLoading(true);
      try {
        if (user) {
          const data = {
            productID: id,
            quantity: quantity,
          };
          const res = await axios.patch(
            `${API_LINK}/cart/updateQuantity/${cartId}`,
            data
          );
          fetchCart();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    updateData();
  };

  const handleDelete = (id: number) => {
    const updateData = async () => {
      setLoading(true);
      try {
        if (user) {
          const data = {
            productID: id,
          };
          const res = await axios.patch(
            `${API_LINK}/cart/deleteProduct/${cartId}`,
            data
          );
          fetchCart();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    updateData();
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);
  return (
    <div className="cart">
      <div className="container cart-wrapper">
        <div className="row cart-wrapper-row">
          <div className="cart-items col-lg-8 col-12">
            <h1>Cart({data && data.items.length ? data.items.length : 0})</h1>
            <div className="cart-items__wrapper">
              <div className="cart-items__wrapper-heading grid-row">
                <div className="product-column">Product</div>
                <div className="product-price">Price</div>
              </div>

              <div className="cart-items__tiems">
                {data?.items && data.items.length > 0
                  ? data.items.map((item: ICartItem) => {
                      console.log(item);
                      return (
                        <div className="grid-row">
                          <div className="cart-items__tiem product-column">
                            <Link
                              to={`/product/${item.productDTO.id}`}
                              className="cart-items__item-img"
                            >
                              <img
                                src={`${API_IMAGES}/images/${item.images[0].url}`}
                                alt=""
                              />
                            </Link>

                            <div className="cart-items__item-info product-meta">
                              <Link
                                to={`/product/${item.productDTO.id}`}
                                className="cart-items__item-info-title"
                              >
                                {item.productDTO.name}
                              </Link>

                              <label className="cart-items__item-info-quantity">
                                Qty:{" "}
                                <input
                                  type="number"
                                  value={item.cartItemDTO.quantity}
                                  onChange={(e) =>
                                    handleQuantity(
                                      item.productDTO.id,
                                      Number(e.target.value)
                                    )
                                  }
                                />
                              </label>
                            </div>
                          </div>

                          <div className="product-price">
                            <div className="cart-items__item-price">
                              $
                              {Number(item.cartItemDTO.quantity) *
                                Number(item.productDTO.price)}
                            </div>

                            <div
                              className="cart-items__item-remove"
                              onClickCapture={() => {
                                handleDelete(item.cartItemDTO.cartId);
                              }}
                            >
                              Remove
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : "Cart Empty"}
              </div>
            </div>
          </div>
          <div className="cart-totals col-lg-4 col-12">
            <div className="cart-totals__info">
              <div className="cart-totals__info-heading">
                <div className="cart-totals__subtitle">
                  Subtotal({data && data.items.length ? data.items.length : 0}{" "}
                  items)
                </div>
                <div className="cart-totals__price">${totalPrice}</div>
              </div>
            </div>

            {loading ? (
              <Loading />
            ) : (
              <Link to={"/checkout"}>
                <ButtonShop name={"CHECK OUT"} />
              </Link>
            )}

            <div className="cart-totals__message">
              Taxes and shipping are calculated at checkout.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

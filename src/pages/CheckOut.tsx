import React, { Fragment, useEffect, useState } from "react";
import ShippingAddress from "../sections/checkout/ShippingAddress";
import CheckoutBanner from "../sections/checkout/CheckoutBanner";
import ExpressCheckout from "../sections/checkout/ExpressCheckout";
import "../styles/pages/Checkout.scss";
import OrderSummary from "../sections/checkout/OrderSummary";
import { IProduct } from "../types/product";
import axios from "axios";
import { API_LINK } from "../default-value";

const Checkout = () => {
  const [dataCart, setDataCart] = useState<IProduct[]>();
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState("");
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${API_LINK}/cart/`,
          {
            verify_id: localStorage?.getItem("accessToken"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
            },
          }
        );
        setDataCart(res.data.cart.productList);
        // console.log(res.data.cart);
        setCartId(res.data.cart._id);
        setSubtotal(
          res.data.cart.productList.reduce(
            (acc: any, obj: any) => acc + obj.price * obj.quantity,
            0
          )
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);
  const shippingFee = 0.0;
  const total = subtotal + shippingFee;
  return (
    <div className="Checkout">
      <div className="Checkout-left">
        <div className="CheckoutBanner">
          <CheckoutBanner />
          <div className="hide">
            <OrderSummary
              products={dataCart}
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
            />
          </div>
        </div>
        <div className="ExpressCheckout">
          <ExpressCheckout />
        </div>
        <div className="ShippingAddress">
          <ShippingAddress products={dataCart} total={total} cartId={cartId} />
        </div>
      </div>
      <div className="Checkout-right">
        <OrderSummary
          products={dataCart}
          subtotal={subtotal}
          shippingFee={shippingFee}
          total={total}
        />
      </div>
    </div>
  );
};

export default Checkout;

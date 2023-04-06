import React from "react";
import axios from "axios";

import Info from "../Info/Info";
import { useCart } from "../../hooks/useCart";

import "./Drawer.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Drawer({ items = [], onClose, onRemove, opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComlete, setIsOrderComlete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://641c8b3b1a68dc9e460c4cfd.mockapi.io/orders/",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComlete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://641c8b3b1a68dc9e460c4cfd.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      console.log("Не вдалось створити замовлення :(");
    }
    setIsLoading(false);
  };
  return (
    <div className={`${'overlay'} ${opened ? 'overlayVisible' : '' }`}>
      <div className="drawer">
        <h2>
          Кошик
          <img
            onClick={onClose}
            width={20}
            src="https://i.ibb.co/SPLVDyp/close.png"
            alt="close"
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem">
                  <div
                    style={{ backgroundImage: `url(${obj.image})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="infoText">
                    <p>{obj.title}</p>
                    <b>{obj.price} грн.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="remove"
                    src="https://i.ibb.co/dkFTh44/remove.png"
                    alt="remove"
                  />
                </div>
              ))}
            </div>

            <div className="carttotalBlock">
              <ul>
                <li>
                  <span>Разом</span>
                  <div></div>
                  <b>{totalPrice} грн. </b>
                </li>
                <li>
                  <span>Податок 3%</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 3} грн.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenBtn"
              >
                Оформити замовлення
                <img src="https://i.ibb.co/vkykXnM/arrow.png" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComlete ? "Замовлення оформлене!" : "Кошик порожній"}
            description={
              isOrderComlete
                ? `Ваше замовлення #${orderId} скоробуде передано кур'єрській доставці`
                : "Додайте хоча б одну пару кросівок, щоб зробити замовлення."
            }
            image={
              isOrderComlete
                ? "https://i.ibb.co/7gJj5NT/order-Complete.png"
                : "https://i.ibb.co/5ndzbW8/emptyBox.png"
            }
          />
        )}
      </div>
    </div>
  );
}

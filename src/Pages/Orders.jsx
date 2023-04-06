import React from "react";
import Card from "../Component/Card/Card";
import Info from "../Component/Info/Info";
import axios from "axios";
// import { AppContext } from "../App";

export default function Orders() {
// const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]); //Favorites

  React.useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await axios.get(
            "https://641c8b3b1a68dc9e460c4cfd.mockapi.io/orders"
          );
          setOrders(data.map((obj) => obj.items).flat());
      } catch (error) {
        console.log('Помилка загрузки корзини :(')
      }
    }
    fetchOrders();
  }, []);
  return (
    <div className="content">
      <div className="titleSearch">
        <h1>Мої замовлення</h1>
      </div>

      {orders.length > 0 ? <div className="sneakers">
        {orders.map((item, index) => (
          <Card
            key={index}
            // onFavorite={(obj) => onAddToFavorite(obj)}
            // onPlus={(obj) => onAddToCart(obj)}
            {...item}
          />
        ))}
      </div> :
       <Info
       title='У вас немає замовлень :('
       image='https://i.ibb.co/94ZV1PG/smile-Orders.png'
       description='Оформіть хоча б одне замовлення.'/>}
    </div>
  );
}

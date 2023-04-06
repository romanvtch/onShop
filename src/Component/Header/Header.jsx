import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";


export default function Header(props) {
  const { totalPrice } = useCart();
 
  return (
    <header>
      <Link to="/">
        <div className="headerLeft">
          <img src="img/header/logo.svg" alt="logo" />
          <div>
            <h3>React Sneakers</h3>
            <p>Магазин найкращих кросівок</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight">
        <li onClick={props.onClickCart}>
          <img className="cart" src="img/header/shoppingCard.svg" alt="shoppingCard" />
          <span>{totalPrice} грн.</span>
        </li>
        <li>
          <Link to="favorites">
            <img src="img/header/favorites.svg" alt="favorites" />
          </Link>
        </li>
        <li>
          <Link to="orders">
          <img src="img/header/user.svg" alt="user" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

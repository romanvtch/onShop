import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import style from "./Info.module.scss";

export default function Info({image,title, description}) {
  const {setCartOpeneded} = React.useContext(AppContext);
  return (
    <div className={style.cartEmpty}>
      <img src={image} alt="box" />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to='/onShop'>
      <button onClick={() => setCartOpeneded(false)} className={style.greenBtn}>
        <img src="img/drawer/arrow.svg" alt="arrow" />
        Повернутись назад
      </button>
      </Link>
    </div>
  );
}

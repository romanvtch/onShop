import React from "react";
import Card from "../Component/Card/Card";
import { AppContext } from "../App";
import Info from "../Component/Info/Info";

export default function Favorites({ onAddToCart}) {
  const {favorites, onAddToFavorite} = React.useContext(AppContext);

  return (
    <div className="content">
      <div className="titleSearch">
        <h1>Мої збережені</h1>
      </div>

      {favorites.length > 0 ? <div className="sneakers">
        {favorites.map((item, index) => (
          <Card
            key={index}
            // id={item.id}
            // title={item.title}
            // image={item.image}
            // price={item.price}
            favorited={true}
            onFavorite={onAddToFavorite}
            onPlus={(obj) => onAddToCart(obj)}
            {...item}
          />
        ))}
      </div> : 
      <Info
      title='Збережених немає :('
      image='img/favorites/smile.png'
      description='Ви нічого не додавали до закладок.'/>}
    </div>
  );
}

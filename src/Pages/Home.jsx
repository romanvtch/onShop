import React from "react";
import Card from "../Component/Card/Card";

export default function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
}) {
  return (
    <div className="content">
      {/* <div className="baner">
        <div className="textAndBtn">
          <p><span>Stan Smith</span>,<br/>Forever!</p>
          <button>Купити</button>
        </div>
        <img src="img/home/baner.png" alt="baner" />
      </div> */}
      <div className="titleSearch">
        <h1>
          {searchValue ? `Пошук по запросу: ${searchValue}` : "Усі товари"}
        </h1>
        <div className="search">
          <img src="img/search.svg" alt="search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear"
              width={16}
              src="img/drawer/close.svg"
              alt="clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Пошук..."
          />
        </div>
      </div>

      <div className="sneakers">
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item, index) => (
            <Card
              key={index}
              // id={item.id}
              // title={item.title}
              // image={item.image}
              // price={item.price}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              {...item} //secondWay
            />
          ))}
      </div>
    </div>
  );
}

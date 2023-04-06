import React from "react";
import axios from "axios";
import "./index.scss";
import { Routes, Route } from "react-router-dom";
import Drawer from "./Component/Drawer/Drawer";
import Header from "./Component/Header/Header";
//Pages
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import Orders from "./Pages/Orders";

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]); //Items(goods)
  const [cartItems, setCartItems] = React.useState([]); //Cart(Drawer)
  const [favorites, setFavorites] = React.useState([]); //Favorites
  const [cartOpeneded, setCartOpeneded] = React.useState(false); //OpenCartItems(Drawer)
  const [searchValue, setSearchValue] = React.useState(""); //Search

  React.useEffect(() => {
    async function fetchData() {
     try {
      const itemsResponse = await axios.get(
        "https://641c8b3b1a68dc9e460c4cfd.mockapi.io/items"
      );
      const cartResponse = await axios.get(
        "https://641c8b3b1a68dc9e460c4cfd.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://641c8b3b1a68dc9e460c4cfd.mockapi.io/favorites"
      );

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
     } catch (error) {
      console.log('Помилка при отримані даних :( MockApi😞');
     }
    }
    fetchData();
  }, []);

  //AddToCartItems(Drawer)#1(Main)
  const onAddToCart =  (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
         axios.delete(
          `https://641c8b3b1a68dc9e460c4cfd.mockapi.io/cart/${findItem.id}`
        ); //DeleteFrom(DataBase(Drawer))
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        ); //DeleteFromState
      } else {
        axios.post("https://641c8b3b1a68dc9e460c4cfd.mockapi.io/cart", obj); //saveDataBase
        setCartItems((prev) => [...prev, obj]); //saveState
      }
    } catch (error) {
      console.log("Не вдалось добавити товар в корзину :(");
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://641c8b3b1a68dc9e460c4cfd.mockapi.io/cart/${id}`); //DeleteFrom(DataBase(Drawer))
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id))); //deleteFromState
  };
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://641c8b3b1a68dc9e460c4cfd.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        //saveDataBase(Favorite)
        const { data } = await axios.post(
          "https://641c8b3b1a68dc9e460c4cfd.mockapi.io/favorites",
          obj
        );
        //saveState
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log("Не вдалось добавити товар в збережені :(");
    }
  };

  //Search
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpeneded,
        setCartItems,
      }}
    >
      <div className="wrapper">
        <Drawer
          items={cartItems}
          onRemove={onRemoveItem}
          onClose={() => setCartOpeneded(false)}
          opened={cartOpeneded}
        />

        <Header onClickCart={() => setCartOpeneded(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
              />
            }
          />
          <Route
            path="/favorites"
            element={<Favorites onAddToCart={onAddToCart} />}
          />

          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

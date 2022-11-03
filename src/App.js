import React, { useState } from "react";
import Header from "./components/layout/header";
import Meals from "./components/meals/meals";
import Cart from "./components/cart/cart";
import CartProvider from "./components/providers/cartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandelerFn = () => {
    setCartIsShown(true);
  };

  const hideCartHandelerFn = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandelerFn}></Cart>}
      <div>
        <Header onShowCart={showCartHandelerFn}></Header>
        <main>
          <Meals></Meals>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;

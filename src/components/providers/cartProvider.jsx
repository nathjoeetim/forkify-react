import React, { useReducer } from "react";
import cartContent from "./showCart-provider";
//hot to push an item into an array?
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducerFn = (state, action) => {
  if (action.type === `ADD`) {
    const updateTotalAmount =
      state.totalAmount + action.items.price * action.items.amount;

    // checking if an item already exist in the cart list

    const ExistingCartItemIndex = state.items.findIndex((el) => {
      return el.id === action.items.id;
    });

    const existingCartItem = state.items[ExistingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.items.amount,
      };

      updatedItems = [...state.items];
      updatedItems[ExistingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.items);
    }

    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === `REMOVE`) {
    const existingCartItemIndex = state.items.findIndex((el) => {
      return el.id === action.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === `CLEAR`) {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducerFn,
    defaultCartState
  );

  const addItemToCartHandeler = (item) => {
    dispatchCartAction({ type: `ADD`, items: item });
  };

  const removeItemFromCartHandeler = (id) => {
    dispatchCartAction({ type: `REMOVE`, id: id });
  };

  const clearCartHandeler = () => {
    dispatchCartAction({ type: `CLEAR` });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandeler,
    removeItem: removeItemFromCartHandeler,
    clearCart: clearCartHandeler,
  };

  return (
    <cartContent.Provider value={cartContext}>
      {props.children}
    </cartContent.Provider>
  );
};

export default CartProvider;

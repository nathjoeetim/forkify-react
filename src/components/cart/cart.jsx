import React, { useContext, useState, useEffect } from "react";
import CartContent from "../providers/showCart-provider";
import Modal from "../UI/modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [orderAvalable, setOrderAvaliable] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmitting] = useState(false);

  const userCartItems = useContext(CartContent);

  useEffect(() => {
    if (userCartItems.items.length === 0) {
      setOrderAvaliable(false);
    }
  }, [userCartItems.items.length]);

  const totalAmount = `$${userCartItems.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandeler = (id) => {
    userCartItems.removeItem(id);
  };

  const cartItemAddHandeler = (item) => {
    userCartItems.addItem({ ...item, amount: 1 });
  };

  const showFormHandeler = () => {
    setShowForm(true);
  };

  const submitOrderHandeler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      `https://react-http-f3ac8-default-rtdb.firebaseio.com/orders.json`,
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItem: userCartItems.items,
        }),
      }
    );
    setDidSubmitting(true);
    setIsSubmitting(false);
    userCartItems.clearCart();
  };

  const cartItem = userCartItems.items.map((el) => {
    return (
      <CartItem
        key={el.id}
        name={el.name}
        amount={el.amount}
        price={el.price}
        onRemoveProb={cartItemRemoveHandeler.bind(null, el.id)}
        onAddProb={cartItemAddHandeler.bind(null, el)}
      ></CartItem>
    );
  });

  const cartModelContent = (
    <React.Fragment>
      <div>
        <ul className={classes[`cart-items`]}>{cartItem} </ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span> {totalAmount} </span>
        </div>
        {showForm ? (
          <Checkout
            onHideForm={setShowForm}
            onCancel={props.onHideCart}
            onConfirm={submitOrderHandeler}
          />
        ) : (
          <div className={classes.actions}>
            <button
              className={classes[`button--alt`]}
              onClick={props.onHideCart}
            >
              {" "}
              close{" "}
            </button>
            {orderAvalable && (
              <button className={classes.button} onClick={showFormHandeler}>
                {" "}
                order{" "}
              </button>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );

  const isSubmmitingModelContent = <p>sending order data</p>;

  const didSubmmitingModelContent = (
    <React.Fragment>
      <p>successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes[`button--alt`]} onClick={props.onHideCart}>
          {" "}
          close{" "}
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!submitting && !didSubmit && cartModelContent}
      {submitting && isSubmmitingModelContent}
      {!submitting && didSubmit && didSubmmitingModelContent}
    </Modal>
  );
};

export default Cart;

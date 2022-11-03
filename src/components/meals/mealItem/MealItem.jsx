import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./mealItemForrm";
import cartContent from "../../providers/showCart-provider";

const MealItem = (props) => {
  const cartCtx = useContext(cartContent);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandeler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandeler}></MealItemForm>
      </div>
    </li>
  );
};

export default MealItem;

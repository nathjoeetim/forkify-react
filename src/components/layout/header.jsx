import React from "react";
import mealsImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./headerCartButton";

function Header(props) {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ForkifyReact</h1>
        <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
      </header>
      <div className={classes[`main-image`]}>
        <img src={mealsImg} alt="Dining Table" />
      </div>
    </React.Fragment>
  );
}
export default Header;

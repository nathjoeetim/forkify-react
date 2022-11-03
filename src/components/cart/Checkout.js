import classes from "./Checkout.module.css";
import React from "react";
import useInputValidator from "./validateInput";

const Checkout = (props) => {
  const valueFn = (value) => value.trim() !== "";
  const postalValid = (value) => value.trim().length >= 5;

  const {
    inputState: nameInput,
    inputIsValid: nameIsValid,
    hasNoError: nameHasNoError,
    inputIsBlurFn: nameInputBlurFn,
    onChangeHandelerFn: nameOnChangeHandeler,
    clearInputvalue: clearNameInput,
  } = useInputValidator(valueFn);

  const {
    inputState: codeInput,
    inputIsValid: codeIsValid,
    hasNoError: codeHasNoError,
    inputIsBlurFn: codeInputBlurFn,
    onChangeHandelerFn: codeOnChangeHandeler,
    clearInputvalue: clearCodeInput,
  } = useInputValidator(postalValid);

  const {
    inputState: streetInput,
    inputIsValid: streetIsValid,
    hasNoError: streetHasNoError,
    inputIsBlurFn: streetInputBlurFn,
    onChangeHandelerFn: streetOnChangeHandeler,
    clearInputvalue: clearStreetInput,
  } = useInputValidator(valueFn);

  const {
    inputState: cityInput,
    inputIsValid: cityIsValid,
    hasNoError: cityHasNoError,
    inputIsBlurFn: cityInputBlurFn,
    onChangeHandelerFn: cityOnChangeHandeler,
    clearInputvalue: clearCityInput,
  } = useInputValidator(valueFn);

  const formHasNoError =
    cityHasNoError && streetHasNoError && codeHasNoError && nameHasNoError;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formHasNoError) {
      return;
    }

    props.onHideForm(true);

    clearNameInput();
    clearStreetInput();
    clearCodeInput();
    clearCityInput();

    props.onConfirm({
      name: nameInput,
      postalCode: codeInput,
      street: streetInput,
      city: cityInput,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameInput}
          onChange={nameOnChangeHandeler}
          onBlur={nameInputBlurFn}
        />
        {nameIsValid && <p>user name must not be left empty</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetInput}
          onChange={streetOnChangeHandeler}
          onBlur={streetInputBlurFn}
        />
        {streetIsValid && <p>input a valid street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={codeInput}
          onChange={codeOnChangeHandeler}
          onBlur={codeInputBlurFn}
        />
        {codeIsValid && <p>input postal code for your location</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityInput}
          onChange={cityOnChangeHandeler}
          onBlur={cityInputBlurFn}
        />
        {cityIsValid && <p>input city of recedence</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        {formHasNoError && <button className={classes.submit}>Confirm</button>}
      </div>
    </form>
  );
};

export default Checkout;

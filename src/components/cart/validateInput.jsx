import { useState } from "react";

const useInputValidator = (validInput) => {
  const [inputState, setInputState] = useState("");
  const [inputIsBlur, setInputIsBlur] = useState(false);

  const hasNoError = validInput(inputState);

  const inputIsValid = !hasNoError && inputIsBlur;

  const onChangeHandelerFn = (e) => {
    setInputState(e.target.value);
  };

  const inputIsBlurFn = (e) => {
    setInputIsBlur(true);
  };

  const clearInputvalue = () => {
    setInputState("");
    setInputIsBlur(false);
  };
  return {
    inputState,
    hasNoError,
    inputIsValid,
    inputIsBlur,
    inputIsBlurFn,
    onChangeHandelerFn,
    clearInputvalue,
  };
};

export default useInputValidator;

import React from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./mealItem/MealItem";
import { useEffect } from "react";
import { useState } from "react";

const AvailabeMeal = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const mealApi = async () => {
      setIsloading(true);
      try {
        const data = await fetch(
          `https://react-http-f3ac8-default-rtdb.firebaseio.com/meals.json`
        );

        if (!data.ok) {
          throw new Error(`invalid Url, error ${data.status}`);
        }

        const response = await data.json();

        const responsData = [response];
        const lastResponse = responsData[0].response;

        const LoadedMeals = [];

        for (const key in lastResponse) {
          LoadedMeals.push({
            id: key,
            name: lastResponse[key].name,
            price: lastResponse[key].price,
            description: lastResponse[key].description,
          });
        }

        setMeals(LoadedMeals);
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        setErrorMessage(error.message);
      }
    };

    mealApi();
  }, []);

  const mealList = meals.map((el, i) => {
    return (
      <MealItem
        key={el.id}
        id={el.id}
        name={el.name}
        price={el.price}
        description={el.description}
      ></MealItem>
    );
  });

  let content;

  if (isLoading) {
    content = <p>LOADING ...</p>;
  }

  if (errorMessage) {
    content = <p>{errorMessage}</p>;
  } else {
    content = <ul>{mealList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailabeMeal;

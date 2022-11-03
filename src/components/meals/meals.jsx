import React from "react";
import MealsSummary from "./mealsSummary";
import AvailabeMeal from "./avalableMeals";

const Meals = () => {
  return (
    <React.Fragment>
      <MealsSummary></MealsSummary>
      <AvailabeMeal></AvailabeMeal>
    </React.Fragment>
  );
};

export default Meals;

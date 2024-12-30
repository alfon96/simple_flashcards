"use client";
import classes from "./FlashCards.module.css";
import { useSelector } from "react-redux";
import NewCardsForm from "./NewCardsForm/NewCardsForm";
import ShowCards from "./ShowCards/ShowCards";

const FlashCards = () => {
  const createMode = useSelector((state) => state.flashCard.createMode);

  return (
    <div className={classes.cnt}>
      {createMode ? <NewCardsForm /> : <ShowCards />}
    </div>
  );
};

export default FlashCards;

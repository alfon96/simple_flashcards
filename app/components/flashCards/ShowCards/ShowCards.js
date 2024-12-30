"use client";
import classes from "./ShowCards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { progressIndex, toggleShowQuestion } from "@/app/store/flashCardSlice";

const ShowCards = () => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.flashCard.cardToShow);
  const showQuestion = useSelector((state) => state.flashCard.showQuestion);

  const handleOnClick = () => {
    if (showQuestion) {
      dispatch(progressIndex());
      return;
    }
    dispatch(toggleShowQuestion());
  };

  return (
    <div className={classes.flashCardsCnt}>
      <div
        className={`${classes.flashCard} ${
          showQuestion ? "" : classes.flipped
        }`}
        onClick={() => handleOnClick()} // Parent click handler
      >
        <div className={classes.front}>{card && card[0]}</div>
        <div className={classes.back}>{card && card[1]}</div>
      </div>
      <div
        className={classes.swap}
        onClick={(e) => {
          e.stopPropagation(); // Prevent event bubbling
          dispatch(toggleShowQuestion());
        }}
      >
        🔎
      </div>
    </div>
  );
};

export default ShowCards;

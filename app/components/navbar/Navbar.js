"use client";
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateMode } from "@/app/store/flashCardSlice";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const createMode = useSelector((state) => state.flashCard.createMode);
  const dispatch = useDispatch();
  const content = createMode ? "Show Flashcards" : "Load Flashcards";

  return (
    <nav className={classes.navbar}>
      <div className={classes.brand}>Flashcards</div>
      <button
        className={classes.navButton}
        onClick={() => {
          dispatch(toggleCreateMode());
        }}
      >
        {content}
      </button>
    </nav>
  );
};

export default Navbar;

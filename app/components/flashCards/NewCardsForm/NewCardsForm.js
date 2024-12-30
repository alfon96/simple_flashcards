"use client";
import { useState, useEffect } from "react";
import classes from "./NewCardsForm.module.css";
import { setCreatedCards, setFlashCards } from "@/app/store/flashCardSlice";
import { useSelector, useDispatch } from "react-redux";

const NewCardsForm = () => {
  const dispatch = useDispatch();
  const createdCards = useSelector((state) => state.flashCard.createdCards);
  const [text, setText] = useState(createdCards);

  const [errors, setErrors] = useState([]);
  const [qaList, setQaList] = useState([]);

  const validateInput = (input) => {
    const lines = input
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const validationErrors = [];
    const validQaList = [];

    // Check formatting and pairing
    for (let i = 0; i < lines.length; i += 2) {
      const question = lines[i];
      const answer = lines[i + 1];

      // Ensure question starts with 'q:'
      if (!question || !question.startsWith("q:")) {
        validationErrors.push(
          `Line ${i + 1}: "${question || "(empty)"}" must start with "q:"`
        );
      }

      // Ensure answer starts with 'a:'
      if (!answer || !answer.startsWith("a:")) {
        validationErrors.push(
          `Line ${i + 2}: "${answer || "(empty)"}" must start with "a:"`
        );
      }

      // Ensure question and answer are not empty or just spaces
      const questionContent = question?.replace("q:", "").trim();
      const answerContent = answer?.replace("a:", "").trim();

      if (!questionContent || questionContent.length === 0) {
        validationErrors.push(
          `Line ${
            i + 1
          }: The question "${question}" must contain at least one non-space character.`
        );
      }

      if (!answerContent || answerContent.length === 0) {
        validationErrors.push(
          `Line ${
            i + 2
          }: The answer "${answer}" must contain at least one non-space character.`
        );
      }

      // Add valid question-answer pairs to the list
      if (
        question &&
        question.startsWith("q:") &&
        answer &&
        answer.startsWith("a:") &&
        questionContent &&
        answerContent
      ) {
        validQaList.push([questionContent, answerContent]);
      }
    }

    // Check if total lines are odd (unmatched pair)
    if (lines.length % 2 !== 0) {
      const lastLine = lines[lines.length - 1];
      validationErrors.push(
        `Unmatched question/answer pair: "${
          lastLine || "(empty)"
        }". Ensure every 'q:' is followed by an 'a:'.`
      );
    }

    setErrors(validationErrors);

    // If no errors, update the qaList
    if (validationErrors.length === 0) {
      setQaList(validQaList);
      dispatch(setFlashCards(validQaList));
    }

    dispatch(setCreatedCards(input));
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText); // Update the state with the new value
    validateInput(newText); // Pass the latest value to the validation
  };

  useEffect(() => {
    validateInput(text);
  }, [text]);

  return (
    <div className={classes.cnt}>
      <div className={classes.textareaContainer}>
        <textarea
          value={text}
          className={classes.textarea}
          onChange={handleChange}
          placeholder="Enter your questions and answers in 'q:' and 'a:' format."
        ></textarea>
      </div>

      {/* Render the errors section only if there are errors */}
      {errors.length > 0 && (
        <div className={classes.errors}>
          <ul>
            {errors.map((error, index) => (
              <li key={index} className={classes.error}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <span className={classes.info}>
        Make sure to save these lines on your computer to be able to retrieve
        the flashcards whenever you want.
      </span>
    </div>
  );
};

export default NewCardsForm;

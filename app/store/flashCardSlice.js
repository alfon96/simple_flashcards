// store/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Function to generate a random sequence
function getRandomSequence(min, max) {
  const indices = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]]; // Swap
  }
  return indices;
}

const flashCardSlice = createSlice({
  name: "flashCardSlice",
  initialState: {
    cards: [
      ["What is the capital of France?", "Paris"],
      ["What is the capital of Italy?", "Rome"],
      ["What is the capital of United Kingdom?", "London"],
      ["What is the capital of USA?", "Washington"],
    ],
    index: 0,
    indexSequence: getRandomSequence(0, 3),
    cardToShow: ["Click on me to start", "Sample Answer"],
    showQuestion: true,
    createMode: false,
    newCards: [],
    createdCards: `q: What is the Capital of France?
a: Paris
q: What is the Capital of United Kingdom?
a: London
q: What is the Capital of U.S.A?
a: Washington
  `,
  },

  reducers: {
    setCreatedCards: (state, action) => {
      state.createdCards = action.payload;
    },
    setFlashCards: (state, action) => {
      state.cards = action.payload;
    },
    setShowQuestion: (state, action) => {
      state.showQuestion = action.payload;
    },
    toggleCreateMode: (state) => {
      state.createMode = !state.createMode;
    },
    toggleShowQuestion: (state) => {
      if (state.cardToShow === "Click on me to start") return;
      console.log("Toggled");
      state.showQuestion = !state.showQuestion;
    },
    setIndex: (state, action) => {
      state.cards = action.payload;
    },
    progressIndex: (state) => {
      console.log("Progress");
      if (state.index >= state.indexSequence.length - 1) {
        // Regenerate the sequence when all cards are shown
        state.indexSequence = getRandomSequence(0, state.cards.length - 1);
        state.index = 0;
      } else {
        // Move to the next question
        state.index += 1;
      }

      state.cardToShow = state.cards[state.indexSequence[state.index]];
    },
    setIndexSequence: (state, action) => {
      state.flashCards = action.payload;
    },
  },
});

// Export the actions
export const {
  setFlashCards,
  setIndex,
  setIndexSequence,
  progressIndex,
  toggleShowQuestion,
  toggleCreateMode,
  setNewCards,
  setCreatedCards,
} = flashCardSlice.actions;

// Export the reducer to be used in the store
export default flashCardSlice.reducer;

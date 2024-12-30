"use client";
import FlashCards from "./components/flashCards/FlashCards";
import Navbar from "./components/navbar/Navbar";
import Toolbar from "./components/toolbar/Toolbar";
import { Provider } from "react-redux";
import { store } from "./store/index";

export default function Home() {
  return (
    <Provider store={store}>
      <Navbar></Navbar>
      <FlashCards></FlashCards>
      <Toolbar></Toolbar>
    </Provider>
  );
}

import { useState, useLayoutEffect, useContext } from "react";
import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { ResultCalc } from "./ResultCalc";
import { ResultContens } from "./ResultContens";

export const Result = () => {

  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  
  return <></>;
}
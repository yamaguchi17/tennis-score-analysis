import { createContext, useState, useReducer } from "react";
import { globalStateType } from "../common/AppTypes";

type GlobalStateContextType = {
  globalState: globalStateType;
  setGlobalState: (globalState: globalStateType) => void;
}

const globalStateInitial:globalStateType = {
  userId: "0",
  isLoggedIn: false,
  isRecording: false,
  recodingMatchId: 0,
  displayResultId: 0,
}

export const GlobalStateContext = createContext<GlobalStateContextType>({
  globalState: globalStateInitial,
  setGlobalState: (globalState) => {}
});

// declare type newDetailsType =
//   | {userId: string}
//   | {isLoggedIn: boolean}
//   | {isRecording: boolean}
//   | {recodingMatchId: number}
//   | {displayResultId: number};

export const GlobalStateProvider: React.VFC<{ children: React.ReactNode }> = ({children}) => {

  const [globalState, setGlobalState] = useState<globalStateType>(globalStateInitial);
  // const [globalState, setGlobalState] = useReducer(
  //   (globalState:globalStateType, newDetails:newDetailsType) => ({...globalState, ...newDetails}),
  //   globalStateInitial
  // );

  return (
    <GlobalStateContext.Provider value = {{globalState, setGlobalState}} >
      {children}
    </GlobalStateContext.Provider>
  );
};

import { createContext, useState } from "react";
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

export const GlobalStateProvider: React.VFC<{ children: React.ReactNode }> = ({children}) => {

  const [globalState, setGlobalState] = useState<globalStateType>(globalStateInitial);

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

import { createContext, useState } from "react";
import { TIE_BREAK_MODE, DEUCE_MODE } from "../common/AppConst";
import { ruleSetType } from "../common/AppTypes";

type RuleSettingsContextType = {
  ruleSettings: ruleSetType;
  setRuleSettings: (ruleSettings: ruleSetType) => void;
}

const ruleSettingsInitial:ruleSetType = {
  tieBreakMode:TIE_BREAK_MODE.TIE_BREAK,
  deuceMode:DEUCE_MODE.DEUCE,
  numberOfGames: "6",
  numberOfTieBreakPoint: "7",
  // enabledTieBreak:false,
  // enabledSemiAdDeuce:false,  
}

export const RuleSettingsContext = createContext<RuleSettingsContextType>({
  ruleSettings: ruleSettingsInitial,
  setRuleSettings: (ruleSettings) => {}
});

export const RuleSettingsProvider: React.VFC<{ children: React.ReactNode }> = ({children}) => {

  //適用ルール種類
  const [ruleSettings, setRuleSettings] = useState<ruleSetType>(ruleSettingsInitial);

  return (
    <RuleSettingsContext.Provider value={{ ruleSettings, setRuleSettings }}>
      {children}
    </RuleSettingsContext.Provider>
  );
};

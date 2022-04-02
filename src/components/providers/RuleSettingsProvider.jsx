import { createContext, useState } from "react";
import { TIE_BREAK_MODE, DEUCE_MODE } from "../common/AppConst";

export const RuleSettingsContext = createContext();

export const RuleSettingsProvider = ({children}) => {

  //適用ルール種類
  const [ruleSettings, setRuleSettings] = useState({
    tieBreakMode:TIE_BREAK_MODE.TIE_BREAK,
    deuceMode:DEUCE_MODE.DEUCE,
    enabledTieBreak:false,
    enabledSemiAdDeuce:false,
    numberOfGames:6,
    numberOfTieBreakPoint:7,
  });

  return (
    <RuleSettingsContext.Provider value={[ ruleSettings, setRuleSettings ]}>
      {children}
    </RuleSettingsContext.Provider>
  );
};

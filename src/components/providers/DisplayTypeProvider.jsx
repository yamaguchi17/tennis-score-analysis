import { createContext, useState } from "react";

export const DisplayTypeContext = createContext();

export const DisplayTypeProvider = ({children}) => {

  //画面種類
  const [displayType, setDisplayType] = useState(0);

  // ContextオブジェクトとしてisAdminとsetIsAdminを設定(オブジェクトの省略記法)
  return (
    <DisplayTypeContext.Provider value={[ displayType, setDisplayType ]}>
      {children}
    </DisplayTypeContext.Provider>
  );
};

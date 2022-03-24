import { ChangeEvent, useState, FC, useCallback, useContext } from "react";
import { Main } from "./Main";
import { Record } from "./Record";
import { DisplayTypeProvider, DisplayTypeContext } from "./providers/DisplayTypeProvider";
import { AppConst } from "./common/constant";
import { TestArea } from "./TextArea";
import { ButtonAppBar } from "./Header"
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from "@mui/material";

export const App: FC = () => {
  

  const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);

  const handleClick = () => {
    setDisplayType( (prev:number) => prev == AppConst.DISPLAY_TYPES.MAIN ? prev = AppConst.DISPLAY_TYPES.RECORD : prev = AppConst.DISPLAY_TYPES.MAIN);
  };

  //画面種類の出し分け
  const DisplayTypeExport = () => {
    switch (displayType) {
      case AppConst.DISPLAY_TYPES.MAIN: return <Main />; break;
      case AppConst.DISPLAY_TYPES.RECORD: return <Record />; break;
      case AppConst.DISPLAY_TYPES.RESULT: return <TestArea />; break;
      case AppConst.DISPLAY_TYPES.EDIT: return <TestArea />; break;
      default: return <Main />;
    }
  };

  return (
    <div>
      <CssBaseline />
      <ButtonAppBar />
      <Button onClick={handleClick}>ボタン</Button>
      <DisplayTypeExport />
    </div>
  );
}


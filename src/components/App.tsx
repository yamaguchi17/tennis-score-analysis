import { FC, useContext } from "react";
import { Main } from "./Main";
import { Record } from "./Record";
import { DisplayTypeContext } from "./providers/DisplayTypeProvider";
import { AppConst } from "./common/AppConst";
import { TestArea } from "./TextArea";
import { ButtonAppBar } from "./Header"
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from "@mui/material";

export const App: FC = () => {
  

  const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);

  const handleClick = () => {
    setDisplayType( (prev:number) => prev === AppConst.DISPLAY_TYPES.MAIN ? prev = AppConst.DISPLAY_TYPES.RECORD : prev = AppConst.DISPLAY_TYPES.MAIN);
  };

  //画面種類の出し分け
  const DisplayTypeExport = () => {
    switch (displayType) {
      case AppConst.DISPLAY_TYPES.MAIN:return <Main />;
      case AppConst.DISPLAY_TYPES.RECORD: return <Record />;
      case AppConst.DISPLAY_TYPES.RESULT: return <TestArea />;
      case AppConst.DISPLAY_TYPES.EDIT: return <TestArea />;
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


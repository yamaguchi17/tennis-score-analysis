import { FC, useContext } from "react";
import { Main } from "./Main";
import { Record } from "./Record";
import { DisplayTypeContext } from "./providers/DisplayTypeProvider";
import { DISPLAY_TYPES } from "./common/AppConst";
import { TestArea } from "./TextArea";
import { ButtonAppBar } from "./Header"
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from "@mui/material";
import Container from '@mui/material/Container';
import styled from '@emotion/styled'

export const App: FC = () => {
  
  const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);

  const handleClick = () => {
    setDisplayType( (prev:number) => prev === DISPLAY_TYPES.MAIN ? prev = DISPLAY_TYPES.RECORD : prev = DISPLAY_TYPES.MAIN);
  };

  //画面種類の出し分け
  const DisplayTypeExport = () => {
    switch (displayType) {
      case DISPLAY_TYPES.MAIN:return <Main />;
      case DISPLAY_TYPES.RECORD: return <Record />;
      case DISPLAY_TYPES.RESULT: return <TestArea />;
      case DISPLAY_TYPES.EDIT: return <TestArea />;
      default: return <Main />;
    }
  };

  return (
    <>
      <CssBaseline />
      <ButtonAppBar />
      <Button onClick={handleClick}>ボタン</Button>
      <SContainer maxWidth="sm">
        <DisplayTypeExport />
      </SContainer>
    </>
  );
}

const SContainer = styled(Container)({
  display:'flex',
  flexDirection:'column',
  alignItems:'center'
});
import { FC, useEffect, useContext } from "react";
import { Main } from "./Main";
import { Record } from "./Record";
import { Result } from "./Result";
import { DisplayTypeContext } from "./providers/DisplayTypeProvider";
import { GlobalStateContext } from "./providers/GlobalStateProvider";
import { DISPLAY_TYPES } from "./common/AppConst";
import { TestArea } from "./TextArea";
import { ButtonAppBar } from "./Header"
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from "@mui/material";
import Container from '@mui/material/Container';
import styled from '@emotion/styled'
import { db } from "./common/db"
import {globalStateType} from './common/AppTypes'
import {PointType,pointDefaultData} from './common/AppTypes'

export const App: FC = () => {
  
  const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);
  const { globalState, setGlobalState } = useContext(GlobalStateContext);

  //---------テスト用処理---------------//
  const handleClick = () => {
    setDisplayType( (prev:number) => prev === DISPLAY_TYPES.MAIN ? prev = DISPLAY_TYPES.RECORD : prev = DISPLAY_TYPES.MAIN);
  };
  const handleClick2 = () => {
    setDisplayType( (prev:number) => prev === DISPLAY_TYPES.RECORD ? prev = DISPLAY_TYPES.RESULT : prev = DISPLAY_TYPES.RECORD);
  };
  const handleClick3 = () => {
    const newGState:globalStateType = {
      userId: "0",
      isLoggedIn: false,
      isRecording: false,
      recodingMatchId: 0,
      displayResultId: 0,
    }
    setGlobalState(newGState);
    db.globalState.delete("0");
    //db.matchData.delete("0");
  };

  const handleClick4 = () => {
      //matchDataテーブルに新規レコードを追加
      const data:PointType[] = pointDefaultData();
      db.matchData.add({data}).then((item)=>{
          console.log("追加処理完了"+item);
      }).catch((error)=>{
          console.log("追加処理エラー"+error);
      });
      db.matchData.reverse().first(item => {
        console.log(`id:${item?.id}`);
      })
  }
  //---------テスト用処理---------------//

  //globalStateの初期設定
  useEffect(() => {
    const gs = db.globalState.get({userId: "0"})
    .then((gs)=>{
      //globalStateテーブルにレコードが存在しなければ、初期値レコードを追加
      if(gs === undefined){
        const item = db.globalState.add({
          userId:globalState.userId,
          isLoggedIn: globalState.isLoggedIn,
          isRecording: globalState.isRecording,
          recodingMatchId: globalState.recodingMatchId,
          displayResultId: globalState.displayResultId,      
        });
      }
      //globalStateテーブルにレコードが存在すれば、レコードをstateに反映
      else {
        const newGState:globalStateType = {
          userId: gs.userId,
          isLoggedIn: gs.isLoggedIn,
          isRecording: gs.isRecording,
          recodingMatchId: gs.recodingMatchId,
          displayResultId: gs.displayResultId
        }
        setGlobalState(newGState);
      }
    })
    .catch((error)=>{
      console.error("error" + error);
    });
  },[]);


  //画面種類の出し分け
  const DisplayTypeExport = () => {
    switch (displayType) {
      case DISPLAY_TYPES.MAIN:return <Main />;
      case DISPLAY_TYPES.RECORD: return <Record />;
      case DISPLAY_TYPES.RESULT: return <Result />;
      case DISPLAY_TYPES.EDIT: return <TestArea />;
      default: return <Main />;
    }
  };

  return (
    <>
      <CssBaseline />
      <ButtonAppBar />
      <Button onClick={handleClick} variant="outlined" sx={{marginRight:'1rem'}}>Home ⇔ Record</Button>
      <Button onClick={handleClick2} variant="outlined" >Record ⇔ Result</Button>
      <Button onClick={handleClick3} variant="outlined" >globalState初期化</Button>
      <Button onClick={handleClick4} variant="outlined" >matchDataレコード追加</Button>
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
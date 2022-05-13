import { FC, useState, useLayoutEffect, useContext,  } from "react";
import { Main } from "./pages/Main";
import { Record } from "./pages/Record";
import { ResultCalc } from "./pages/ResultCalc";
import { ResultContens } from "./pages/ResultContens";
import { DataManage } from "./pages/DataManage";
import { DisplayTypeContext } from "./providers/DisplayTypeProvider";
import { GlobalStateContext } from "./providers/GlobalStateProvider";
import { DISPLAY_TYPES } from "./common/AppConst";
import { Header } from "./components/Header"
import { db } from "./common/db";
import { PointType, pointDefaultData, globalStateType, globalStateDefaultDataGet } from './common/AppTypes';
import theme from './common/theme';
import { sampleResultData } from "./components/Result/SampleResultData";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import styled from '@emotion/styled';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { ThemeProvider } from '@mui/material/styles';

export const App: FC = () => {

  const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);
  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  const [ isCompleted, setIsCompleted ]  = useState(false);

  //---------テスト用処理---------------//
  const handleClick = () => {
    setDisplayType((prev: number) => prev === DISPLAY_TYPES.MAIN ? prev = DISPLAY_TYPES.RECORD : prev = DISPLAY_TYPES.MAIN);
  };
  const handleClick2 = () => {
    setDisplayType((prev: number) => prev === DISPLAY_TYPES.RECORD ? prev = DISPLAY_TYPES.RESULT_CALC : prev = DISPLAY_TYPES.RECORD);
  };
  const handleClick3 = () => {
    const newGState:globalStateType = globalStateDefaultDataGet();
    setGlobalState(newGState);
  };

  const handleClick4 = () => {
    //matchDataテーブルに新規レコードを追加
    const data: PointType[] = pointDefaultData();
    db.matchData.add({ currentPointId: 0, data: data }).then((item) => {
      console.log("追加処理完了" + item);
    }).catch((error) => {
      console.log("追加処理エラー" + error);
    });
    db.matchData.reverse().first(item => {
      console.log(`id:${item?.id}`);
    })
  }

  const handleClick5 = () => {
    //matchDataテーブルに新規レコードを追加
    db.delete();
  }

  const handleClick6 = () => {
    setDisplayType((prev: number) => prev === DISPLAY_TYPES.MAIN ? prev = DISPLAY_TYPES.RESULT_CONTENTS : prev = DISPLAY_TYPES.MAIN);
  }

  //---------テスト用処理---------------//




  

  //globalStateの初期設定
  useLayoutEffect(() => {
    db.globalState.get({ userId: "0" })
      .then((gs) => {
        //globalStateテーブルにレコードが存在しなければ、初期値レコードを追加
        if (gs === undefined) {
          const globalStateDefaultData = globalStateDefaultDataGet();
          db.globalState.add({
            userId: globalStateDefaultData.userId,
            isLoggedIn: globalStateDefaultData.isLoggedIn,
            isRecording: globalStateDefaultData.isRecording,
            recodingMatchId: globalStateDefaultData.recodingMatchId,
            displayResultId: globalStateDefaultData.displayResultId,
            lang: globalStateDefaultData.lang,
          });
          //Resultテーブルにサンプルデータを追加
          db.resultData.put(sampleResultData);
        }
        //globalStateテーブルにレコードが存在すれば、Contextに反映
        else {
          const newState: globalStateType = {
            userId: gs.userId,
            isLoggedIn: gs.isLoggedIn,
            isRecording: gs.isRecording,
            recodingMatchId: gs.recodingMatchId,
            displayResultId: gs.displayResultId,
            lang: gs.lang,
          }
          setGlobalState(newState);
        }
        setIsCompleted(true);
      })
      .catch((error) => {
        console.error("error" + error);
      })
  }, []);

    //ローディング
  if (!isCompleted) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  
  //画面種類の出し分け
  const DisplayTypeExport = () => {
    switch (displayType) {
      case DISPLAY_TYPES.MAIN: return <Main />;
      case DISPLAY_TYPES.RECORD: return <Record />;
      case DISPLAY_TYPES.RESULT_CALC: return <ResultCalc />;
      case DISPLAY_TYPES.RESULT_CONTENTS: return <ResultContens />;
      case DISPLAY_TYPES.DATA_MANAGE: return <DataManage />;
      default: return <Main />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {/* <Button onClick={handleClick} variant="outlined" sx={{ marginRight: '1rem' }}>Home ⇔ Record</Button>
      <Button onClick={handleClick2} variant="outlined" >Record ⇔ Result</Button>
      <Button onClick={handleClick3} variant="outlined" >globalState初期化</Button>
      <Button onClick={handleClick4} variant="outlined" >matchDataレコード追加</Button>
      <Button onClick={handleClick5} variant="outlined" >DB削除</Button>
      <Button onClick={handleClick6} variant="outlined" >Home ⇔ Result</Button> */}
      <SContainer maxWidth="sm">
        <DisplayTypeExport />
      </SContainer>
    </ThemeProvider>
  );
}

const SContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingBottom: '3rem',
});
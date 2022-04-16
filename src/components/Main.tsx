import { useState,useContext } from "react";
import { DisplayTypeContext } from "./providers/DisplayTypeProvider";
import { GlobalStateContext } from "./providers/GlobalStateProvider";
import { RuleSettings } from "../components/RuleSettings"
import { DISPLAY_TYPES } from "./common/AppConst";
import styled from '@emotion/styled'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { db } from "./common/db";
import {globalStateType, PointType,pointDefaultData} from './common/AppTypes'

export const Main = () => {

    const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);
    const { globalState, setGlobalState } = useContext(GlobalStateContext);

    const newGameClick = () => {
        //新規開始の場合
        if(!globalState.isRecording){
            //stateを記録中に更新する
            const newGlobalState:globalStateType = globalState;
            newGlobalState.isRecording = true;
            setGlobalState(newGlobalState);
            db.globalState.update("0", newGlobalState);
            
            //matchDataテーブルに新規レコードを追加
            const data:PointType[] = pointDefaultData();
            db.matchData.add({data});

            //globalStateのrecodingMatchIdを追加されたレコードのIDに設定
            db.matchData.reverse().first(item => {
                const newGlobalState:globalStateType = globalState;
                newGlobalState.recodingMatchId = Number(item?.id);
                setGlobalState(newGlobalState);
                db.globalState.update("0", newGlobalState);         
            })
        }
        //表示をレコード画面に切り替える
        setDisplayType(DISPLAY_TYPES.RECORD);
    };

    return (
        <>
            <SNewGameBox>
                <SNewGameButton onClick={newGameClick} variant="contained">{globalState.isRecording? "Continue" : "New Game"}</SNewGameButton>
            </SNewGameBox>
            <RuleSettings />
        </>

    );
}

const SNewGameBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsl(209, 78%, 95%)',
    width: '100%',
    maxWidth: '28rem',
    height: '6rem',
});
const SNewGameButton = styled(Button)({
    display: 'block',
    margin: '0 auto'
});
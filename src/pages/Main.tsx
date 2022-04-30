import { useContext } from "react";
import { DisplayTypeContext } from "../providers/DisplayTypeProvider";
import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { RuleSettingsContext } from "../providers/RuleSettingsProvider";
import { RuleSettings } from "../components/RuleSettings";
import { SaveData } from "../components/SaveData/SaveData";
import { DISPLAY_TYPES } from "../common/AppConst";
import { PointType,pointDefaultData} from '../common/AppTypes';
import { db } from "../common/db";
import styled from '@emotion/styled'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const Main = () => {

    const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);
    const { globalState, setGlobalState } = useContext(GlobalStateContext);
    const { ruleSettings, setRuleSettings } = useContext(RuleSettingsContext);

    const newGameClick = async () => {
        //新規開始の場合
        if(!globalState.isRecording){
            const newglobalState = globalState;

            //stateを記録中に更新する
            db.globalState.update("0", {"isRecording":true});
            newglobalState.isRecording = true;
            
            //matchDataテーブルに新規レコードを追加
            const data:PointType[] = pointDefaultData();
            data[0].point.serverSide = ruleSettings.selectedServer;
            await db.matchData.add({currentPointId:0,data:data});

            //globalStateのrecodingMatchIdを追加されたレコードのIDに設定
            await db.matchData.reverse().first(item => {
                db.globalState.update("0", {"recodingMatchId":Number(item?.id)});
                newglobalState.recodingMatchId = Number(item?.id);
            })

            setGlobalState(newglobalState);      
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
            <SaveData />
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
    marginTop: '1rem',
});
const SNewGameButton = styled(Button)({
    display: 'block',
    margin: '0 auto'
});
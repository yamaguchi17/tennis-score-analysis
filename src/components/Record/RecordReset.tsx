import { useState, useContext } from "react";
import { DisplayTypeContext } from "../../providers/DisplayTypeProvider";
import { GlobalStateContext } from "../../providers/GlobalStateProvider";
import { DISPLAY_TYPES } from "../../common/AppConst";
import { db } from "../../common/db";
import { DialogAlert } from "../DialogAlert";
import Button from "@mui/material/Button";

export const RecordReset = () => {

    const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);
    const { globalState, setGlobalState } = useContext(GlobalStateContext);

    const [callState, setCallState] = useState(false);

    const handleClickOpen = () => {
      setCallState(true);
    };    

    const resetClick = async () => {
        //リセットの場合
        if(globalState.isRecording){
            const newglobalState = globalState;

            //stateを記録中からfalseに更新する
            db.globalState.update("0", {"isRecording":false});
            newglobalState.isRecording = false;
            
            //matchDataテーブルに新規レコードを追加
            await db.matchData.delete(globalState.recodingMatchId);

            setGlobalState(newglobalState);
        }
        //表示をメイン画面に切り替える
        setDisplayType(DISPLAY_TYPES.MAIN);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                variant="outlined"
                color="error" 
                style={{width: '11rem', margin: '3rem 0rem 0rem 3rem'}}
            >入力内容をリセット
            </Button>
            <DialogAlert
                callState={callState}
                setCallState={setCallState}
                titleText="入力内容をリセットしますか？"
                callback={resetClick}
            >
            </DialogAlert>
        </>
    );
}

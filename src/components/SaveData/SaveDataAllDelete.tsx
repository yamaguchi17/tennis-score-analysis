import { useState} from "react";
import { DialogAlert } from "../DialogAlert";
import { db } from "../../common/db";
import { ResultDataType } from '../../common/AppTypes';
import Button from '@mui/material/Button';

type Props = {
  setResultData: React.Dispatch<React.SetStateAction<ResultDataType[]>>
}

export const SaveDataAllDelete: React.VFC<Props> = (props) => {  

  const [callState, setCallState] = useState(false);

  const handleClickOpen = () => {
    setCallState(true);
  };

  //全削除処理
  const deleteAllClick = ()=> {
    //dbを全削除
    db.delete();
    //ページリロード 初期設定をさせるため
    window.location.reload();
  }

  return (
    <div style={{display:'flex', justifyContent:'center', padding:'1rem 0'}}>
      <Button variant="outlined" onClick={handleClickOpen} color="error">
        全てのデータを削除
      </Button>
      <DialogAlert
        callState={callState}
        setCallState={setCallState}
        titleText="削除しますか？"
        callback={deleteAllClick}
      >対象データ：全てのデータ{'\n\n'}※ 実行後ページが更新されます</DialogAlert>
    </div>
  );
}
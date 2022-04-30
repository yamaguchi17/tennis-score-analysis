import { useState} from "react";
import { DialogAlert } from "../DialogAlert";
import { ResultDataType } from '../../common/AppTypes';
import { db } from "../../common/db";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

type Props = {
  setResultData: React.Dispatch<React.SetStateAction<ResultDataType[]>>,
  id:number,
  matchName:string,
}

export const SaveDataSingleDelete: React.VFC<Props> = (props) => {  

  const [callState, setCallState] = useState(false);

  const handleClickOpen = () => {
    setCallState(true);
  };

  //削除処理
  const deleteClick = (id:number)=>{
    db.resultData.delete(id);
    db.matchData.delete(id);
    db.resultData.toArray()
      .then((rd) => {
        if (rd !== undefined) {
          props.setResultData(rd);
        }
      });
  }

  return (
    <div style={{display:'flex', justifyContent:'center', padding:'1rem 0'}}>
      <IconButton color="error" aria-label={"deleteBtn" + props.id} component="span" onClick={handleClickOpen} >
        <DeleteIcon />
      </IconButton>
      <DialogAlert
        callState={callState}
        setCallState={setCallState}
        titleText= "削除しますか？"
        callback={()=>{deleteClick(props.id)}}
      >対象データ：{props.matchName}</DialogAlert>
    </div>
  );
}
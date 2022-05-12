import { useState, useLayoutEffect, useContext } from "react";
import { ResultDataType, resultDataStatuType, resultDefaultDataGet} from '../../common/AppTypes';
import { db } from "../../common/db";
import { GlobalStateContext } from "../../providers/GlobalStateProvider";
import { format } from "date-fns";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import ja from 'date-fns/locale/ja'

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  submitCount:number;
  setSubmitCount: React.Dispatch<React.SetStateAction<number>>;
}

function EditDialog(props: EditDialogProps) {

  //props
  const { onClose, open ,submitCount, setSubmitCount} = props;

  //context
  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  const [ resultData, setResultData ] = useState<ResultDataType>(resultDefaultDataGet());

  //state
  const [ macthName, setMatchName ] = useState("");
  const [ macthDate, setMacthDate ] = useState(new Date);
  const [ player1Name, setPlayer1Name ] = useState("");
  const [ player2Name, setPlayer2Name ] = useState("");  

  //DB読み込み
  useLayoutEffect(()=>{
    db.resultData.get(globalState.displayResultId)
    .then((rd)=>{
        if(rd !== undefined){
          setResultData(rd);
          setMatchName(rd.baseData.macthName);
          setMacthDate(rd.baseData.macthDate);
          setPlayer1Name(rd.baseData.player1Name);
          setPlayer2Name(rd.baseData.player2Name);
        }
    });
  },[submitCount]);

  const handleClose = () => {
    onClose();
  };

  const matchNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setMatchName(event.target.value);
  };

  const dateChange = (newValue: Date | null) => {
    if(newValue !== null) setMacthDate(newValue);
  };

  const player1NameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1Name(event.target.value);
  };
  
  const player2NameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2Name(event.target.value);
  };  

  const submit = () => {
    let newResultData:ResultDataType = resultData;
    newResultData.baseData.macthName = macthName;
    newResultData.baseData.macthDate = macthDate;
    newResultData.baseData.player1Name = player1Name;
    newResultData.baseData.player2Name = player2Name;
    db.resultData.update(globalState.displayResultId, newResultData)
    .then(()=>{
      //更新完了時にstateを更新し、ResultContensのuseEffectを使用したDB呼び出しを再レンダリングさせる
      setSubmitCount(submitCount + 1);
    });
    onClose();

  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>試合データ編集</DialogTitle>
      <Container style={{display:'flex', flexDirection:'column', gap:'1.5rem' ,margin:'1.0rem 0 1.5rem 0', padding:'0 1.5rem'}}>
        <TextField id="matchName" label="試合名" variant="outlined" size="small" value={macthName} onChange={matchNameChange} inputProps={{ maxLength: 20}}/>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja} >
            <MobileDatePicker
              value={macthDate}
              onChange={dateChange}
              renderInput={(params) => <TextField {...params} />}
              label="日付"
              //以下は日本語対応コード
              inputFormat='yyyy/MM/dd'
              toolbarTitle="日付選択"
              cancelText="キャンセル"
              okText="選択"
              toolbarFormat="yyyy/MM/dd"
              DialogProps={{ sx: styles.mobiledialogprops }}
            />
        </LocalizationProvider>        
        <TextField id="player1Name" label="プレイヤー1 名前" variant="outlined" size="small" value={player1Name} onChange={player1NameChange} inputProps={{ maxLength: 20}}/>
        <TextField id="player2Name" label="プレイヤー2 名前" variant="outlined" size="small" value={player2Name} onChange={player2NameChange} inputProps={{ maxLength: 20}}/>
        <Button style={{margin:'0 auto', width:"6rem"}} size="small" variant="outlined" onClick={submit}>変更</Button>
      </Container>
    </Dialog>
  );
}

const styles = {
  mobiledialogprops: {
    '.PrivatePickersToolbar-dateTitleContainer .MuiTypography-root': {
      fontSize: '1.5rem' // 選択した日付のフォントサイズを変更
    },
    'div[role=presentation]:first-of-type': {
      display: 'flex',
      '& .PrivatePickersFadeTransitionGroup-root:first-of-type': {
        order: 2
      },
      '& .PrivatePickersFadeTransitionGroup-root:nth-of-type(2)': {
        order: 1,
        '& > div::after': {
          content: '"年"'
        },
      },
      
      '& .MuiButtonBase-root': {
        order: 3
      }
    },
  }
}

type Props = {
  submitCount:number,
  setSubmitCount: React.Dispatch<React.SetStateAction<number>>,
}

export const ResultEditDialog: React.VFC<Props> = (props) => { 
// export default function ResultEditDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{display:'flex', justifyContent:'flex-end'}}>
      <Button variant="outlined" onClick={handleClickOpen} style={{marginTop:'0.5rem'}} startIcon={<EditIcon />}>
        編集
      </Button>
      <EditDialog
        open={open}
        onClose={handleClose}
        submitCount={props.submitCount}
        setSubmitCount={props.setSubmitCount}
      />
    </div>
  );
}
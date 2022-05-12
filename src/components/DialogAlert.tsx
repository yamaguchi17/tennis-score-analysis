import { useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
    callState:boolean,
    setCallState: React.Dispatch<React.SetStateAction<boolean>>,
    titleText:string,
    callback: () => void,
    children?: React.ReactNode,
}

export const DialogAlert: React.VFC<Props> = (props) => {

  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(props.callState){
        setOpen(true);
        props.setCallState(false);
    }
  },[props.callState]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleExec = () => {
    props.callback();
    setOpen(false);
  };


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            {props.titleText}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{whiteSpace: 'pre-line'}}>
            {props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{true?"いいえ":"Disagree"}</Button>
          <Button onClick={handleExec} autoFocus color="error">
            {true?"はい":"Agree"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
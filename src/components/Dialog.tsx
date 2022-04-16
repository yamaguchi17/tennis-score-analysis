import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DisplayTypeContext } from "./providers/DisplayTypeProvider";
import { DISPLAY_TYPES } from "./common/AppConst";
import { useContext } from "react";

export type DisplayResultDialogProps = {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    finishesFinalSet: boolean;
}

export const DisplayResultDialog :React.VFC<DisplayResultDialogProps> = (props) => {
    const { onClose, selectedValue, open, finishesFinalSet } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={finishesFinalSet? ()=>{} : handleClose} open={open}>
            {/* <DialogTitle>Set backup account</DialogTitle> */}
            <List sx={{ width: "15rem" }}>
                {!finishesFinalSet &&
                <ListItem button onClick={() => handleListItemClick("Next")} key="Next">
                    <ListItemIcon>
                        <ArrowCircleRightIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Next Set" />
                </ListItem>
                }
                <ListItem autoFocus button onClick={() => handleListItemClick('Result')} key="Result">
                    <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Result" />
                </ListItem>
            </List>
        </Dialog>
    );
}

// type Props = {
//     callesOpen: boolean
// }

// export const DisplayResultDialoga: React.VFC<Props> = (props) => {

//     const [displayType, setDisplayType] = useContext(DisplayTypeContext);

//     const [open, setOpen] = React.useState(true);
//     const [selectedValue, setSelectedValue] = React.useState("");

//     const handleClickOpen = () => {
//         setOpen(true);
//     };


//     const handleClose = (value: string) => {
//         setOpen(false);
//         setSelectedValue(value);
//         if (value === "Result") setDisplayType(DISPLAY_TYPES.RESULT);
//     };

//     return (
//         <div>
//             <DisplayResultDialog
//                 selectedValue={selectedValue}
//                 open={open}
//                 onClose={handleClose}
//             />
//         </div>
//     );
// }

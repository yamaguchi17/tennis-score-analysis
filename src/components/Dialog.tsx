import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

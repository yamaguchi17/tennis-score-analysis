import { useContext } from "react";
import { DisplayTypeContext } from "./providers/DisplayTypeProvider";
import { AppConst } from "./common/AppConst";
import styled from '@emotion/styled'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';

export const Main = () => {

    //const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);
    const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);

    const newGameClick = () => {
      setDisplayType(AppConst.DISPLAY_TYPES.RECORD);
    };

    return (
        <>
            <Container maxWidth="sm">
                <NewGameBox sx={{ bgcolor: '#cfe8fc', height: '10em' }}>
                    <NewGameButton onClick={newGameClick} variant="contained">New Game</NewGameButton>
                </NewGameBox>
            </Container>
        </>

    );
}

const NewGameBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
const NewGameButton = styled(Button)({
    display: 'block',
    margin: '0 auto'
});
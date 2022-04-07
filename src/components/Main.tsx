import { useContext } from "react";
import { DisplayTypeContext } from "./providers/DisplayTypeProvider";
import { RuleSettings } from "../components/RuleSettings"
import { DISPLAY_TYPES } from "./common/AppConst";
import styled from '@emotion/styled'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';

export const Main = () => {

    const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);

    const newGameClick = () => {
      setDisplayType(DISPLAY_TYPES.RECORD);
    };

    return (
        <>
            <Container maxWidth="sm">
                <NewGameBox sx={{ bgcolor: 'hsl(209, 78%, 95%)', height: '6em' }}>
                    <NewGameButton onClick={newGameClick} variant="contained">New Game</NewGameButton>
                </NewGameBox>
            </Container>
            <RuleSettings />
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
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
            <SNewGameBox>
                    <SNewGameButton onClick={newGameClick} variant="contained">New Game</SNewGameButton>
            </SNewGameBox>
            <RuleSettings />
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
});
const SNewGameButton = styled(Button)({
    display: 'block',
    margin: '0 auto'
});
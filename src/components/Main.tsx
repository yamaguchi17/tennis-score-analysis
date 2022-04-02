import { useContext } from "react";
import { DisplayTypeContext } from "./providers/DisplayTypeProvider";
import { RuleSettingsContext } from "../components/providers/RuleSettingsProvider";
import { RuleSettings } from "../components/RuleSettings"
import { DISPLAY_TYPES } from "./common/AppConst";
import styled from '@emotion/styled'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';

export const Main = () => {

    const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);
    const [ ruleSettings, setRuleSettings ] = useContext(RuleSettingsContext);

    const newGameClick = () => {
      setDisplayType(DISPLAY_TYPES.RECORD);
    };

    return (
        <>
            <Container maxWidth="sm">
                <NewGameBox sx={{ bgcolor: '#cfe8fc', height: '10em' }}>
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
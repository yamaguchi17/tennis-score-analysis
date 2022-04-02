import { useState, useContext } from "react";
import { RuleSettingsContext } from "./providers/RuleSettingsProvider";
import { TIE_BREAK_MODE, DEUCE_MODE } from "./common/AppConst";
import styled from '@emotion/styled'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const RuleSettings = () => {

    const [ ruleSettings, setRuleSettings ] = useContext(RuleSettingsContext);

    const [ tieBreakMode, setTieBreakMode] = useState(ruleSettings.tieBreakMode);
    const [ deuceMode, setDeuceMode] = useState(ruleSettings.deuceMode);
    const [ numberOfGames, setNumberOfGames] = useState(ruleSettings.numberOfGames);
    const [ numberOfTieBreakPoint, setNumberOfTieBreakPoint] = useState(ruleSettings.numberOfTieBreakPoint);

    console.log(tieBreakMode);
    console.log(ruleSettings);

    //タイブレークモードボタン押下処理
    const tieBreakModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newItem: string | null,
    ) => {
        if (newItem !== null) {
            setTieBreakMode(newItem);
            const newRuleSettings = ruleSettings;
            newRuleSettings.tieBreakMode = newItem;
            setRuleSettings(newRuleSettings);
          }
    };

    //タイブレークモードボタン押下処理
    const deuceModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newItem: string | null,
    ) => {
        if (newItem !== null) {
            setDeuceMode(newItem);
            const newRuleSettings = ruleSettings;
            newRuleSettings.deuceMode = newItem;
            setRuleSettings(newRuleSettings);
          }
    };


    return (
        <Container maxWidth="sm">
            <p>Settings</p>
            <div><span>Tie Break Mode </span>
            <ToggleButtonGroup
                    color="primary"
                    size="small"
                    value={tieBreakMode}
                    exclusive
                    onChange={tieBreakModeChange}
                >
                    <CustomToggleButton value={TIE_BREAK_MODE.TIE_BREAK}>{TIE_BREAK_MODE.TIE_BREAK}</CustomToggleButton>
                    <CustomToggleButton value={TIE_BREAK_MODE.GET_FIRST}>{TIE_BREAK_MODE.GET_FIRST}</CustomToggleButton>
                    <CustomToggleButton value={TIE_BREAK_MODE.TWO_GAME_BEHIND}>{TIE_BREAK_MODE.TWO_GAME_BEHIND}</CustomToggleButton>
                </ToggleButtonGroup>
            </div>
            <p>Deuce Mode:{ruleSettings.deuceMode}</p>
            <p>Number of Games:{ruleSettings.numberOfGames}</p>
            <p>Number of Tie Break Point:{ruleSettings.numberOfTieBreakPoint}</p>
        </Container>
    );
}

//トグルボタンのCSSカスタマイズ
const CustomToggleButton = styled(ToggleButton)({
    //勝手に大文字になる設定を取り除く
    textTransform: 'none'
});
const NewGameBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
const NewGameButton = styled(Button)({
    display: 'block',
    margin: '0 auto'
});
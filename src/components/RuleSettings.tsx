import { useState, useContext } from "react";
import { RuleSettingsContext } from "./providers/RuleSettingsProvider";
import { TIE_BREAK_MODE, DEUCE_MODE } from "./common/AppConst";
import styled from '@emotion/styled'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SettingsIcon from '@mui/icons-material/Settings';

export const RuleSettings = () => {

    //ruleSettings Context
    const { ruleSettings, setRuleSettings } = useContext(RuleSettingsContext);

    //ruleSettings State
    const [ tieBreakMode, setTieBreakMode] = useState(ruleSettings.tieBreakMode);
    const [ deuceMode, setDeuceMode] = useState(ruleSettings.deuceMode);
    const [ numberOfGames, setNumberOfGames] = useState(ruleSettings.numberOfGames);
    const [ numberOfTieBreakPoint, setNumberOfTieBreakPoint] = useState(ruleSettings.numberOfTieBreakPoint);
    //const [ enabledTieBreak, setEnabledTieBreak] = useState(ruleSettings.enabledTieBreak);
    //const [ enabledSemiAdDeuce, setEnabledSemiAdDeuce] = useState(ruleSettings.enabledSemiAdDeuce);

    console.log(ruleSettings);

    //タイブレークモードボタン押下処理
    const tieBreakModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newItem: string
    ) => {
            setTieBreakMode(newItem);
            const newRuleSettings = ruleSettings;
            newRuleSettings.tieBreakMode = newItem;
            setRuleSettings(newRuleSettings);
    };

    //デュースモードボタン押下処理
    const deuceModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newItem: string
    ) => {
        setDeuceMode(newItem);
        const newRuleSettings = ruleSettings;
        newRuleSettings.deuceMode = newItem;
        // if(newItem === DEUCE_MODE.SEMI_AD) newRuleSettings.enabledSemiAdDeuce = true;
        setRuleSettings(newRuleSettings);
    };

    //ゲーム数セレクト処理
    const numberOfGamesChange = (event: SelectChangeEvent) => {
        const newItem = event.target.value;
        setNumberOfGames(newItem);
        const newRuleSettings = ruleSettings;
        newRuleSettings.numberOfGames = newItem;
        setRuleSettings(newRuleSettings);        
    };

    //タイブレークポイント数セレクト処理
    const numberOfTieBreakPointChange = (event: SelectChangeEvent) => {
        const newItem = event.target.value;
        setNumberOfTieBreakPoint(newItem);
        const newRuleSettings = ruleSettings;
        newRuleSettings.numberOfTieBreakPoint = newItem;
        setRuleSettings(newRuleSettings);           
    };     

    return (
        <Box sx={{ width: '22rem', display: 'flex', flexDirection: 'column' }}>
            <p style={{ display: 'inline-flex', alignItems: 'center', margin: '1.5em 0 0.5em -0.5em' }}><SettingsIcon color={"primary"} />Settings</p>
            <SSettingsInnerDiv>
                <SParagraph>Tie Break Mode</SParagraph>
                <ToggleButtonGroup
                    color="primary"
                    size="small"
                    value={tieBreakMode}
                    exclusive
                    onChange={tieBreakModeChange}
                >
                    <SToggleButton value={TIE_BREAK_MODE.TIE_BREAK}>{TIE_BREAK_MODE.TIE_BREAK}</SToggleButton>
                    <SToggleButton value={TIE_BREAK_MODE.GET_FIRST}>{TIE_BREAK_MODE.GET_FIRST}</SToggleButton>
                    <SToggleButton value={TIE_BREAK_MODE.TWO_GAME_BEHIND}>{TIE_BREAK_MODE.TWO_GAME_BEHIND}</SToggleButton>
                </ToggleButtonGroup>
            </SSettingsInnerDiv>
            <SSettingsInnerDiv>
                <SParagraph>Deuce Mode</SParagraph>
                <ToggleButtonGroup
                    color="primary"
                    size="small"
                    value={deuceMode}
                    exclusive
                    onChange={deuceModeChange}
                >
                    <SToggleButton value={DEUCE_MODE.DEUCE}>{DEUCE_MODE.DEUCE}</SToggleButton>
                    <SToggleButton value={DEUCE_MODE.NO_AD}>{DEUCE_MODE.NO_AD}</SToggleButton>
                    <SToggleButton value={DEUCE_MODE.SEMI_AD}>{DEUCE_MODE.SEMI_AD}</SToggleButton>
                </ToggleButtonGroup>
            </SSettingsInnerDiv>
            <SSettingsInnerDiv>
                <SParagraph>Number of Games</SParagraph>
                <SFormControl size="small">
                    <Select
                        id="numberOfGames"
                        value={numberOfGames}
                        onChange={numberOfGamesChange}
                    >
                        <MenuItem value={"1"}>1</MenuItem>
                        <MenuItem value={"2"}>2</MenuItem>
                        <MenuItem value={"3"}>3</MenuItem>
                        <MenuItem value={"4"}>4</MenuItem>
                        <MenuItem value={"5"}>5</MenuItem>
                        <MenuItem value={"6"}>6</MenuItem>
                        <MenuItem value={"7"}>7</MenuItem>
                        <MenuItem value={"8"}>8</MenuItem>
                        <MenuItem value={"9"}>9</MenuItem>
                        <MenuItem value={"10"}>10</MenuItem>
                        <MenuItem value={"11"}>11</MenuItem>
                        <MenuItem value={"12"}>12</MenuItem>
                    </Select>
                </SFormControl>
            </SSettingsInnerDiv>
            <SSettingsInnerDiv>
                <SParagraph>Number of Tie Break Point</SParagraph>
                <SFormControl size="small">
                    <Select
                        id="NumberOfTieBreakPoint"
                        value={numberOfTieBreakPoint}
                        onChange={numberOfTieBreakPointChange}
                    >
                        <MenuItem value={"1"}>1</MenuItem>
                        <MenuItem value={"2"}>2</MenuItem>
                        <MenuItem value={"3"}>3</MenuItem>
                        <MenuItem value={"4"}>4</MenuItem>
                        <MenuItem value={"5"}>5</MenuItem>
                        <MenuItem value={"6"}>6</MenuItem>
                        <MenuItem value={"7"}>7</MenuItem>
                        <MenuItem value={"8"}>8</MenuItem>
                        <MenuItem value={"9"}>9</MenuItem>
                        <MenuItem value={"10"}>10</MenuItem>
                    </Select>
                </SFormControl>
            </SSettingsInnerDiv>
        </Box>
    );
}

const SToggleButton = styled(ToggleButton)({
    //勝手に大文字になる設定を取り除く
    textTransform: 'none',
    width: "6.8rem",
    '&:last-child':{ width: '7.5rem'}
});

const SSettingsInnerDiv = styled.div`
    margin-bottom: 0.5rem;
`;

const SParagraph = styled.p`
    margin-bottom: 0.5rem;
`;

const SFormControl = styled(FormControl)({
    width: "5rem",
});


// const SSettingsInnerDiv = styled.div`
//     margin-bottom: 1em;
//     padding-left: 2em;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
// `;
// const NewGameBox = styled(Box)({
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
// });
// const NewGameButton = styled(Button)({
//     display: 'block',
//     margin: '0 auto'
// });
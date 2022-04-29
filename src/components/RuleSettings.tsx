import { useState, useLayoutEffect, useContext,  } from "react";
import { TIE_BREAK_MODE, DEUCE_MODE } from "../common/AppConst";
import { ruleSetType,globalRuleSetType, ruleSetDefaultDataGet } from "../common/AppTypes";
import { RuleSettingsContext } from "../providers/RuleSettingsProvider";
import { db } from "../common/db";
import styled from '@emotion/styled'
import Box from "@mui/material/Box";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SettingsIcon from '@mui/icons-material/Settings';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

export const RuleSettings = () => {

    const { ruleSettings, setRuleSettings } = useContext(RuleSettingsContext);

    //stateのデフォルト値を取得
    const ruleSetDefaultData:globalRuleSetType = ruleSetDefaultDataGet();

    //ruleSettings State
    const [ tieBreakMode, setTieBreakMode] = useState(ruleSettings.tieBreakMode);
    const [ deuceMode, setDeuceMode] = useState(ruleSettings.deuceMode);
    const [ numberOfGames, setNumberOfGames] = useState(ruleSettings.numberOfGames);
    const [ numberOfTieBreakPoint, setNumberOfTieBreakPoint] = useState(ruleSettings.numberOfTieBreakPoint);
    const [ playerNameA, setPlayerNameA] = useState(ruleSettings.playerNameA);
    const [ playerNameB, setPlayerNameB] = useState(ruleSettings.playerNameB);
    const [ selectedServer, setSelectedServer] = useState(ruleSettings.selectedServer);    

    //ruleSettingsテーブルにレコードが存在しなければ、初期値レコードを追加。あればcontextに反映
    useLayoutEffect(() => {
        db.ruleSettings.get({userId: "0"})
            .then((rs)=>{
                if(rs === undefined){
                    db.ruleSettings.add(ruleSetDefaultData);
                }else {
                    const newState:ruleSetType = {
                        tieBreakMode: rs.tieBreakMode,
                        deuceMode: rs.deuceMode,
                        numberOfGames: rs.numberOfGames,
                        numberOfTieBreakPoint: rs.numberOfTieBreakPoint,
                        playerNameA : rs.playerNameA,
                        playerNameB : rs.playerNameB,
                        selectedServer: rs.selectedServer,
                    }
                    setRuleSettings(newState);

                    setTieBreakMode(rs.tieBreakMode);
                    setDeuceMode(rs.deuceMode);
                    setNumberOfGames(rs.numberOfGames);
                    setNumberOfTieBreakPoint(rs.numberOfTieBreakPoint);
                    setPlayerNameA(rs.playerNameA);
                    setPlayerNameB(rs.playerNameB);
                    setSelectedServer(rs.selectedServer);
                }
            })
            .catch((error)=>{
                console.error("error" + error);
            });
        }, []);

    //プレイヤー1の名前設定処理
    const playerNameAChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        db.ruleSettings.update("0", {playerNameA: event.target.value});
        setPlayerNameA(event.target.value);
        const newRuleSettings = ruleSettings;
        newRuleSettings.playerNameA = event.target.value;
        setRuleSettings(newRuleSettings);
    };

    //プレイヤー2の名前設定処理
    const playerNameBChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        db.ruleSettings.update("0", {playerNameB: event.target.value});
        setPlayerNameB(event.target.value);
        const newRuleSettings = ruleSettings;
        newRuleSettings.playerNameB = event.target.value;
        setRuleSettings(newRuleSettings);
    };

    //サーバー設定処理
    const selectedServerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        db.ruleSettings.update("0", {selectedServer: event.target.value});        
        setSelectedServer(event.target.value);
        const newRuleSettings = ruleSettings;
        newRuleSettings.selectedServer = event.target.value;
        setRuleSettings(newRuleSettings);
    };

    //タイブレークモードボタン押下処理
    const tieBreakModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newItem: string
    ) => {
            db.ruleSettings.update("0", {tieBreakMode: newItem});
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
        db.ruleSettings.update("0", {deuceMode: newItem});        
        setDeuceMode(newItem);
        const newRuleSettings = ruleSettings;
        newRuleSettings.deuceMode = newItem;
        setRuleSettings(newRuleSettings);
    };

    //ゲーム数セレクト処理
    const numberOfGamesChange = (event: SelectChangeEvent) => {
        db.ruleSettings.update("0", {numberOfGames: event.target.value});
        const newItem = event.target.value;
        setNumberOfGames(newItem);
        const newRuleSettings = ruleSettings;
        newRuleSettings.numberOfGames = newItem;
        setRuleSettings(newRuleSettings);
    };

    //タイブレークポイント数セレクト処理
    const numberOfTieBreakPointChange = (event: SelectChangeEvent) => {
        db.ruleSettings.update("0", {numberOfTieBreakPoint: event.target.value});
        const newItem = event.target.value;
        setNumberOfTieBreakPoint(newItem);
        const newRuleSettings = ruleSettings;
        newRuleSettings.numberOfTieBreakPoint = newItem;
        setRuleSettings(newRuleSettings);
    };  

    return (
        <Box sx={{ width: '22rem', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" component="h2" style={{ display: 'inline-flex', alignItems: 'center', margin: '1.5em 0 0.5em -0.5em' }}><SettingsIcon color={"primary"} />Settings</Typography>
            <SSettingsInnerDiv>
                <SParagraph>Player Name / Server</SParagraph>
                <div style={{display:"flex"}}>
                    <STextField id="playerNameA" label="Player1 Name" value={playerNameA} variant="outlined" onChange={playerNameAChange} size="small"  inputProps={{ maxLength: 20}}/>
                    <Radio
                        checked={selectedServer === 'player1'}
                        onChange={selectedServerChange}
                        value="player1"
                        name="select-sever"
                        inputProps={{ 'aria-label': 'Player1' }}
                    />
                </div>
                <div style={{display:"flex"}}>
                    <STextField id="playerNameB" label="Player2 Name" value={playerNameB} variant="outlined" onChange={playerNameBChange} size="small" inputProps={{ maxLength: 20}}/>
                    <Radio
                        checked={selectedServer === 'player2'}
                        onChange={selectedServerChange}
                        value="player2"
                        name="select-sever"
                        inputProps={{ 'aria-label': 'Player2' }}
                    />                        
                </div>
            </SSettingsInnerDiv>
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
                        <MenuItem value={"11"}>11</MenuItem>
                        <MenuItem value={"12"}>12</MenuItem>
                        <MenuItem value={"13"}>13</MenuItem>
                        <MenuItem value={"14"}>14</MenuItem>
                        <MenuItem value={"15"}>15</MenuItem>
                    </Select>
                </SFormControl>
            </SSettingsInnerDiv>
        </Box>
    );
}

const SSettingsInnerDiv = styled.div`
    margin-bottom: 0.5rem;
`;

const STextField = styled(TextField)({
    margin: '1rem 0 0 0'
});

const SToggleButton = styled(ToggleButton)({
    //勝手に大文字になる設定を取り除く
    textTransform: 'none',
    width: "6.8rem",
    '&:last-child':{ width: '7.5rem'}
});

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
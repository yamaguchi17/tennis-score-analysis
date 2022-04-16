import { useState,useEffect } from "react";
import { useContext } from "react";
import { RuleSettingsContext } from "./providers/RuleSettingsProvider";
import { RuleSettings } from "../components/RuleSettings"
import { PointType, pointDefaultData } from "./common/AppTypes";
import { useToggleBtnAction } from "../fooks/useToggleBtnAction";
import { PointSet } from "./PointSet";
import styled from '@emotion/styled'
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Container from "@mui/material/Container";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircOutlineleIcon from '@mui/icons-material/RemoveCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp';
import TextField from '@mui/material/TextField';
import {DisplayResultDialog} from "./Dialog";
import { DisplayTypeContext } from "./providers/DisplayTypeProvider";
import { DISPLAY_TYPES } from "./common/AppConst";


//全ポイントの内容を保持する変数
let pointArray:PointType[] = pointDefaultData();

export const Record = () => {

    //現在のpointIDstate
    const [currentPointID, setPointID] = useState(0);

    //ルール設定の読み込み
    const { ruleSettings, setRuleSettings } = useContext(RuleSettingsContext);
    //const [ selectedServer, setSelectedServer] = useState(ruleSettings.selectedServer);
    //pointArray[0].point.serverSide = String(ruleSettings.selectedServer);
    useEffect(()=>{
        pointArray[0].point.serverSide = String(ruleSettings.selectedServer);
        console.log(pointArray[0].point.serverSide);
    },[ruleSettings]);

    //トグルボタンのstateとボタン押下処理
    const {
        pointGetSide,
        serveSelectItem,
        serveCourceSelectItem,
        serveTypeSelectItem,
        pointCategorySelectItem,
        shotTypeSelectItem,
        shotSpinTypeSelectItem,
        shotDetailSelectItem,
        shotDetailCourceSelectItem,
        canMovePoint,
        rallyCountItem,
        pointGetSideChange,
        serveChange,
        serveCourceChange,
        serveTypeChange,
        pointCategoryChange,
        shotTypeChange,
        shotSpinTypeChange,
        shotDetailChange,
        shotDetailCourceChange,
        pointMoveSet,
        setCanMovePoint,
        rallyCountAdd,
        rallyCountSubtract,
     } = useToggleBtnAction(pointArray[currentPointID]);    

    //デバッグ用　point配列の表示
    console.log(JSON.stringify(pointArray));

    //ダイアログ
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [finishesFinalSet, setFinishesFinalSet] = useState(false);
    const [displayType, setDisplayType] = useContext(DisplayTypeContext);
    const dialogClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
        if (value === "Result") setDisplayType(DISPLAY_TYPES.RESULT);
    };

    //+ボタン
    const onClickPointIDAdd = () => {
        //次のpointIDを指定
        const nextPointID = currentPointID + 1;

        //pointArrayの次の要素が空のため追加する
        if ( nextPointID > pointArray.length -1 ) {
            const nextPoint:PointType["point"] = PointSet(pointArray[currentPointID].point, String(pointArray[currentPointID].pointGetSide), ruleSettings);
            const nextPointArrayElement:PointType = { pointID:nextPointID, point:nextPoint };
            pointArray.push(nextPointArrayElement);
        };

        //セット終了時にはResult画面に遷移するか確認するダイアログを表示
        const setCountDifference:number = pointArray[nextPointID].point.setCountA.length - pointArray[currentPointID].point.setCountA.length;
        pointArray[nextPointID].point.setCountA.length === 5 ? setFinishesFinalSet(true): setFinishesFinalSet(false);
        setCountDifference > 0 ? setOpen(true) : setOpen(false);

        //各ボタンstateをポイントIDに紐づく値に更新
        pointMoveSet(pointArray[nextPointID]);

        //pointIDStateを更新
        setPointID(nextPointID);
        
        //次へボタンの制御　ポイント取得サイドを選択状態でなければ移行できない
        pointArray[nextPointID].pointGetSide == null ? setCanMovePoint(false) : setCanMovePoint(true);
    };

    //-ボタン
    const onClickPointIDSubtract = () => {
        if (currentPointID > 0 ) {
            pointArray.pop();
            const prevPointID = currentPointID - 1;
            pointMoveSet(pointArray[prevPointID]);
            setPointID(prevPointID);
            pointArray[prevPointID].pointGetSide == null ? setCanMovePoint(false) : setCanMovePoint(true);
        }
    };

    //リセットボタン
    const onClickPointIDZero = () => {
        setPointID(0);
        pointArray = [{
            pointID: 0,
            point: {
                pointCountA: 0,
                pointCountB: 0,
                gameCountA: 0,
                gameCountB: 0,
                setCountA: [],
                setCountB: [],
                enabledTieBreak: false,
                deuceCountInGame: 0,
                serverSide: String(ruleSettings.selectedServer)
            }
        }];
    };

    // const [colorBtnItem, setColorBtnItem] = useState(true);
    // const colorChenge = (item:string) => {
    //     setPointGetSideChange(item);
    // };
    // console.log("レンダリングRecord");
    return (
        <>
            <DisplayResultDialog selectedValue={selectedValue} open={open} onClose={dialogClose} finishesFinalSet={finishesFinalSet} />
            {/* <DisplayResultDialog callesOpen={showsDialog}/> */}
            <RuleSettings />
            <SOuterArea>
                {/* <Button variant="contained" color={colorBtnItem?"inherit":"secondary"} onClick={() => colorChenge("sideA")}>カラーテスト</Button>
                <Button variant="contained" color={colorBtnItem?"inherit":"secondary"} onClick={() => colorChenge("sideB")}>カラーテスト</Button> */}
                {/* <p>pointID:{currentPointID}</p>
                <Box>
                    <IconButton aria-label="Subtract" onClick={onClickPointIDSubtract} >
                        <RemoveCircOutlineleIcon color="action"/>
                    </IconButton>                
                    <IconButton aria-label="add" onClick={onClickPointIDAdd} disabled={!canMovePoint}>
                        <AddCircleOutlineIcon color={canMovePoint?"primary":"action"}/>
                    </IconButton>
                    <IconButton aria-label="add" onClick={onClickPointIDZero}>
                        <RestartAltIcon color="error"/>
                    </IconButton>
                </Box>
                <p>SCORE:
                    {pointArray[currentPointID].point?.pointCountA}-{pointArray[currentPointID].point?.pointCountB}
                    , {pointArray[currentPointID].point?.gameCountA}-{pointArray[currentPointID].point?.gameCountB}
                    , {pointArray[currentPointID].point?.setCountA.map((value,index)=>{
                        return String(value) + "-" + String(pointArray[currentPointID].point?.setCountB[index]) + ", ";
                    })}
                </p> */}

                {/* {, {pointArray[currentPointID].point?.setCountA}-{pointArray[currentPointID].point?.setCountB}} */}

                {/* {pointArray.map((value) => {
                    return <p key={"pointRecord"+value.pointID}>{ Object.entries(value).map( (val)=> val + ", ")}</p>
                })} */}
                {/* <ToggleButtonGroup
                    color="primary"
                    value={pointGetSide}
                    exclusive
                    onChange={pointGetSideChange}
                >
                    <CustomToggleButton value="sideA">plyerA</CustomToggleButton>
                    <CustomToggleButton value="sideB">plyerB</CustomToggleButton>
                </ToggleButtonGroup>             */}
                <p>Serve</p>
                <ToggleButtonGroup
                    color="primary"
                    value={serveSelectItem}
                    exclusive
                    onChange={serveChange}
                >
                    <CustomToggleButton value="1st">1st</CustomToggleButton>
                    <CustomToggleButton value="2nd">2nd</CustomToggleButton>
                    <CustomToggleButton value="Double Fault">Double Fault</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Serve Cource</p>
                <ToggleButtonGroup
                    color="primary"
                    value={serveCourceSelectItem}
                    exclusive
                    onChange={serveCourceChange}
                    disabled={serveSelectItem === "" || serveSelectItem === null || serveSelectItem === "Double Fault" ? true : false}
                >
                    <CustomToggleButton value="Wide">Wide</CustomToggleButton>
                    <CustomToggleButton value="Body">Body</CustomToggleButton>
                    <CustomToggleButton value="Center">Center</CustomToggleButton>
                    <CustomToggleButton value="Fore">Fore</CustomToggleButton>
                    <CustomToggleButton value="Back">Back</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Serve Type</p>
                <ToggleButtonGroup
                    color="primary"
                    value={serveTypeSelectItem}
                    exclusive
                    onChange={serveTypeChange}
                    disabled={serveSelectItem === "" || serveSelectItem === null || serveSelectItem === "Double Fault" ? true : false}
                >
                    <CustomToggleButton value="Flat">Flat</CustomToggleButton>
                    <CustomToggleButton value="Slice">Slice</CustomToggleButton>
                    <CustomToggleButton value="Spin">Spin</CustomToggleButton>
                    <CustomToggleButton value="TopSlice">TopSlice</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Rally Count</p>
                <Box>
                    <IconButton aria-label="Subtract" onClick={rallyCountSubtract} >
                        <RemoveCircOutlineleIcon color="primary"/>
                    </IconButton>
                    {rallyCountItem}
                    {/* <TextField value={rallyCountItem} id="rallyCount" variant="standard" /> */}
                    {/* <input type="number" value={rallyCountItem}/> */}
                    <IconButton aria-label="add" onClick={rallyCountAdd} >
                        <AddCircleOutlineIcon color={"primary"}/>
                    </IconButton>
                </Box>
                <p>Point Category</p>
                <ToggleButtonGroup
                    color="primary"
                    value={pointCategorySelectItem}
                    exclusive
                    onChange={pointCategoryChange}
                >
                    <CustomToggleButton value="Winner">Winner</CustomToggleButton>
                    <CustomToggleButton value="NiceShot">Nice Shot</CustomToggleButton>
                    <CustomToggleButton value="Error">Error</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Shot Type</p>
                <ToggleButtonGroup
                    color="primary"
                    value={shotTypeSelectItem}
                    exclusive
                    onChange={shotTypeChange}
                    disabled={pointCategorySelectItem === "" || pointCategorySelectItem === null ? true : false}
                >
                    <CustomToggleButton value="Serve">Serve</CustomToggleButton>
                    <CustomToggleButton value="Return">Return</CustomToggleButton>
                    <CustomToggleButton value="Stroke">Stroke</CustomToggleButton>
                    <CustomToggleButton value="Volley">Volley</CustomToggleButton>
                    <CustomToggleButton value="Smash">Smash</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Shot Detail</p>
                <ToggleButtonGroup
                    color="primary"
                    value={shotDetailSelectItem}
                    exclusive
                    onChange={shotDetailChange}
                    disabled={pointCategorySelectItem === "" || pointCategorySelectItem === null ? true : false}
                >
                    <CustomToggleButton value="Fore">Fore</CustomToggleButton>
                    <CustomToggleButton value="Back">Back</CustomToggleButton>
                </ToggleButtonGroup>                
                <p>Shot Spin Type</p>
                <ToggleButtonGroup
                    color="primary"
                    value={shotSpinTypeSelectItem}
                    exclusive
                    onChange={shotSpinTypeChange}
                    disabled={pointCategorySelectItem === "" || pointCategorySelectItem === null ? true : false}
                >
                    <CustomToggleButton value="Spin">Spin</CustomToggleButton>
                    <CustomToggleButton value="Slice">Slice</CustomToggleButton>
                    <CustomToggleButton value="Flat">Flat</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Shot Course</p>
                <ToggleButtonGroup
                    color="primary"
                    value={shotDetailCourceSelectItem}
                    exclusive
                    onChange={shotDetailCourceChange}
                    disabled={pointCategorySelectItem === "" || pointCategorySelectItem === null ? true : false}
                >
                    <CustomToggleButton value="Cross">Cross</CustomToggleButton>
                    <CustomToggleButton value="Straight">Straight</CustomToggleButton>
                    <CustomToggleButton value="Center">Center</CustomToggleButton>
                    <CustomToggleButton value="Lob">Lob</CustomToggleButton>
                    <CustomToggleButton value="Drop">Drop</CustomToggleButton>
                </ToggleButtonGroup>
            </SOuterArea>
            <SPointDisplayOuterBase>
                <SPointDisplayInnerBase maxWidth="sm">
                    <SMovePointButtonArea>
                        <IconButton aria-label="prevPoint" onClick={onClickPointIDSubtract} sx={{ padding: 0 }}>
                            <ChevronLeftSharpIcon htmlColor='white' sx={{ fontSize: "3.5rem", margin: "-1.25rem" }} />
                        </IconButton>
                    </SMovePointButtonArea>
                    <SPointDisplayArea onClick={() => pointGetSideChange("sideA")} selectedPointGetSide={pointGetSide} >
                        <SPointDisplayName>{ruleSettings.playerNameA}</SPointDisplayName>
                        <SPointDisplay>{pointArray[currentPointID].point?.pointCountA}</SPointDisplay>
                        {pointArray[currentPointID].point.serverSide === 'player1' && <SPointDisplayServer></SPointDisplayServer>}
                    </SPointDisplayArea>
                    <SGameScoreArea>
                        {pointArray[currentPointID].point?.setCountA.map((value,index)=>{
                            return <SGameScoreEle key={"setCount"+index}>{String(value)}-{String(pointArray[currentPointID].point?.setCountB[index])}</SGameScoreEle>
                        })}
                        <SGameScoreEle key="gameCount">{pointArray[currentPointID].point?.gameCountA}-{pointArray[currentPointID].point?.gameCountB}</SGameScoreEle>
                    </SGameScoreArea>
                    <SPointDisplayArea onClick={() => pointGetSideChange("sideB")} selectedPointGetSide={pointGetSide}>
                        <SPointDisplayName>{ruleSettings.playerNameB}</SPointDisplayName>
                        <SPointDisplay>{pointArray[currentPointID].point?.pointCountB}</SPointDisplay>
                        {pointArray[currentPointID].point.serverSide === 'player2' && <SPointDisplayServer></SPointDisplayServer>}
                    </SPointDisplayArea>
                    <SMovePointButtonArea>
                        <IconButton aria-label="nextPoint" onClick={onClickPointIDAdd} disabled={!canMovePoint} sx={{ padding: 0 }}>
                            <ChevronRightSharpIcon  htmlColor={canMovePoint?"white":"primary"} sx={{ fontSize: "3.5rem", margin: "-1.25rem" }} />
                        </IconButton>
                    </SMovePointButtonArea>
                </SPointDisplayInnerBase>
            </SPointDisplayOuterBase>
            {/* {console.log("レンダリングRecord JSX")} */}
        </>
    );
}

const SOuterArea = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '24rem',
    maxWidth: '100%',
    marginBottom: '10rem',
    '& > *': { marginBottom: '0.5rem'},
    '& > p': { margin: '1rem 0 0.5rem 0'},
});

/*
    display: 'flex',
    flexDirection: 'column',
    width: '24rem',
    marginBottom: '9rem',
    '& > *': { marginBottom: '0.5rem'},
    '& > p': { margin: '1rem 0 0.5rem 0'},

 */

const CustomToggleButton = styled(ToggleButton)({
    //勝手に大文字になる設定を取り除く
    textTransform: 'none'
});

const SPointDisplayOuterBase = styled.div`
    box-sizing: border-box;
    height: 9rem;
    padding: 0.6rem 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: hsla(209, 78%, 46%, 0.90);
    color: white;
`;

const SPointDisplayInnerBase = styled(Container)({
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
});

const SMovePointButtonArea = styled.div`
    display: flex;
    align-items: center;
    width:2rem;
`;

type PointGetSideProps = {
    selectedPointGetSide?: string;
  };

const SPointDisplayArea = styled.div<PointGetSideProps>`
    position:relative;
    width: 5.5rem;
    border-radius: 0.6rem;
    border: 1px solid hsla(209, 78%, 46%, 0.9);
    box-shadow: 0px 2px 0 hsla(209, 78%, 40%, 0.9), 2px 3px 6px hsla(209, 78%, 40%, 0.9);
    user-select:none;
    transition: all 150ms linear;
    & > span:nth-of-type(2) {
        background-color:white;
    }
    &:hover {
        box-shadow: 0px 2px 0 hsla(209, 78%, 40%, 0.9), 3px 6px 6px hsla(209, 78%, 30%, 0.9);
        cursor: pointer;
        transition: all 250ms linear;
    };
    ${props => {
        if(props?.selectedPointGetSide === "sideA"){
            return (
                `&:nth-of-type(2){
                    font-weight: bold;
                    color: hsla(92, 78%, 46%, 0.9);
                    box-shadow: 0px 2px 0 hsla(209, 78%, 40%, 0.9), 4px 8px 6px hsla(209, 78%, 30%, 0.9);
                };
                &:nth-of-type(2) > span:nth-of-type(2) {
                    background-color:hsla(92, 78%, 46%, 0.9);
                }`
            );
        }
        else if(props?.selectedPointGetSide === "sideB"){
            return (
                `&:nth-of-type(4){
                    font-weight: bold;
                    color: hsla(92, 78%, 46%, 0.9);
                    box-shadow: 0px 2px 0 hsla(209, 78%, 40%, 0.9), 4px 8px 6px hsla(209, 78%, 30%, 0.9);
                };
                &&:nth-of-type(4) > span:nth-of-type(2) {
                    background-color:hsla(92, 78%, 46%, 0.9);
                }`
            );
        }
        else if(props?.selectedPointGetSide === ""){
            return (
                `&:nth-of-type(2),&:nth-of-type(4){
                    font-weight: normal;
                    color: white;
                };
                & > span:nth-of-type(2) {
                    background-color:white;
                }`
            );
        }
    }}
`;

const SPointDisplayName = styled.p`
    text-align: center;
    width: 100%;
    height: 3.75rem;
    margin: 0;
    padding: 0.5em 0.0em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const SPointDisplay = styled.span`
    display: inline-block;
    width: 100%;
    height: 3.75rem;
    line-height: 3rem;
    text-align: center;
    font-size: 2em;
`;

const SPointDisplayServer = styled.span`
    position: absolute;    
    display: inline-block;
    border-radius: 50%;
    width: 0.7rem;
    height: 0.7rem;
    left: 0.5rem;
    top: 64%;
`;

const SGameScoreArea = styled.div`
    width: 2rem;
    margin: 0 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const SGameScoreEle = styled.li`
    display: block;
    text-align: center;
    color: hsl(0,0%,80%);
    &:last-child { color: white; };
`;


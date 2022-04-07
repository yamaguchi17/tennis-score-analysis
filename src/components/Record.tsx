import { useState } from "react";
import { useContext } from "react";
import { RuleSettingsContext } from "./providers/RuleSettingsProvider";
import { PointType, ruleSetType } from "./common/AppTypes";
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
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

//全ポイントの内容を保持する変数
let pointArray:PointType[] = [{
    pointID:0,
    point:{
        pointCountA:0,
        pointCountB:0,
        gameCountA:0,
        gameCountB:0,
        setCountA:[],
        setCountB:[],
        enabledTieBreak:false,
        deuceCountInGame:0
    }
}];

export const Record = () => {

    //ルール設定の読み込み
    const { ruleSettings, setRuleSettings } = useContext(RuleSettingsContext);

    //現在のpointIDstate
    const [currentPointID, setPointID] = useState(0);

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
        setCanMovePoint
     } = useToggleBtnAction(pointArray[currentPointID]);    

    //デバッグ用　point配列の表示
    console.log(JSON.stringify(pointArray));

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
                deuceCountInGame: 0
            }
        }];
    };

    return (
        <>
            <Container maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '120px',
                    '& > *': { m: 1},
                    '& > p': { mt: 2},
                }}
            >
                <p>pointID:{currentPointID}</p>
                <Box>
                    <IconButton aria-label="Subtract" onClick={onClickPointIDSubtract} >
                        <RemoveCircleIcon color="error"/>
                    </IconButton>                
                    <IconButton aria-label="add" onClick={onClickPointIDAdd} disabled={!canMovePoint}>
                        <AddCircleIcon color={canMovePoint?"primary":"action"}/>
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
                </p>

                {/* {, {pointArray[currentPointID].point?.setCountA}-{pointArray[currentPointID].point?.setCountB}} */}

                {/* {pointArray.map((value) => {
                    return <p key={"pointRecord"+value.pointID}>{ Object.entries(value).map( (val)=> val + ", ")}</p>
                })} */}
                <ToggleButtonGroup
                    color="primary"
                    value={pointGetSide}
                    exclusive
                    onChange={pointGetSideChange}
                >
                    <CustomToggleButton value="sideA">plyerA</CustomToggleButton>
                    <CustomToggleButton value="sideB">plyerB</CustomToggleButton>
                </ToggleButtonGroup>            
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
                >
                    <CustomToggleButton value="Flat">Flat</CustomToggleButton>
                    <CustomToggleButton value="Slice">Slice</CustomToggleButton>
                    <CustomToggleButton value="Spin">Spin</CustomToggleButton>
                    <CustomToggleButton value="TopSlice">TopSlice</CustomToggleButton>
                </ToggleButtonGroup>
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
                >
                    <CustomToggleButton value="Serve">Serve</CustomToggleButton>
                    <CustomToggleButton value="Return">Return</CustomToggleButton>
                    <CustomToggleButton value="Stroke">Stroke</CustomToggleButton>
                    <CustomToggleButton value="Volley">Volley</CustomToggleButton>
                    <CustomToggleButton value="Smash">Smash</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Shot Spin Type</p>
                <ToggleButtonGroup
                    color="primary"
                    value={shotSpinTypeSelectItem}
                    exclusive
                    onChange={shotSpinTypeChange}
                >
                    <CustomToggleButton value="Spin">Spin</CustomToggleButton>
                    <CustomToggleButton value="Slice">Slice</CustomToggleButton>
                    <CustomToggleButton value="Flat">Flat</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Shot Detail</p>
                <ToggleButtonGroup
                    color="primary"
                    value={shotDetailSelectItem}
                    exclusive
                    onChange={shotDetailChange}
                >
                    <CustomToggleButton value="Fore">Fore</CustomToggleButton>
                    <CustomToggleButton value="Back">Back</CustomToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    color="primary"
                    value={shotDetailCourceSelectItem}
                    exclusive
                    onChange={shotDetailCourceChange}
                >
                    <CustomToggleButton value="Cross">Cross</CustomToggleButton>
                    <CustomToggleButton value="Straight">Straight</CustomToggleButton>
                    <CustomToggleButton value="Center">Center</CustomToggleButton>
                </ToggleButtonGroup>
            </Container>
            <SPointDisplayOuterArea>
                <SPointDisplayInnerArea maxWidth="sm">
                    <div style={{display:'flex', alignItems: 'center'}}><IconButton aria-label="nextPoint" onClick={()=>{}} sx={{padding:0 }}><ArrowLeftIcon htmlColor='white' sx={{fontSize:"55px", margin:"-20px"}}/></IconButton></div>
                    <div style={{width:'90px', color:'hsla(92, 78%, 46%, 0.9)', fontWeight:'bold',}}><p style={{textAlign:'center',width:'100%', height:'60px', margin:0, padding:'0.5em 0.0em', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical',}}>ROGER FEDERER ROGER FEDERER</p><span style={{display:'inline-block', width:'100%', height:'60px', lineHeight:'45px',textAlign:'center', fontSize:'2em'}}>30</span></div>
                    <SGameScoreArea><SGameScoreEle>6-1</SGameScoreEle><SGameScoreEle>4-6</SGameScoreEle><SGameScoreEle>5-7</SGameScoreEle><SGameScoreEle>7-5</SGameScoreEle><SGameScoreEle>6-1</SGameScoreEle></SGameScoreArea>
                    <div style={{width:'90px'}}><p style={{textAlign:'center',width:'100%', height:'60px', margin:0, padding:'0.5em 0.0em', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical',}}>RAFAEL NADAL</p><span style={{display:'inline-block', width:'100%', height:'60px', lineHeight:'45px',textAlign:'center', fontSize:'2em'}}>30</span></div>
                    <div style={{display:'flex', alignItems: 'center'}}><IconButton aria-label="nextPoint" onClick={()=>{}} sx={{padding:0 }}><ArrowRightIcon htmlColor='white' sx={{fontSize:"55px", margin:"-20px"}}/></IconButton></div>
                </SPointDisplayInnerArea>
            </SPointDisplayOuterArea>
        </>
    );
}

//トグルボタンのCSSカスタマイズ
const CustomToggleButton = styled(ToggleButton)({
    //勝手に大文字になる設定を取り除く
    textTransform: 'none'
});

const SPointDisplayOuterArea = styled.div`
    box-sizing: border-box;
    height: 130px;
    padding-bottom: 10px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: hsla(209, 78%, 46%, 0.9);
    color: white;
`;

//background-color: hsla(209, 78%, 46%, 0.0);

const SPointDisplayInnerArea = styled(Container)({
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    borderRadius: 20,
    // '& > *': { marginLeft: '0.5em'},
});

const SGameScoreArea = styled.div`
    width: 2.0em;
    margin: 0 0.5em;
    overflow-y: auto;
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
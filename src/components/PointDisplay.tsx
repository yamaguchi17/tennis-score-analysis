import { useEffect, useState, useLayoutEffect } from "react";
import { usePointDisplayManage } from "./fooks/usePointDisplayManage";
import { PointType, pointDefaultData } from './common/AppTypes';
import styled from '@emotion/styled'
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp';
import { useContext } from "react";
import { PointSet } from "./PointSet";
import { usePointContentsSelect } from "./fooks/usePointContentsSelect";
import { DISPLAY_TYPES } from "./common/AppConst";
import { GlobalStateContext } from "./providers/GlobalStateProvider";
import { RuleSettingsContext } from "./providers/RuleSettingsProvider";
import { db } from "./common/db";
import { useLiveQuery } from "dexie-react-hooks";

export const PointDisplay = () => {
    //const [pSt, pAction] = usePointDisplayManage();
    //if(pSt.ruleSettings === undefined || point === undefined || pAction.pointGetSideChange === undefined) return null;
    //if(pSt.matchData === undefined) return null;
    
    

    const { globalState, setGlobalState } = useContext(GlobalStateContext);
    const { ruleSettings, setRuleSettings } = useContext(RuleSettingsContext);

    const matchData = useLiveQuery(() => db.matchData.get({id:globalState.recodingMatchId}),[]);

    const [ pointData, setPointData ] = useState<PointType>(pointDefaultData()[0]);
    
    //DBから読み込み
    //const globalState = useLiveQuery(() => db.globalState.get({userId:"0"}) ,[]);
    //const matchData = useLiveQuery(() => db.matchData.get({id:globalState?.recodingMatchId}) ,[]);
    //const ruleSettings = useLiveQuery(() => db.ruleSettings.get({userId:"0"}) ,[]);

    //pointMoveSetのため読み込み
    const [st, stAction] = usePointContentsSelect();
    
    //現在のpointのindexを扱うstate
    const [currentPointID, setPointID] = useState(0);
    
    //ポイント取得サイドボタン用state
    const [pointGetSide, setPointGetSide] = useState('');

    //次へボタンの制御state
    const [canMovePoint, setCanMovePoint] = useState<boolean>(false);
    
    //DB読み込み完了フラグ
    const [ isCompleted, setIsCompleted ]  = useState(false);

    //現在表示されるポイント内容
    //const [ point, setPoint ] = useState(pointDefaultData()[0].point);

    //DBからcurrentPointId,現在のポイント内容を取得
    useLayoutEffect(() => {
        setIsCompleted(false);
        db.matchData.get({ id: globalState.recodingMatchId })
        .then((md) => {
            if (md !== undefined) {
                setPointID(md.currentPointId);
                setPointData(md.data[md.currentPointId]);
            }
            setIsCompleted(true);
        })
        .catch((error) => {
            console.error("error" + error);
        })
    }, []);

    //DBから読み込まれるまで処理を止める
    if(!matchData || !isCompleted ) return null;    //matchData削除後修正


    //point Stateにコピー
    //setPoint(matchData.data[currentPointID].point);


    // let point = pointDefaultData()[0];
    // if(!matchData) point = matchData.data[currentPointID]

    // console.log(pSt.matchData?.data[pSt.currentPointID].point);
    // const point = pSt.matchData?.data[pSt.currentPointID].point;
    //const point = !pSt.matchData ? pSt.matchData?.data[pSt.currentPointID].point : pointDefault[0];
    //if(pSt.ruleSettings === undefined || point === undefined || pAction.pointGetSideChange === undefined) return null;


    //ダイアログ
    // const [open, setOpen] = useState(false);
    // const [selectedValue, setSelectedValue] = useState("");
    // const [finishesFinalSet, setFinishesFinalSet] = useState(false);
    // const [displayType, setDisplayType] = useContext(DisplayTypeContext);
    // const dialogClose = (value: string) => {
    //     setOpen(false);
    //     setSelectedValue(value);
    //     if (value === "Result") setDisplayType(DISPLAY_TYPES.RESULT);
    // }; 

    //+ボタン
    const onClickPointIDAdd = async () => {
        //次のpointIDを指定
        const nextPointID = currentPointID + 1;

        //ポイント計算を行い次の要素を用意する
        const nextPoint:PointType["point"] = PointSet(pointData.point, pointData.pointGetSide, ruleSettings);
        const nextPointElement:PointType = { ...pointDefaultData()[0], pointID:nextPointID, point:nextPoint };

        //現在のDB情報を取得し、上記処理で作成した要素を追加し更新する
        await db.matchData.get({ id: globalState.recodingMatchId })
        .then((md) => {
            if (md !== undefined) {
                const newMatchData = JSON.parse(JSON.stringify(md));
                newMatchData.data.push(nextPointElement);
                db.matchData.update(globalState.recodingMatchId,{currentPointId:nextPointID, data:newMatchData.data});
                setPointData(md.data[nextPointID]);
                setPointID(nextPointID);
            }
        })
        .catch((error) => {
            console.error("error" + error);
        })

        //セット終了時にはResult画面に遷移するか確認するダイアログを表示
        // matchData.data[nextPointID].point.setCountA.length === 5 ? setFinishesFinalSet(true): setFinishesFinalSet(false);
        // const setCountDifference:number = matchData.data[nextPointID].point.setCountA.length - matchData.data[currentPointID].point.setCountA.length;
        // setCountDifference > 0 ? setOpen(true) : setOpen(false);

        //各ボタンstateをポイントIDに紐づく値に更新
        stAction.pointMoveSet !== undefined && stAction.pointMoveSet(pointData);
        setPointGetSide(pointData.pointGetSide);
        
        //次へボタンの制御　ポイント取得サイドを選択状態でなければ移行できない
        pointData.pointGetSide == null ? setCanMovePoint(false) : setCanMovePoint(true);
    };

    //-ボタン
    const onClickPointIDSubtract = async () => {
        if (currentPointID > 0 && matchData !== undefined) {
            //1つ前のpointIDを指定
            const prevPointID = currentPointID - 1;

            //MatchDataテーブルのdata要素を1つ削除し更新
            await db.matchData.get({ id: globalState.recodingMatchId })
            .then((md) => {
                if (md !== undefined) {
                    const newMatchData = JSON.parse(JSON.stringify(md));
                    newMatchData.data.pop();
                    db.matchData.update(globalState.recodingMatchId,{currentPointId:prevPointID, data:newMatchData.data});
                    setPointData(md.data[prevPointID]);
                    setPointID(prevPointID);
                }
            })
            .catch((error) => {
                console.error("error" + error);
            })

            //内容を反映する
            stAction.pointMoveSet !== undefined && stAction.pointMoveSet(pointData);
            setPointGetSide(pointData.pointGetSide);
            pointData.pointGetSide == null ? setCanMovePoint(false) : setCanMovePoint(true);
        }
    };

    //リセットボタン
    const onClickPointIDZero = () => {
        // setPointID(0);
        // pointArray = [{
        //     pointID: 0,
        //     point: {
        //         pointCountA: 0,
        //         pointCountB: 0,
        //         gameCountA: 0,
        //         gameCountB: 0,
        //         setCountA: [],
        //         setCountB: [],
        //         enabledTieBreak: false,
        //         deuceCountInGame: 0,
        //         serverSide: String(ruleSettings.selectedServer)
        //     }
        // }];
    };    

    //ポイント取得サイドボタンボタン押下処理
    const pointGetSideChange = (
        newPointGetSide: string
    ) => {
        if(newPointGetSide === pointGetSide) newPointGetSide = "";
        setPointGetSide(newPointGetSide);
        const newMatchData = JSON.parse(JSON.stringify(matchData));
        if(newMatchData !== undefined) newMatchData.data[Number(matchData?.currentPointId)].pointGetSide = newPointGetSide;
        db.matchData.update(Number(globalState?.recodingMatchId),{data:newMatchData.data});           
        //次へボタンの制御　ポイント取得サイドが選択状態ならば移行可能
        (newPointGetSide === null || newPointGetSide === "") ? setCanMovePoint(false) : setCanMovePoint(true);
    };


    return (
        <SPointDisplayOuterBase>
            <SPointDisplayInnerBase maxWidth="sm">
                <SMovePointButtonArea>
                    <IconButton aria-label="prevPoint" onClick={onClickPointIDSubtract} sx={{ padding: 0 }}>
                        <ChevronLeftSharpIcon htmlColor='white' sx={{ fontSize: "3.5rem", margin: "-1.25rem" }} />
                    </IconButton>
                </SMovePointButtonArea>
                <SPointDisplayArea onClick={() => pointGetSideChange("sideA")} selectedPointGetSide={pointGetSide} >
                    <SPointDisplayName>{ruleSettings.playerNameA}</SPointDisplayName>
                    <SPointDisplay>{matchData.data[currentPointID].point.pointCountA}</SPointDisplay>
                    {matchData.data[currentPointID].point.serverSide === 'player1' && <SPointDisplayServer></SPointDisplayServer>}
                </SPointDisplayArea>
                <SGameScoreArea>
                    {matchData.data[currentPointID].point.setCountA.map((value,index)=>{
                        return <SGameScoreEle key={"setCount"+index}>{String(value)}-{String(matchData.data[currentPointID].point.setCountB[index])}</SGameScoreEle>
                    })}
                    <SGameScoreEle key="gameCount">{matchData.data[currentPointID].point.gameCountA}-{matchData.data[currentPointID].point.gameCountB}</SGameScoreEle>
                </SGameScoreArea>
                <SPointDisplayArea onClick={() => pointGetSideChange("sideB")} selectedPointGetSide={pointGetSide}>
                    <SPointDisplayName>{ruleSettings.playerNameB}</SPointDisplayName>
                    <SPointDisplay>{matchData.data[currentPointID].point.pointCountB}</SPointDisplay>
                    {matchData.data[currentPointID].point.serverSide === 'player2' && <SPointDisplayServer></SPointDisplayServer>}
                </SPointDisplayArea>
                <SMovePointButtonArea>
                    <IconButton aria-label="nextPoint" onClick={onClickPointIDAdd} disabled={!canMovePoint} sx={{ padding: 0 }}>
                        <ChevronRightSharpIcon  htmlColor={canMovePoint?"white":"primary"} sx={{ fontSize: "3.5rem", margin: "-1.25rem" }} />
                    </IconButton>
                </SMovePointButtonArea>
            </SPointDisplayInnerBase>
        </SPointDisplayOuterBase>
    );
}

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


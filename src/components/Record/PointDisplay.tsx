import { useState, useLayoutEffect, useContext } from "react";
import { PointType, pointDefaultData } from '../../common/AppTypes';
import { DISPLAY_TYPES } from "../../common/AppConst";
import { matchDataDBupdate } from '../../common/AppFunctions';
import { db } from "../../common/db";
import { PointSet } from "./PointSet";
import { DisplayResultDialog } from "./Dialog";
import { GlobalStateContext } from "../../providers/GlobalStateProvider";
import { RuleSettingsContext } from "../../providers/RuleSettingsProvider";
import { DisplayTypeContext } from "../../providers/DisplayTypeProvider";
import styled from '@emotion/styled'
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp';

type Props = {
    currentPointID: number,
    setPointID: React.Dispatch<React.SetStateAction<number>>
}

export const PointDisplay: React.VFC<Props> = ({currentPointID, setPointID}) => {
  
    //context
    const { globalState, setGlobalState } = useContext(GlobalStateContext);
    const { ruleSettings, setRuleSettings } = useContext(RuleSettingsContext);

    //現在のポイント内容を保有
    const [ pointData, setPointData ] = useState<PointType>(pointDefaultData()[0]);
    //ポイント取得サイドボタン用state
    const [pointGetSide, setPointGetSide] = useState('');
    //次へボタンの制御state
    const [canMovePoint, setCanMovePoint] = useState<boolean>(false);
    //DB読み込み完了フラグ
    const [ isCompleted, setIsCompleted ]  = useState(false);

    //ダイアログ関連
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [finishesFinalSet, setFinishesFinalSet] = useState(false);
    const [displayType, setDisplayType] = useContext(DisplayTypeContext);
    const dialogClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
        if (value === "Result") setDisplayType(DISPLAY_TYPES.RESULT_CALC);
    };

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
    if(!isCompleted ) return null;

    //+ボタン
    const onClickPointIDAdd = async () => {
        //次のpointIDを指定
        const nextPointID = currentPointID + 1;

        //ポイント計算を行い次の要素を用意する
        const nextPoint:PointType["point"] = PointSet(pointData.point, pointGetSide, ruleSettings);
        const nextPointElement:PointType = { ...pointDefaultData()[0], pointID:nextPointID, point:nextPoint };
        
        //現在のDB情報を取得し、上記処理で作成した要素を追加し更新する
        await db.matchData.get({ id: globalState.recodingMatchId })
        .then((md) => {
            if (md !== undefined) {
                const newMatchData = JSON.parse(JSON.stringify(md));
                newMatchData.data.push(nextPointElement);
                db.matchData.update(globalState.recodingMatchId,{currentPointId:nextPointID, data:newMatchData.data});
            }
        })
        .catch((error) => {
            console.error("error" + error);
        })

        //ダイアログ表示判定　セット終了時にはResult画面に遷移するか確認
        nextPointElement.point.setCountA.length >= 5 ? setFinishesFinalSet(true): setFinishesFinalSet(false);
        const setCountDifference:number = nextPointElement.point.setCountA.length - pointData.point.setCountA.length;
        setCountDifference > 0 ? setOpen(true) : setOpen(false);

        //stateへ反映
        setPointData(nextPointElement);
        setPointID(nextPointID);
        setPointGetSide(nextPointElement.pointGetSide);

        //次へボタンの制御　ポイント取得サイドを選択状態でなければ移行できない
        (nextPointElement.pointGetSide === null || nextPointElement.pointGetSide === "") ? setCanMovePoint(false) : setCanMovePoint(true);

        //スクロール位置をトップへ戻す
        window.scrollTo(0, 0);
    };

    //-ボタン
    const onClickPointIDSubtract = async () => {
        if (currentPointID > 0) {
            //1つ前のpointIDを指定
            const prevPointID = currentPointID - 1;

            //MatchDataテーブルのdata要素を1つ削除し更新
            await db.matchData.get({ id: globalState.recodingMatchId })
            .then((md) => {
                if (md !== undefined) {
                    //DB更新
                    const newMatchData = JSON.parse(JSON.stringify(md));
                    newMatchData.data.pop();
                    db.matchData.update(globalState.recodingMatchId,{currentPointId:prevPointID, data:newMatchData.data});
                    //内容を反映する
                    setPointData(md.data[prevPointID]);
                    //stAction.pointMoveSet !== undefined && stAction.pointMoveSet(md.data[prevPointID]);
                    setPointGetSide(md.data[prevPointID].pointGetSide);
                    (md.data[prevPointID].pointGetSide === null || md.data[prevPointID].pointGetSide === "") ? setCanMovePoint(false) : setCanMovePoint(true);
                }
            })
            .catch((error) => {
                console.error("error" + error);
            })

            setPointID(prevPointID);
        }
    };

    //リセットボタン
    const onClickPointIDReset = () => {
        setPointID(0);
        setPointData(pointDefaultData()[0]);
        db.matchData.update(globalState.recodingMatchId,{currentPointId:0, data:pointDefaultData()[0]});
    };

    //ポイント取得サイドボタンボタン押下処理
    const pointGetSideChange = (
        newPointGetSide: string
    ) => {
        if(newPointGetSide === pointGetSide) newPointGetSide = "";
        setPointGetSide(newPointGetSide);
        matchDataDBupdate("pointGetSide",newPointGetSide,globalState.recodingMatchId);

        //次へボタンの制御　ポイント取得サイドが選択状態ならば移行可能
        (newPointGetSide === null || newPointGetSide === "") ? setCanMovePoint(false) : setCanMovePoint(true);
    };

    return (
        <>
        <SPointDisplayOuterBase>
            <SPointDisplayInnerBase maxWidth="sm">
                <SMovePointButtonArea>
                    <IconButton aria-label="prevPoint" onClick={onClickPointIDSubtract} sx={{ padding: 0 }}>
                        <ChevronLeftSharpIcon htmlColor='white' sx={{ fontSize: "3.5rem", margin: "-1.25rem" }} />
                    </IconButton>
                </SMovePointButtonArea>
                <SPointDisplayArea onClick={() => pointGetSideChange("sideA")} selectedPointGetSide={pointGetSide} >
                    <SPointDisplayName>{ruleSettings.playerNameA}</SPointDisplayName>
                    <SPointDisplay>{pointData.point.pointCountA}</SPointDisplay>
                    {pointData.point.serverSide === 'player1' && <SPointDisplayServer></SPointDisplayServer>}
                </SPointDisplayArea>
                <SGameScoreArea>
                    {pointData.point.setCountA.map((value,index)=>{
                        return <SGameScoreEle key={"setCount"+index}>{String(value)}-{String(pointData.point.setCountB[index])}</SGameScoreEle>
                    })}
                    <SGameScoreEle key="gameCount">{pointData.point.gameCountA}-{pointData.point.gameCountB}</SGameScoreEle>
                </SGameScoreArea>
                <SPointDisplayArea onClick={() => pointGetSideChange("sideB")} selectedPointGetSide={pointGetSide}>
                    <SPointDisplayName>{ruleSettings.playerNameB}</SPointDisplayName>
                    <SPointDisplay>{pointData.point.pointCountB}</SPointDisplay>
                    {pointData.point.serverSide === 'player2' && <SPointDisplayServer></SPointDisplayServer>}
                </SPointDisplayArea>
                <SMovePointButtonArea style={{justifyContent: 'flex-end'}}>
                    <IconButton aria-label="nextPoint" onClick={onClickPointIDAdd} disabled={!canMovePoint} sx={{ padding: 0}}>
                        <ChevronRightSharpIcon  htmlColor={canMovePoint?"white":"primary"} sx={{ fontSize: "3.5rem", margin: "-1.25rem" }} />
                    </IconButton>
                </SMovePointButtonArea>
            </SPointDisplayInnerBase>
        </SPointDisplayOuterBase>
        <DisplayResultDialog selectedValue={selectedValue} open={open} onClose={dialogClose} finishesFinalSet={finishesFinalSet} />
        </>
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


import { useState } from "react";
import { PointType } from "./common/AppTypes";
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

//全ポイントの内容を保持する変数宣言
let pointArray:PointType[] = [{
    pointID:0,
    point:{
        pointCountA:0,
        pointCountB:0,
        gameCountA:0,
        gameCountB:0,
        setCountA:[],
        setCountB:[],
    }
}];

export const Record = () => {

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
            const nextPoint:PointType["point"] = PointSet(pointArray[currentPointID].point, String(pointArray[currentPointID].pointGetSide));
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
                setCountB: []
            }
        }];
    };

    return (
        <>
            <Container maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
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
                    <CustomToggleButton value="sideA"><div><p>plyerA</p><p>sideA</p></div></CustomToggleButton>
                    <CustomToggleButton value="aaa" disabled><div><p>SCORE</p><p>xx-xx</p></div></CustomToggleButton>
                    <CustomToggleButton value="sideB"><div><p>plyerB</p><p>sideB</p></div></CustomToggleButton>
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

            {/* 汎用処理
            <p>Serve</p>
            <CToggleButtonGroup
                state={serveSelectItem}
                setState={setServeItem}
                elements={["1st","2nd","Double Fault"]}
            ></CToggleButtonGroup>
            <p>Serve Cource</p>
            <CToggleButtonGroup 
                state={serveCourceSelectItem} 
                setState={setServeCourceItem} 
                elements={["Wide","Body","Center", "Fore", "Back"]}
            ></CToggleButtonGroup>
            <p>Serve Type</p>
            <CToggleButtonGroup 
                state={serveTypeSelectItem} 
                setState={setServeTypeItem} 
                elements={["Flat","Slice","Spin", "TopSlice"]}
            ></CToggleButtonGroup>            
            <p>Point Category</p>
            <CToggleButtonGroup 
                state={pointCategorySelectItem} 
                setState={setPointCategoryItem} 
                elements={["Winner","Nice Shot","Error"]}
            ></CToggleButtonGroup>            
            <p>Shot Type</p>
            <CToggleButtonGroup 
                state={shotTypeSelectItem} 
                setState={setShotTypeItem} 
                elements={["Serve","Return","Stroke", "Volley", "Smash"]}
            ></CToggleButtonGroup>            
            <p>Shot Spin Type</p>
            <CToggleButtonGroup 
                state={shotSpinTypeSelectItem} 
                setState={setShotSpinTypeItem} 
                elements={["Spin","Slice","Flat"]}
            ></CToggleButtonGroup>            
            <p>Shot Detail</p>
            <CToggleButtonGroup 
                state={shotDetailSelectItem} 
                setState={setShotDetailItem} 
                elements={["Fore","Back"]}
            ></CToggleButtonGroup>
            <CToggleButtonGroup 
                state={shotDetailCourceSelectItem} 
                setState={setShotDetailCourceItem} 
                elements={["Cross","Straight","Center"]}
            ></CToggleButtonGroup>             */}
        </>
    );
}

//トグルボタンのCSSカスタマイズ
const CustomToggleButton = styled(ToggleButton)({
    //勝手に大文字になる設定を取り除く
    textTransform: 'none'
});



    // //汎用トグルボタングループ型定義
    // type CToggleButtonGroupType = {
    //     state: string;
    //     setState: any;
    //     elements: string[];
    // };

    // //汎用トグルボタングループ
    // const CToggleButtonGroup = (props: CToggleButtonGroupType) => {
    //     const { state, setState, elements } = props;
    //     console.log("汎用トグルボタングループ処理");
    //     return (
    //         <ToggleButtonGroup
    //             color="primary"
    //             value={state}
    //             exclusive
    //             onChange={ToggleOnChange(setState)}
    //         >
    //             {
    //                 elements.map((element) => {
    //                     return <CustomToggleButton value={element} aria-label={element} key={element}>{element}</CustomToggleButton>
    //                 })
    //             }
    //         </ToggleButtonGroup>
    //     );
    // };

    // //トグルボタン押下汎用処理
    // const ToggleOnChange = (setState:any) => {
    //     console.log("汎用ボタン処理");
    //     return (
    //         event: React.MouseEvent<HTMLElement>,
    //         newSelectItem: string,
    //     ) => {
    //         setState(newSelectItem);
    //     };
    // }
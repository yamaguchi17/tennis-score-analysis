import { ChangeEvent, useState, FC, useCallback, useContext } from "react";
import styled from '@emotion/styled'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Container} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

//pointを全て保持する配列を作成する
const objArr: { aaa:number, bbb:string }[] =  [ { aaa:0, bbb: "A" }, { aaa:1, bbb: "B" } ];

//point型定義
type PointType = {
    pointID: number;
    serve?: string;
    serveCource?: string;
    serveType?: string;
    pointCategory?: string;
    shotType?: string;
    shotSpinType?: string;
    shotDetail?: string;
    shotDetailCource?: string;
};

//let pointArray:PointType[] = [{pointID:0,serve:"1st",serveCource:"Wide"},{pointID:1,serve:"2nd",serveCource:"Center"}];
let pointArray:PointType[] = [{pointID:0}];


export const Record = () => {

    //point移動時に各種stateへの対象ポイントの選択をセット
    const pointMoveSet = (target:number) => {
        setServeItem(String(pointArray[target].serve));
        setServeCourceItem(String(pointArray[target].serveCource));
        setServeTypeItem(String(pointArray[target].serveType));
        setPointCategoryItem(String(pointArray[target].pointCategory));
        setShotTypeItem(String(pointArray[target].shotType));
        setShotSpinTypeItem(String(pointArray[target].shotSpinType));
        setShotDetailItem(String(pointArray[target].shotDetail));
        setShotDetailCourceItem(String(pointArray[target].shotDetailCource));
    };
    
    //出バック用　point配列の表示
    console.log(JSON.stringify(pointArray));

    //確認用
    const objArrClick = ():void => {
        objArr.push({aaa:2, bbb:"C"});
        objArr.map((value) => { console.log(value)});
    };

    //pointIDstate
    const [currentPointID, setPointID] = useState(0);

    //+ボタン
    const onClickPointIDAdd = () => {
        const nextPointID = currentPointID + 1;
        if ( nextPointID > pointArray.length -1 ) {
            pointArray.push({pointID:nextPointID});
        };
        //各ボタンstateをポイントIDに紐づく値に更新
        //setServeItem(typeof pointArray[nextPointID].serve !== "undefined" ? pointArray[nextPointID].serve : "");
        pointMoveSet(nextPointID);
        //pointIDStateを更新
        setPointID(nextPointID);
    };
    //-ボタン
    const onClickPointIDSubtract = () => {
        if (currentPointID > 0 ) {
            const prevPointID = currentPointID - 1;
            pointMoveSet(prevPointID);
            setPointID(prevPointID);
        }
    };
    const onClickPointIDZero = () => {
        setPointID(0);
        pointArray = [{pointID:0}];
    };

    //Serveボタン用state
    const [serveSelectItem, setServeItem] = useState('');
    //Serve Courseボタン用state
    const [serveCourceSelectItem, setServeCourceItem] = useState('');
    //Serve Typeボタン用state   
    const [serveTypeSelectItem, setServeTypeItem] = useState('');
    //Point Categoryボタン用state
    const [pointCategorySelectItem, setPointCategoryItem] = useState('');
    //Shot Typeボタン用state
    const [shotTypeSelectItem, setShotTypeItem] = useState('');
    //Shot Spin Typeボタン用state
    const [shotSpinTypeSelectItem, setShotSpinTypeItem] = useState('');
    //Shot Detailボタン用state
    const [shotDetailSelectItem, setShotDetailItem] = useState('');
    //Shot Detail Courceボタン用state
    const [shotDetailCourceSelectItem, setShotDetailCourceItem] = useState('');

    //Serveボタン押下処理
    const serveChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeSelectItem: string,
    ) => {
        setServeItem(newServeSelectItem);
        pointArray[currentPointID].serve = newServeSelectItem;
    };

    //Serve Courceボタン押下処理
    const serveCourceChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeCourceSelectItem: string,
    ) => {
        setServeCourceItem(newServeCourceSelectItem);
        pointArray[currentPointID].serveCource = newServeCourceSelectItem;
    };
    
    //Serve Typeボタン押下処理
    const serveTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeTypeSelectItem: string,
    ) => {
        setServeTypeItem(newServeTypeSelectItem);
        pointArray[currentPointID].serveType = newServeTypeSelectItem;
    };

    //Point Categoryボタン押下処理
    const pointCategoryChange = (
        event: React.MouseEvent<HTMLElement>,
        newPointCategorySelectItem: string,
    ) => {
        setPointCategoryItem(newPointCategorySelectItem);
        pointArray[currentPointID].pointCategory = newPointCategorySelectItem;
    };
    //Shot Typeボタン押下処理
    const shotTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotTypeSelectItem: string,
    ) => {
        setShotTypeItem(newShotTypeSelectItem);
        pointArray[currentPointID].shotType = newShotTypeSelectItem;
    };
    //Shot Spin Typeボタン押下処理
    const shotSpinTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotSpinTypeSelectItem: string,
    ) => {
        setShotSpinTypeItem(newShotSpinTypeSelectItem);
        pointArray[currentPointID].shotSpinType = newShotSpinTypeSelectItem;
    };
    //Shot Detailボタン押下処理
    const shotDetailChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotDetailSelectItem: string,
    ) => {
        setShotDetailItem(newShotDetailSelectItem);
        pointArray[currentPointID].shotDetail = newShotDetailSelectItem;
    };
    //Shot Detail Courceボタン押下処理
    const shotDetailCourceChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotDetailCourceSelectItem: string,
    ) => {
        setShotDetailCourceItem(newShotDetailCourceSelectItem);
        pointArray[currentPointID].shotDetailCource = newShotDetailCourceSelectItem;
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
            <p>ArrayPointID:{pointArray[currentPointID].pointID}</p>
            <Box>
                <IconButton aria-label="Subtract" onClick={onClickPointIDSubtract}>
                    <RemoveCircleIcon color="action"/>
                </IconButton>                
                <IconButton aria-label="add" onClick={onClickPointIDAdd}>
                    <AddCircleIcon color="primary"/>
                </IconButton>
                <IconButton aria-label="add" onClick={onClickPointIDZero}>
                    <RestartAltIcon color="error"/>
                </IconButton>                

            </Box>
            {pointArray.map((value) => {
                return <p key={"pointRecord"+value.pointID}>{ Object.entries(value).map( (val)=> val + ", ")}</p>
            })}
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

            {/* <p>Serve</p>
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
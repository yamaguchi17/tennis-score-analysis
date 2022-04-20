import { useState, useContext } from "react";
import { PointType } from '../common/AppTypes';
import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { db } from "../common/db";
import { useLiveQuery } from "dexie-react-hooks";

//トグルボタンの各処理
export const usePointContentsSelect = () => {
    
    const { globalState, setGlobalState } = useContext(GlobalStateContext);
    const matchData = useLiveQuery(() => db.matchData.get({id:globalState.recodingMatchId}),[]);  

    //ポイント取得サイドボタン用state
    //const [pointGetSide, setPointGetSide] = useState('');
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
    //ラリー回数カウント用state
    const [rallyCountItem, setRallyCountItem] = useState(0);  


    const matchDataDBupdate = (name:string, value:string|number) => {
        db.matchData.get({id:globalState.recodingMatchId}).then((md)=>{
            if(md !== undefined){
                const newData:PointType[] = JSON.parse(JSON.stringify(md.data));
                const keyName: keyof PointType = name as keyof PointType;
                newData[md.currentPointId][keyName] = value;
                db.matchData.update(globalState.recodingMatchId,{data:newData});
            }
        });        
    };

    //Serveボタン押下処理
    const serveChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeSelectItem: string,
    ) => {
        //非選択またはダブルフォルトの場合、サーブ関連ボタンを初期化する
        if(newServeSelectItem === "" || newServeSelectItem === null || newServeSelectItem === "Double Fault"){
            setServeCourceItem("");
            setServeTypeItem("");
            matchDataDBupdate("serveCource","");
            matchDataDBupdate("serveType","");
        }
        //stateとDBへの反映
        setServeItem(newServeSelectItem);
        matchDataDBupdate("serve",newServeSelectItem);

        // const newMatchData = JSON.parse(JSON.stringify(matchData));
        // //非選択またはダブルフォルトの場合、サーブ関連ボタンを初期化する
        // if(newServeSelectItem === "" || newServeSelectItem === null || newServeSelectItem === "Double Fault"){
        //     setServeCourceItem("");
        //     setServeTypeItem("");
            
        //     if(newMatchData !== undefined){
        //         newMatchData.data[Number(matchData?.currentPointId)].serveCource = "";
        //         newMatchData.data[Number(matchData?.currentPointId)].serveType = "";
        //     }
        // }
        // //stateとDBへの反映
        // setServeItem(newServeSelectItem);
        // newMatchData.data[Number(matchData?.currentPointId)].serve = newServeSelectItem;
        // if(newMatchData !== undefined) db.matchData.update(globalState.recodingMatchId,{data:newMatchData.data});        
    };

    //Serve Courceボタン押下処理
    const serveCourceChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeCourceSelectItem: string,
    ) => {
        setServeCourceItem(newServeCourceSelectItem);
        const newMatchData = JSON.parse(JSON.stringify(matchData));
        if(newMatchData !== undefined) newMatchData.data[Number(matchData?.currentPointId)].serveCource = newServeCourceSelectItem;
        db.matchData.update(globalState.recodingMatchId,{data:newMatchData.data});
    };
    
    //Serve Typeボタン押下処理
    const serveTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeTypeSelectItem: string,
    ) => {
        setServeTypeItem(newServeTypeSelectItem);
        const newMatchData = JSON.parse(JSON.stringify(matchData));
        if(newMatchData !== undefined) newMatchData.data[Number(matchData?.currentPointId)].serveType = newServeTypeSelectItem;
        db.matchData.update(globalState.recodingMatchId,{data:newMatchData.data});        
    };

    //Point Categoryボタン押下処理
    const pointCategoryChange = (
        event: React.MouseEvent<HTMLElement>,
        newPointCategorySelectItem: string,
    ) => {
        const newMatchData = JSON.parse(JSON.stringify(matchData));
        //非選択の場合、ショット関連ボタンを初期化する
        if(newPointCategorySelectItem === "" || newPointCategorySelectItem === null){
            setShotTypeItem("");
            setShotSpinTypeItem("");
            setShotDetailItem("");
            setShotDetailCourceItem("");

            if(newMatchData !== undefined){
                newMatchData.data[Number(matchData?.currentPointId)].shotType =  "";
                newMatchData.data[Number(matchData?.currentPointId)].shotSpinType = "";
                newMatchData.data[Number(matchData?.currentPointId)].shotDetail = "";
                newMatchData.data[Number(matchData?.currentPointId)].shotDetailCource = "";
            }          
        }
        //stateとポイント管理配列への反映
        setPointCategoryItem(newPointCategorySelectItem);
        if(newMatchData !== undefined) newMatchData.data[Number(matchData?.currentPointId)].pointCategory = newPointCategorySelectItem;
        db.matchData.update(globalState.recodingMatchId,{data:newMatchData.data});         
    };

    //Shot Typeボタン押下処理
    const shotTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotTypeSelectItem: string,
    ) => {
        setShotTypeItem(newShotTypeSelectItem);
        const newMatchData = JSON.parse(JSON.stringify(matchData));
        if(newMatchData !== undefined) newMatchData.data[Number(matchData?.currentPointId)].shotType = newShotTypeSelectItem;
        db.matchData.update(globalState.recodingMatchId,{data:newMatchData.data});           
    };

    //Shot Spin Typeボタン押下処理
    const shotSpinTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotSpinTypeSelectItem: string,
    ) => {
        setShotSpinTypeItem(newShotSpinTypeSelectItem);
        const newMatchData = JSON.parse(JSON.stringify(matchData));
        if(newMatchData !== undefined) newMatchData.data[Number(matchData?.currentPointId)].shotSpinType = newShotSpinTypeSelectItem;
        db.matchData.update(globalState.recodingMatchId,{data:newMatchData.data});           
    };

    //Shot Detailボタン押下処理
    const shotDetailChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotDetailSelectItem: string,
    ) => {
        setShotDetailItem(newShotDetailSelectItem);
        const newMatchData = JSON.parse(JSON.stringify(matchData));
        if(newMatchData !== undefined) newMatchData.data[Number(matchData?.currentPointId)].shotDetail = newShotDetailSelectItem;
        db.matchData.update(globalState.recodingMatchId,{data:newMatchData.data});           
    };

    //Shot Detail Courceボタン押下処理
    const shotDetailCourceChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotDetailCourceSelectItem: string,
    ) => {
        setShotDetailCourceItem(newShotDetailCourceSelectItem);
        const newMatchData = JSON.parse(JSON.stringify(matchData));
        if(newMatchData !== undefined) newMatchData.data[Number(matchData?.currentPointId)].shotDetailCource = newShotDetailCourceSelectItem;
        db.matchData.update(globalState.recodingMatchId,{data:newMatchData.data});           
    };

    //rallyCount +ボタン押下処理
    const rallyCountAdd = () => {
        const newRallyCountItem = rallyCountItem + 1;
        setRallyCountItem(newRallyCountItem);
        const newMatchData = JSON.parse(JSON.stringify(matchData));
        if(newMatchData !== undefined) newMatchData.data[Number(matchData?.currentPointId)].rallyCount = newRallyCountItem;
        db.matchData.update(globalState.recodingMatchId,{data:newMatchData.data});           
    };

    //rallyCount -ボタン押下処理
    const rallyCountSubtract = () => {
        const newRallyCountItem = rallyCountItem - 1;
        if(newRallyCountItem >= 0) {
            setRallyCountItem(newRallyCountItem);
            const newMatchData = JSON.parse(JSON.stringify(matchData));
            if(newMatchData !== undefined) newMatchData.data[Number(matchData?.currentPointId)].rallyCount = newRallyCountItem;
            db.matchData.update(globalState.recodingMatchId,{data:newMatchData.data});
        }      
    };

    //対象ポイント時の各種stateをセット
    const pointMoveSet = (point:PointType):void => {
        //setPointGetSide(String(point.pointGetSide));
        setServeItem(point.serve === undefined ? "" : String(point.serve));   //未選択時のdisabled対応
        setServeCourceItem(String(point.serveCource));
        setServeTypeItem(String(point.serveType));
        setPointCategoryItem(point.pointCategory === undefined ? "" : String(point.pointCategory));   //未選択時のdisabled対応
        setShotTypeItem(String(point.shotType));
        setShotSpinTypeItem(String(point.shotSpinType));
        setShotDetailItem(String(point.shotDetail));
        setShotDetailCourceItem(String(point.shotDetailCource));
        setRallyCountItem(point.rallyCount === undefined ? 0 : point.rallyCount);
    };


    return ([
        {
            //pointGetSide,
            serveSelectItem,
            serveCourceSelectItem,
            serveTypeSelectItem,
            pointCategorySelectItem,
            shotTypeSelectItem,
            shotSpinTypeSelectItem,
            shotDetailSelectItem,
            shotDetailCourceSelectItem,
            rallyCountItem,
        },{
            //pointGetSideChange,
            serveChange,
            serveCourceChange,
            serveTypeChange,
            pointCategoryChange,
            shotTypeChange,
            shotSpinTypeChange,
            shotDetailChange,
            shotDetailCourceChange,
            rallyCountAdd,
            rallyCountSubtract,
            pointMoveSet,
        }
    ]);
};


    //const globalState = useLiveQuery(() => db.globalState.get({userId:"0"}) ,[]);
    //console.log(globalState);
    //const targetId = !!globalState ? globalState?.recodingMatchId : 0;
    //const matchData = useLiveQuery(() => db.matchData.get({id:globalState?.recodingMatchId}) ,[]);
    
    //console.log(matchData);



    

    //ポイント取得サイドボタンボタン押下処理
    // const pointGetSideChange = (
    //     newPointGetSide: string
    // ) => {
    //     if(newPointGetSide === pointGetSide) newPointGetSide = "";
    //     setPointGetSide(newPointGetSide);
    //     pointArray.pointGetSide = newPointGetSide;
    //     //次へボタンの制御　ポイント取得サイドが選択状態ならば移行可能
    //     (newPointGetSide === null || newPointGetSide === "") ? setCanMovePoint(false) : setCanMovePoint(true);
    // };

    // //ポイント取得サイドボタンボタン押下処理
    // const pointGetSideChange = (
    //     event: React.MouseEvent<HTMLElement>,
    //     newPointGetSide: string,
    // ) => {
    //     setPointGetSide(newPointGetSide);
    //     pointArray.pointGetSide = newPointGetSide;
    //     //次へボタンの制御　ポイント取得サイドが選択状態ならば移行可能
    //     newPointGetSide == null ? setCanMovePoint(false) : setCanMovePoint(true);
    // };


    //db更新用関数　作成中に挫折
    // type currentPointUpdataArg = {
    //     itemName: String,
    //     value: String,
    // }
    
    // const currentPointUpdata = (arg:currentPointUpdataArg[]) => {
    //     arg.map((ele) => {
    //         const data = matchData;
    //         if(data !== undefined){
    //             data.data[Number(matchData?.currentPointId)][(ele.itemName.toString())] = "";
    //             data.data[Number(matchData?.currentPointId)]["serveType"] = "";
    //         }
    //         db.matchData.update(Number(globalState?.recodingMatchId),{data});
    //     });
    // }
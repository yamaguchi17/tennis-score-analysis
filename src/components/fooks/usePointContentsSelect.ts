import { useState, useContext } from "react";
import { PointType } from '../common/AppTypes';
import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { matchDataDBupdate } from '../common/AppFunctions';

//トグルボタンの各処理
export const usePointContentsSelect = () => {
    
    const { globalState, setGlobalState } = useContext(GlobalStateContext);

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

    //Serveボタン押下処理
    const serveChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeSelectItem: string,
    ) => {
        //非選択またはダブルフォルトの場合、サーブ関連ボタンを初期化する
        if(newServeSelectItem === "" || newServeSelectItem === null || newServeSelectItem === "Double Fault"){
            setServeCourceItem("");
            setServeTypeItem("");
            matchDataDBupdate("serveCource","",globalState.recodingMatchId);
            matchDataDBupdate("serveType","",globalState.recodingMatchId);
        }
        //stateとDBへの反映
        setServeItem(newServeSelectItem);
        matchDataDBupdate("serve",newServeSelectItem,globalState.recodingMatchId);
    };

    //Serve Courceボタン押下処理
    const serveCourceChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeCourceSelectItem: string,
    ) => {
        setServeCourceItem(newServeCourceSelectItem);
        matchDataDBupdate("serveCource",newServeCourceSelectItem,globalState.recodingMatchId);
    };
    
    //Serve Typeボタン押下処理
    const serveTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeTypeSelectItem: string,
    ) => {
        setServeTypeItem(newServeTypeSelectItem);
        matchDataDBupdate("serveType",newServeTypeSelectItem,globalState.recodingMatchId);     
    };

    //Point Categoryボタン押下処理
    const pointCategoryChange = (
        event: React.MouseEvent<HTMLElement>,
        newPointCategorySelectItem: string,
    ) => {
        //非選択の場合、ショット関連ボタンを初期化する
        if(newPointCategorySelectItem === "" || newPointCategorySelectItem === null){
            setShotTypeItem("");
            setShotSpinTypeItem("");
            setShotDetailItem("");
            setShotDetailCourceItem("");
            matchDataDBupdate("shotType","",globalState.recodingMatchId);
            matchDataDBupdate("shotSpinType","",globalState.recodingMatchId);
            matchDataDBupdate("shotDetail","",globalState.recodingMatchId);
            matchDataDBupdate("shotDetailCource","",globalState.recodingMatchId);
        }
        //stateとポイント管理配列への反映
        setPointCategoryItem(newPointCategorySelectItem);
        matchDataDBupdate("pointCategory",newPointCategorySelectItem,globalState.recodingMatchId);     
    };

    //Shot Typeボタン押下処理
    const shotTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotTypeSelectItem: string,
    ) => {
        setShotTypeItem(newShotTypeSelectItem);
        matchDataDBupdate("shotType",newShotTypeSelectItem,globalState.recodingMatchId);        
    };

    //Shot Spin Typeボタン押下処理
    const shotSpinTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotSpinTypeSelectItem: string,
    ) => {
        setShotSpinTypeItem(newShotSpinTypeSelectItem);
        matchDataDBupdate("serveCoushotSpinTyperce",newShotSpinTypeSelectItem,globalState.recodingMatchId);     
    };

    //Shot Detailボタン押下処理
    const shotDetailChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotDetailSelectItem: string,
    ) => {
        setShotDetailItem(newShotDetailSelectItem);
        matchDataDBupdate("shotDetail",newShotDetailSelectItem,globalState.recodingMatchId);         
    };

    //Shot Detail Courceボタン押下処理
    const shotDetailCourceChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotDetailCourceSelectItem: string,
    ) => {
        setShotDetailCourceItem(newShotDetailCourceSelectItem);
        matchDataDBupdate("shotDetailCource",newShotDetailCourceSelectItem,globalState.recodingMatchId);      
    };

    //rallyCount +ボタン押下処理
    const rallyCountAdd = () => {
        const newRallyCountItem = rallyCountItem + 1;
        setRallyCountItem(newRallyCountItem);
        matchDataDBupdate("rallyCount",newRallyCountItem,globalState.recodingMatchId);       
    };

    //rallyCount -ボタン押下処理
    const rallyCountSubtract = () => {
        const newRallyCountItem = rallyCountItem - 1;
        if(newRallyCountItem >= 0) {
            setRallyCountItem(newRallyCountItem);
            matchDataDBupdate("rallyCount",newRallyCountItem,globalState.recodingMatchId);
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
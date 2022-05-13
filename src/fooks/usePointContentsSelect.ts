import { useState, useContext, useEffect } from "react";
import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { matchDataDBupdate } from '../common/AppFunctions';
import { db } from "../common/db";

//トグルボタンの各処理
export const usePointContentsSelect = (currentPointID:number) => {
    
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

    //currentPointIDの変更毎にDBの内容を各ボタンStateへ反映
    useEffect(() => {
        db.matchData.get({ id: globalState.recodingMatchId })
        .then((md) => {
            if (md !== undefined) {
                setServeItem(md.data[currentPointID].serve);
                setServeCourceItem(md.data[currentPointID].serveCource);
                setServeTypeItem(md.data[currentPointID].serveType);
                setPointCategoryItem(md.data[currentPointID].pointCategory);
                setShotTypeItem(md.data[currentPointID].shotType);
                setShotSpinTypeItem(md.data[currentPointID].shotSpinType);
                setShotDetailItem(md.data[currentPointID].shotDetail);
                setShotDetailCourceItem(md.data[currentPointID].shotDetailCource);
                setRallyCountItem(md.data[currentPointID].rallyCount);                
            }
        })
        .catch((error) => {
            console.error("error" + error);
        })
    }, [currentPointID]);

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
        matchDataDBupdate("shotSpinType",newShotSpinTypeSelectItem,globalState.recodingMatchId);     
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

    return ([
        {
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
        }
    ]);
};
import { useState } from "react";
import { PointType } from "../components/common/AppTypes";


//トグルボタンの各処理
export const useToggleBtnAction = (pointArray:PointType) => {

    //ポイント取得サイドボタン用state
    const [pointGetSide, setPointGetSide] = useState('');
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
    //次へボタンの制御state
    const [canMovePoint, setCanMovePoint] = useState<boolean>(false);

    //ポイント取得サイドボタンボタン押下処理
    const pointGetSideChange = (
        event: React.MouseEvent<HTMLElement>,
        newPointGetSide: string,
    ) => {
        setPointGetSide(newPointGetSide);
        pointArray.pointGetSide = newPointGetSide;
        //次へボタンの制御　ポイント取得サイドが選択状態ならば移行可能
        newPointGetSide == null ? setCanMovePoint(false) : setCanMovePoint(true);
    };

    //Serveボタン押下処理
    const serveChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeSelectItem: string,
    ) => {
        setServeItem(newServeSelectItem);
        pointArray.serve = newServeSelectItem;
    };

    //Serve Courceボタン押下処理
    const serveCourceChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeCourceSelectItem: string,
    ) => {
        setServeCourceItem(newServeCourceSelectItem);
        pointArray.serveCource = newServeCourceSelectItem;
    };
    
    //Serve Typeボタン押下処理
    const serveTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeTypeSelectItem: string,
    ) => {
        setServeTypeItem(newServeTypeSelectItem);
        pointArray.serveType = newServeTypeSelectItem;
    };

    //Point Categoryボタン押下処理
    const pointCategoryChange = (
        event: React.MouseEvent<HTMLElement>,
        newPointCategorySelectItem: string,
    ) => {
        setPointCategoryItem(newPointCategorySelectItem);
        pointArray.pointCategory = newPointCategorySelectItem;
    };

    //Shot Typeボタン押下処理
    const shotTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotTypeSelectItem: string,
    ) => {
        setShotTypeItem(newShotTypeSelectItem);
        pointArray.shotType = newShotTypeSelectItem;
    };

    //Shot Spin Typeボタン押下処理
    const shotSpinTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotSpinTypeSelectItem: string,
    ) => {
        setShotSpinTypeItem(newShotSpinTypeSelectItem);
        pointArray.shotSpinType = newShotSpinTypeSelectItem;
    };

    //Shot Detailボタン押下処理
    const shotDetailChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotDetailSelectItem: string,
    ) => {
        setShotDetailItem(newShotDetailSelectItem);
        pointArray.shotDetail = newShotDetailSelectItem;
    };

    //Shot Detail Courceボタン押下処理
    const shotDetailCourceChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotDetailCourceSelectItem: string,
    ) => {
        setShotDetailCourceItem(newShotDetailCourceSelectItem);
        pointArray.shotDetailCource = newShotDetailCourceSelectItem;
    }; 

    //対象ポイント時の各種stateをセット
    const pointMoveSet = (pointArray:PointType):void => {
        setPointGetSide(String(pointArray.pointGetSide));
        setServeItem(String(pointArray.serve));
        setServeCourceItem(String(pointArray.serveCource));
        setServeTypeItem(String(pointArray.serveType));
        setPointCategoryItem(String(pointArray.pointCategory));
        setShotTypeItem(String(pointArray.shotType));
        setShotSpinTypeItem(String(pointArray.shotSpinType));
        setShotDetailItem(String(pointArray.shotDetail));
        setShotDetailCourceItem(String(pointArray.shotDetailCource));
    };

    return ({
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
    });
};
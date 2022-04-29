import { useEffect, useContext } from "react";
import {resultDataStatuType, 
        ResultDataType, 
        ResultBaseDefaultDataGet, 
        resultDataStatuDefaultDataGet, 
        MatchDataType, 
        ruleSetType, } from '../common/AppTypes';
import { DISPLAY_TYPES } from "../common/AppConst";
import { db } from "../common/db";
import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { RuleSettingsContext } from "../providers/RuleSettingsProvider";
import { DisplayTypeContext } from "../providers/DisplayTypeProvider";

export const ResultCalc: React.VFC = () => {
  
    //context
    const { globalState, setGlobalState } = useContext(GlobalStateContext);
    const { ruleSettings, setRuleSettings } = useContext(RuleSettingsContext);
    const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);

    //結果データ作成
    useEffect(() => {
            //Recordで入力したデータの読み込みと結果データの作成
            db.matchData.get(globalState.recodingMatchId)
            .then(async (md)=>{
                if(md !== undefined){

                    //結果データ格納用の変数
                    let newResultData:ResultDataType = {
                        id: globalState.recodingMatchId,
                        baseData: ResultBaseDefaultDataGet(),
                        statuPlayer1: resultDataStatuDefaultDataGet(),
                        statuPlayer2: resultDataStatuDefaultDataGet(),
                    }

                    //ResultData.baseDataの設定
                    baseDataSet(md, newResultData, ruleSettings, globalState.recodingMatchId);

                    //スタッツ計算
                    statuCount(md, newResultData);

                    //レート計算
                    statuCalc(md, newResultData);

                    //newResultDataをDBに挿入(put:既存オブジェクトがある場合は置き換え)
                    await db.resultData.put(newResultData);
                }
            })
            //計算後のresultDataを表示するための処理
            .then(() => {
                db.globalState.update("0", {"displayResultId":globalState.recodingMatchId, "isRecording":false, "recodingMatchId":0});
                globalState.displayResultId = globalState.recodingMatchId;
                globalState.isRecording = false;
                globalState.recodingMatchId = 0;
                setDisplayType(DISPLAY_TYPES.RESULT_CONTENTS);
            });
    },[]);

    return (
        <p>Dialog</p>
    )
}

//ResultData.baseDataの設定
function baseDataSet(md: MatchDataType, rd: ResultDataType, ruleSettings:ruleSetType, id:number):void {
    //マッチネームの設定
    rd.baseData.macthName = "試合結果" + String(id);

    //名前の設定
    rd.baseData.player1Name = ruleSettings.playerNameA;
    rd.baseData.player2Name = ruleSettings.playerNameB;

    //合計ポイント数の設定
    rd.baseData.totalPoint = md.data.length -1;
    
    //ゲームカウントの設定
    md.data.slice(-1)[0].point.setCountA.map((valueA,index)=> {
        const valueB = md.data.slice(-1)[0].point.setCountB[index];
        if(!(valueA === 0 && valueB === 0)){
            if(rd.baseData.gameCount[0] === []){
                rd.baseData.gameCount[0] = [valueA,valueB];
            }else{
                rd.baseData.gameCount.push([valueA,valueB]);
            }
        }
    });
}

//ResultData.statuPlayerXのカウント処理
function statuCount(md: MatchDataType, rd: ResultDataType):void {

    //各評価項目のカウント処理
    md.data.map((val,key ) => {

        // pointWon
        if(val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.pointWon.value++ : rd.statuPlayer2.pointWon.value++;
        }
        // errors
        if(val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.error.value++ : rd.statuPlayer1.error.value++;
        }
        // winner
        if(val.pointCategory === 'Winner'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.winner.value++ : rd.statuPlayer2.winner.value++;
        }
        // nieceShot
        if(val.pointCategory === 'NiceShot'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.pointWon.value++ : rd.statuPlayer2.pointWon.value++;
        }
        // totalPointWon
        val.pointGetSide === 'sideA' ? rd.statuPlayer1.totalPointWon.value++ : rd.statuPlayer2.totalPointWon.value++;
        // serveCount
        val.point.serverSide === 'player1' ? rd.statuPlayer1.serveCount.value++ : rd.statuPlayer2.serveCount.value++;
        // serviceAce
        if(val.pointCategory === 'Winner' && val.shotType === 'Serve'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.serviceAce.value++ : rd.statuPlayer2.serviceAce.value++;
        }
        // doubleFault
        if(val.serve === 'Double Fault'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.doubleFault.value++ : rd.statuPlayer2.doubleFault.value++;
        }
        // serve1stIn
        if(val.serve === '1st'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.serve1stIn.value++ : rd.statuPlayer2.serve1stIn.value++;
        }
        // serve2ndIn
        if(val.serve === '2nd'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.serve2ndIn.value++ : rd.statuPlayer2.serve2ndIn.value++;
        }
        // serve1stWon
        if(val.serve === '1st'){
            if(val.point.serverSide === 'player1' && val.pointGetSide === 'sideA') rd.statuPlayer1.serve1stWon.value++;
            if(val.point.serverSide === 'player2' && val.pointGetSide === 'sideB') rd.statuPlayer2.serve1stWon.value++;
        }
        // serve2ndWon
        if(val.serve === '2nd'){
            if(val.point.serverSide === 'player1' && val.pointGetSide === 'sideA') rd.statuPlayer1.serve2ndWon.value++;
            if(val.point.serverSide === 'player2' && val.pointGetSide === 'sideB') rd.statuPlayer2.serve2ndWon.value++;
        }
        // rally5orUnderWon
        if(val.rallyCount <= 5 && val.rallyCount > 0){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.rally5orUnderWon.value++ : rd.statuPlayer2.rally5orUnderWon.value++;
        }
        // rallyOver5Won
        if(val.rallyCount > 5){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.rallyOver5Won.value++ : rd.statuPlayer2.rallyOver5Won.value++;
        }
        // serveWon
        if(val.shotType === 'Serve' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.serveWon.value++ : rd.statuPlayer2.serveWon.value++;
        }
        // returnWon
        if(val.shotType === 'Return' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.returnWon.value++ : rd.statuPlayer2.returnWon.value++;
        }
        // returnError
        if(val.shotType === 'Return' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.returnError.value++ : rd.statuPlayer1.returnError.value++;
        }
        // strokeWon
        if(val.shotType === 'Stroke' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.strokeWon.value++ : rd.statuPlayer2.strokeWon.value++;
        }
        // strokeError
        if(val.shotType === 'Stroke' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.strokeError.value++ : rd.statuPlayer1.strokeError.value++;
        }
        // volleyWon
        if(val.shotType === 'Volley' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.volleyWon.value++ : rd.statuPlayer2.volleyWon.value++;
        }
        // volleyError
        if(val.shotType === 'Volley' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.volleyError.value++ : rd.statuPlayer1.volleyError.value++;
        }
        // smashWon
        if(val.shotType === 'Smash' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.smashWon.value++ : rd.statuPlayer2.smashWon.value++;
        }
        // smashError
        if(val.shotType === 'Smash' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.smashError.value++ : rd.statuPlayer1.smashError.value++;
        }
        // lobWon
        if(val.shotDetailCource === 'Lob' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.lobWon.value++ : rd.statuPlayer2.lobWon.value++;
        }
        // lobError
        if(val.shotDetailCource === 'Lob' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.lobError.value++ : rd.statuPlayer1.lobError.value++;
        }
        // dropWon
        if(val.shotDetailCource === 'Drop' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.dropWon.value++ : rd.statuPlayer2.dropWon.value++;
        }
        // dropError
        if(val.shotDetailCource === 'Drop' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.dropError.value++ : rd.statuPlayer1.dropError.value++;
        }
        // serveCourceWide
        if(val.serveCource === 'Wide'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.serveCourceWide.value++ : rd.statuPlayer2.serveCourceWide.value++;
        }
        // serveCourceBody
        if(val.serveCource === 'Body'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.serveCourceBody.value++ : rd.statuPlayer2.serveCourceBody.value++;
        }
        // serveCourceCenter
        if(val.serveCource === 'Center'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.serveCourceCenter.value++ : rd.statuPlayer2.serveCourceCenter.value++;
        }
        // serveCourceFore
        if(val.serveCource === 'Fore'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.serveCourceFore.value++ : rd.statuPlayer2.serveCourceFore.value++;
        }
        // serveCourceBack
        if(val.serveCource === 'Back'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.serveCourceBack.value++ : rd.statuPlayer2.serveCourceBack.value++;
        }
        // serveTypeFlat
        if(val.serveType === 'Flat'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.serveTypeFlat.value++ : rd.statuPlayer2.serveTypeFlat.value++;
        }
        // serveTypeSlice
        if(val.serveType === 'Slice'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.serveTypeSlice.value++ : rd.statuPlayer2.serveTypeSlice.value++;
        }
        // serveTypeSpin
        if(val.serveType === 'Spin'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.serveTypeSpin.value++ : rd.statuPlayer2.serveTypeSpin.value++;
        }
        // serveTypeTopSlice
        if(val.serveType === 'TopSlice'){
            val.point.serverSide === 'player1' ? rd.statuPlayer1.serveTypeTopSlice.value++ : rd.statuPlayer2.serveTypeTopSlice.value++;
        }
        // foreReturnWon
        if(val.shotDetail === 'Fore' && val.shotType === 'Return' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.foreReturnWon.value++ : rd.statuPlayer2.foreReturnWon.value++;
        }
        // foreReturnError
        if(val.shotDetail === 'Fore' && val.shotType === 'Return' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.foreReturnError.value++ : rd.statuPlayer1.foreReturnError.value++;
        }
        // backReturnWon
        if(val.shotDetail === 'Back' && val.shotType === 'Return' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.backReturnWon.value++ : rd.statuPlayer2.backReturnWon.value++;
        }
        // backReturnError
        if(val.shotDetail === 'Back' && val.shotType === 'Return' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.backReturnError.value++ : rd.statuPlayer1.backReturnError.value++;
        }
        // foreStrokeWon
        if(val.shotDetail === 'Fore' && val.shotType === 'Stroke' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.foreStrokeWon.value++ : rd.statuPlayer2.foreStrokeWon.value++;
        }
        // foreStrokeError
        if(val.shotDetail === 'Fore' && val.shotType === 'Stroke' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.foreStrokeError.value++ : rd.statuPlayer1.foreStrokeError.value++;
        }
        // backStrokeWon
        if(val.shotDetail === 'Back' && val.shotType === 'Stroke' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.backStrokeWon.value++ : rd.statuPlayer2.backStrokeWon.value++;
        }
        // backStrokeError
        if(val.shotDetail === 'Back' && val.shotType === 'Stroke' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.backStrokeError.value++ : rd.statuPlayer1.backStrokeError.value++;
        }
        // foreVolleyWon
        if(val.shotDetail === 'Fore' && val.shotType === 'Volley' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.foreVolleyWon.value++ : rd.statuPlayer2.foreVolleyWon.value++;
        }
        // foreVolleyError
        if(val.shotDetail === 'Fore' && val.shotType === 'Volley' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.foreVolleyError.value++ : rd.statuPlayer1.foreVolleyError.value++;
        }
        // backVolleyWon
        if(val.shotDetail === 'Back' && val.shotType === 'Volley' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.backVolleyWon.value++ : rd.statuPlayer2.backVolleyWon.value++;
        }
        // backVolleyError
        if(val.shotDetail === 'Back' && val.shotType === 'Volley' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.backVolleyError.value++ : rd.statuPlayer1.backVolleyError.value++;
        }
        // spinWon
        if(val.shotSpinType === 'Spin' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.spinWon.value++ : rd.statuPlayer2.spinWon.value++;
        }
        // spinError
        if(val.shotSpinType === 'Spin' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.spinError.value++ : rd.statuPlayer1.spinError.value++;
        }
        // sliceWon
        if(val.shotSpinType === 'Slice' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.sliceWon.value++ : rd.statuPlayer2.sliceWon.value++;
        }
        // sliceError
        if(val.shotSpinType === 'Slice' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.sliceError.value++ : rd.statuPlayer1.sliceError.value++;
        }
        // flatWon
        if(val.shotSpinType === 'Flat' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.flatWon.value++ : rd.statuPlayer2.flatWon.value++;
        }
        // flatError
        if(val.shotSpinType === 'Flat' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.flatError.value++ : rd.statuPlayer1.flatError.value++;
        }
        // crossWon
        if(val.shotSpinType === 'Cross' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.crossWon.value++ : rd.statuPlayer2.crossWon.value++;
        }
        // crossError
        if(val.shotSpinType === 'Cross' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.crossError.value++ : rd.statuPlayer1.crossError.value++;
        }
        // straightWon
        if(val.shotSpinType === 'Straight' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.straightWon.value++ : rd.statuPlayer2.straightWon.value++;
        }
        // straightError
        if(val.shotSpinType === 'Straight' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.straightError.value++ : rd.statuPlayer1.straightError.value++;
        }
        // centerWon
        if(val.shotSpinType === 'Center' && (val.pointCategory === 'Winner' || val.pointCategory === 'NiceShot')){
            val.pointGetSide === 'sideA' ? rd.statuPlayer1.centerWon.value++ : rd.statuPlayer2.centerWon.value++;
        }
        // centerError
        if(val.shotSpinType === 'Center' && val.pointCategory === 'Error'){
            val.pointGetSide === 'sideA' ? rd.statuPlayer2.centerError.value++ : rd.statuPlayer1.centerError.value++;
        }
    }); 
}

//ResultData.statuPlayerXのレート計算処理
function statuCalc(md: MatchDataType, rd: ResultDataType):void {
    //player1側を基準に項目分処理する
    Object.entries(rd.statuPlayer1).map(([ key, val1 ]) => {
        
        //player2側を設定
        const keyName: keyof resultDataStatuType = key as keyof resultDataStatuType;
        const val2 = rd.statuPlayer2[keyName];
        
        //「player1：player2」の比率を算出
        if (val1.rateType === 'basic') {
            const denominator = val1.value + val2.value;
            val1.rate = (100 * val1.value / denominator |0).toFixed();
            val2.rate = (100 * val2.value / denominator |0).toFixed();
        }
        //「対象サーブ数/サーブ全回数」の比率を算出
        else if (val1.rateType === 'serve') {
            val1.rate = (100 * val1.value / rd.statuPlayer1.serveCount.value |0).toFixed();
            val2.rate = (100 * val2.value / rd.statuPlayer2.serveCount.value |0).toFixed();
        }
        //その他の計算が必要な項目の比率を算出
        else {
            switch (key) {
                case 'serve2ndIn':
                    val1.rate = (100 * val1.value / rd.statuPlayer1.serveCount.value - rd.statuPlayer1.serve1stIn.value |0).toFixed();
                    val2.rate = (100 * val2.value / rd.statuPlayer2.serveCount.value - rd.statuPlayer2.serve1stIn.value |0).toFixed();
                    break;
                case 'serve1stWon':
                    val1.rate = (100 * val1.value / rd.statuPlayer1.serve1stIn.value |0).toFixed();
                    val2.rate = (100 * val2.value / rd.statuPlayer2.serve1stIn.value |0).toFixed();
                    break;
                case 'serve2ndWon':
                    val1.rate = (100 * val1.value / rd.statuPlayer1.serve2ndIn.value |0).toFixed();
                    val2.rate = (100 * val2.value / rd.statuPlayer2.serve2ndIn.value |0).toFixed();
                    break;
            }
        }
    });
}
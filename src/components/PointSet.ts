import { PointType, scoreType, ruleSetType } from "./common/AppTypes";
import { DEUCE_MODE, TIE_BREAK_MODE } from "./common/AppConst";

//ルール設定変数の初期化
let tieBreakMode:string = "";
let deuceMode:string = "";
let numberOfGames:number = 0;
let numberOfTieBreakPoint:number = 0;

//ポイント取得側とポイント失点側の宣言
let winnerScore: scoreType;
let loserScore: scoreType;

//タイブレーク判定,デュース回数,サーバーサイド初期化
let enabledTieBreak:boolean = false;
let deuceCountInGame:number = 0;
let serverSide:string = "";

//ポイント反映処理
export const PointSet = (point:PointType["point"], pointGetSide:string, ruleSettings:ruleSetType):PointType["point"] => {

    //ポイント取得側と失点側, ルール設定の読み込み, タイブレーク判定を設定
    PointSetInit(point,pointGetSide,ruleSettings);
    
    //ポイントカウントアップ処理
    AddPointCount();

    //戻り値にポイント計算後（次の表示するべきポイント数）をセット
    return PointReturnSet(pointGetSide);
}

//PointSetの初期処理
const PointSetInit = (point:PointType["point"], pointGetSide:string, ruleSettings:ruleSetType):void => {

    //ポイント獲得者と失点者を設定
    if ( pointGetSide === "sideA" ) {
        winnerScore = {
            pointCount: point.pointCountA,
            gameCount: point.gameCountA,
            setCount: [...point.setCountA]
        };
        loserScore = {
            pointCount: point?.pointCountB,
            gameCount: point?.gameCountB,
            setCount: [...point?.setCountB]
        };
    } else {
        winnerScore = {
            pointCount: point?.pointCountB,
            gameCount: point?.gameCountB,
            setCount: [...point?.setCountB]
        };
        loserScore = {
            pointCount: point?.pointCountA,
            gameCount: point?.gameCountA,
            setCount: [...point?.setCountA]
        };
    }

    //ルール設定を反映
    tieBreakMode = ruleSettings.tieBreakMode;
    deuceMode = ruleSettings.deuceMode;
    numberOfGames = Number(ruleSettings.numberOfGames);
    numberOfTieBreakPoint = Number(ruleSettings.numberOfTieBreakPoint);    

    //タイブレーク判定
    if(tieBreakMode === TIE_BREAK_MODE.TIE_BREAK && winnerScore.gameCount === numberOfGames && loserScore.gameCount === numberOfGames){
        enabledTieBreak = true;
    }

    //現在のサーバーサイドを反映
    serverSide = point.serverSide;

}

//ポイントカウントアップ処理
const AddPointCount = ():void => {
    //タイブレークの場合
    if(enabledTieBreak){
        //ポイントカウントアップ
        winnerScore.pointCount = Number(winnerScore.pointCount) + 1;

        //ゲーム獲得判定1　タイブレーク獲得ポイント数まで達する　かつ　ポイント取得者＞ポイント失点者
        if(winnerScore.pointCount >= numberOfTieBreakPoint && winnerScore.pointCount > loserScore.pointCount){
            //ゲーム獲得判定2
            switch (deuceMode) {
                //ノーアドモードの場合　そのままゲーム獲得
                case DEUCE_MODE.NO_AD:
                    AddGameCount();
                    break;
                //デュースモードの場合　2ポイント差がつけばゲーム獲得
                case DEUCE_MODE.DEUCE:
                    if(winnerScore.pointCount - Number(loserScore.pointCount) >= 2){
                        AddGameCount();
                    }
                    break;
                //セミアドモードの場合　2ポイント差　または　タイブレーク獲得ポイント超えでゲーム獲得
                case DEUCE_MODE.SEMI_AD:
                    if((winnerScore.pointCount - Number(loserScore.pointCount) >= 2) || winnerScore.pointCount > numberOfTieBreakPoint){
                        AddGameCount();
                    }
                    break;
            }
        }
    }
    //タイブレークでない場合
    else{
        //セミアドモードでのデュース実施回数をカウント
        if(deuceMode === DEUCE_MODE.SEMI_AD && winnerScore.pointCount === 40 && loserScore.pointCount === 40){
            deuceCountInGame++;
        }

        //得点者のポイントが40未満の場合はそのままカウントアップ
        if (winnerScore.pointCount < 40 && winnerScore.pointCount !== "Ad") {
            switch (winnerScore.pointCount) {
                case 0: winnerScore.pointCount = 15; break;
                case 15:winnerScore.pointCount = 30; break;
                case 30:winnerScore.pointCount = 40; break;
                default: break;
            }
        }
        //得点者が40で失点者が30以下ならゲーム獲得
        else if(winnerScore.pointCount === 40 && loserScore.pointCount < 40 && loserScore.pointCount !== "Ad"){
            AddGameCount();
        }
        //デュース処理（ノーアド含む）
        else{     
            //失点者がアドバンテージでない　かつ　ノーアドモードまたはセミアドモードでデュース1回実施済みならゲーム獲得
            if(loserScore.pointCount !== "Ad" && (deuceMode === DEUCE_MODE.NO_AD || (deuceMode === DEUCE_MODE.SEMI_AD && deuceCountInGame >= 2))){
                AddGameCount();
            }
            //デュースモードまたはセミアドモードでデュース2回目未実施
            else if(deuceMode === DEUCE_MODE.DEUCE || (deuceMode === DEUCE_MODE.SEMI_AD && deuceCountInGame < 2)){
                //失点者がアドバンテージなら失点者のポイントを40に
                if(loserScore.pointCount === "Ad"){
                    loserScore.pointCount = 40;
                }
                //失点者がアドバンテージでなく獲得者が40なら獲得者のポイントをアドバンテージに
                else if(winnerScore.pointCount === 40){
                    winnerScore.pointCount = "Ad";
                }
                //獲得者のポイントがアドバンテージならゲーム獲得
                else if(winnerScore.pointCount === "Ad"){
                    AddGameCount();
                }
            }
        }
    }
}

//ゲームカウントアップ処理
const AddGameCount = () => {
    //ポイントをリセットにする
    winnerScore.pointCount = 0;
    loserScore.pointCount = 0;
    enabledTieBreak = false;
    deuceCountInGame = 0;

    //ゲームカウントを1上げる
    winnerScore.gameCount++;

    //サーバーサイドを変更
    serverSide === "player1" ? serverSide = "player2" : serverSide = "player1";

    //セット取得判定
    //1セット取得のゲーム数以上になった場合で判定する
    if (winnerScore.gameCount >= numberOfGames){
        //1. 全モード共通で6-4など失点者側が[1セット取得のゲーム数-2以上離されている]
        //2. タイブレークモードなら取得者のゲーム数が[1セット取得のゲーム数+1]
        //3. 先取モードなら取得者のゲーム数が[1セット取得のゲーム数]
        //4. 2ゲーム差モードなら[取得者のゲーム数と失点者のゲーム数が2以上離れる]
        if((loserScore.gameCount <= numberOfGames - 2)
        || (tieBreakMode === TIE_BREAK_MODE.TIE_BREAK && winnerScore.gameCount === numberOfGames + 1)
        || (tieBreakMode === TIE_BREAK_MODE.GET_FIRST && winnerScore.gameCount === numberOfGames)
        || (tieBreakMode === TIE_BREAK_MODE.TWO_GAME_BEHIND && winnerScore.gameCount - loserScore.gameCount >= 2)){
            //セット取得処理
            AddSetCount();
        }
    }
}

//セットカウントアップ処理
const AddSetCount = () => {
    //セットカウント配列にゲーム数を格納
    winnerScore.setCount.push(winnerScore.gameCount);
    loserScore.setCount.push(loserScore.gameCount);
    //ゲームカウントをリセット
    winnerScore.gameCount = 0;
    loserScore.gameCount = 0;
}

//PointSetの返却値設定処理
const PointReturnSet = (pointGetSide:string):PointType["point"] => {
    let nextPoint: PointType["point"];

    if ( pointGetSide === "sideA" ) {
        nextPoint = {
            pointCountA: winnerScore.pointCount,
            gameCountA: winnerScore.gameCount,
            setCountA: winnerScore.setCount,
            pointCountB: loserScore.pointCount,
            gameCountB: loserScore.gameCount,
            setCountB: loserScore.setCount,
            enabledTieBreak: enabledTieBreak,
            deuceCountInGame: deuceCountInGame,
            serverSide: serverSide
        };
    } else {
        nextPoint = {
            pointCountA: loserScore.pointCount,
            gameCountA: loserScore.gameCount,
            setCountA: loserScore.setCount,
            pointCountB: winnerScore.pointCount,
            gameCountB: winnerScore.gameCount,
            setCountB: winnerScore.setCount,
            enabledTieBreak: enabledTieBreak,
            deuceCountInGame: deuceCountInGame,
            serverSide: serverSide
        };
    }

    return nextPoint;
}
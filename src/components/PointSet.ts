import { PointType, scoreType } from "./common/AppTypes";

//設定
const enabledDeuce = true;
const enabledTieBreakInMatch = false;
const enabledTieBreakInGame = false;
const enabled2GamesBehind = false;
const numberOfGames = 6;

//ポイント反映処理
export const PointSet = (point:PointType["point"], pointGetSide:string):PointType["point"] => {
    //ポイント取得側とポイント失点側を設定
    let [winnerScore, loserScore] = PointSetInit(point,pointGetSide);

    //ポイントカウントアップ処理
    AddPointCount(winnerScore,loserScore);

    //戻り値にポイント計算後（次の表示するべきポイント数）をセット
    return PointReturnSet(winnerScore, loserScore, pointGetSide);;
}

//PointSetの初期処理
const PointSetInit = (point:PointType["point"], pointGetSide:string):scoreType[] => {
    //ポイント取得側とポイント失点側を設定
    let winnerScore: scoreType;
    let loserScore: scoreType;

    if ( pointGetSide === "sideA" ) {
        winnerScore = {
            pointCount: point.pointCountA,
            gameCount: point.gameCountA,
            setCount: point.setCountA
        };
        loserScore = {
            pointCount: point?.pointCountB,
            gameCount: point?.gameCountB,
            setCount: point?.setCountB
        };
    } else {
        winnerScore = {
            pointCount: point?.pointCountB,
            gameCount: point?.gameCountB,
            setCount: point?.setCountB
        };
        loserScore = {
            pointCount: point?.pointCountA,
            gameCount: point?.gameCountA,
            setCount: point?.setCountA
        };
    }

    return [winnerScore,loserScore];
}

//ポイントカウントアップ処理
const AddPointCount = (winnerScore:scoreType, loserScore:scoreType):void => {
    //ポイントが40未満の場合はそのままカウントアップ
    if (winnerScore.pointCount < 40 && winnerScore.pointCount !== "Ad") {
        switch (winnerScore.pointCount) {
            case 0: winnerScore.pointCount = 15; break;
            case 15:winnerScore.pointCount = 30; break;
            case 30:winnerScore.pointCount = 40; break;
            default: break;
        }
    }
    //ポイントが40以上の場合はデュース判定とゲーム獲得処理
    else {
        //デュース有の設定の場合、アドバンテージを設定。またはアドバンテージからデュースに戻す
        if (enabledDeuce && winnerScore.pointCount === 40 && loserScore.pointCount === 40) {
            winnerScore.pointCount = "Ad";
        } else if (enabledDeuce && loserScore.pointCount === "Ad") {
            loserScore.pointCount = 40;
        }
        //デュースなしor上記2条件に該当しない場合、ゲーム数をカウントアップしポイントを0に
        else {
            winnerScore.pointCount = 0;
            loserScore.pointCount = 0;
            AddGameCount(winnerScore,loserScore);
        }
    }
}

const AddGameCount = (winnerScore:scoreType, loserScore:scoreType) => {
    //ゲームカウントを1上げる
    winnerScore.gameCount++;

    //タイブレークとなる場合の処理
    if(winnerScore.gameCount === 6 && loserScore.gameCount === 6){
        //タイブレークフラグON

    }
    //セット取得となる場合の処理
    else if ((winnerScore.gameCount === 6 && loserScore.gameCount < 5) || (winnerScore.gameCount === 7)){
        //ゲームカウントをリセット
        
        //セットカウントを上げる
    }
    /*
    通常処理　5-5まで 6-5 5-6 は処理なしで進む
    if
    タイブレークフラグオン 6-6
    セット取得 7-5 7-6 6-4 
    */
}

const AddSetCount = (winnerScore:scoreType, loserScore:scoreType) => {
    //セットカウントを1上げる
    winnerScore.gameCount++;
}

//PointSetの返却値設定処理
const PointReturnSet = (winnerScore:scoreType, loserScore:scoreType, pointGetSide:string):PointType["point"] => {
    //ポイント取得側とポイント失点側を設定
    let nextPoint: PointType["point"];

    if ( pointGetSide === "sideA" ) {
        nextPoint = {
            pointCountA: winnerScore.pointCount,
            gameCountA: winnerScore.gameCount,
            setCountA: winnerScore.setCount,
            pointCountB: loserScore.pointCount,
            gameCountB: loserScore.gameCount,
            setCountB: loserScore.setCount
        };
    } else {
        nextPoint = {
            pointCountA: loserScore.pointCount,
            gameCountA: loserScore.gameCount,
            setCountA: loserScore.setCount,
            pointCountB: winnerScore.pointCount,
            gameCountB: winnerScore.gameCount,
            setCountB: winnerScore.setCount,
        };
    }

    return nextPoint;
}
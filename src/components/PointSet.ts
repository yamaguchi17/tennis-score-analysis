import { PointType, scoreType } from "./common/AppTypes";
import { TIE_BREAK_MODE, DEUCE_MODE } from "./common/AppConst";

//設定
let ruleSettings = {
    enabledDeuce:true,              //デュースを適用するか
    enabledSemiAdvantage:false,     //セミアド(1度だけデュース)を適用するか
    enabledSemiAdDeuce:true,        //当該ゲームでデュース未実施ならtrue実施済みならfalse   ゲーム獲得時にリセット（enabledSemiAdvantageに合わせて切り替える）
    enabledTieBreakInMatch:false,   //試合にタイブレークを適用するか falseなら特定ゲーム数先取でセット獲得
    enabledTieBreakInGame:false,    //現在のゲームをタイブレークにするか  切替可能タイミングは0-0の時 ゲーム獲得時にリセット
    enabled2GamesBehind:false,      //2ゲーム差で1set取得にするか
    numberOfGames:6,                //1setのゲーム数
    numberOfTieBreakPoint:7,        //タイブレークのポイント数
}

let ruleSettings2 = {
    tieBreakMode:TIE_BREAK_MODE.TIE_BREAK,
    deuceMode:DEUCE_MODE.DEUCE,
    enabledTieBreak:false,
    enabledSemiAdDeuce:false,
    numberOfGames:6,
    numberOfTieBreakPoint:7,
}


//セットを強制終了する機能もつける

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
    // タイブレーク判定　タイブレークモードON　かつ　ゲームカウントが6-6の場合
    // または現在のゲームがタイブレークモードになった場合
    if((ruleSettings.enabledTieBreakInMatch && winnerScore.gameCount === ruleSettings.numberOfGames && loserScore.gameCount === ruleSettings.numberOfGames) || ruleSettings.enabledTieBreakInGame){
        winnerScore.pointCount = Number(winnerScore.pointCount) + 1;
        //タイブレーク取得のポイント数まで達したらゲーム獲得判定
        if(winnerScore.pointCount >= ruleSettings.numberOfTieBreakPoint){
            //セミアド
            // if(ruleSettings.enabledSemiAdvantage === true && ruleSettings.enabledSemiAdDeuce === true && ruleSettings.numberOfTieBreakPoint - Number(loserScore.pointCount) === 1){
            //     ruleSettings.enabledSemiAdDeuce = false;
            // }
            //デュースなしならそのままゲーム獲得
            //またはデュースありなら2ポイント差でゲーム獲得
            if(
                (ruleSettings.enabledDeuce === false)
                || (ruleSettings.enabledDeuce === true && (winnerScore.pointCount - Number(loserScore.pointCount)) >= 2)){
                AddGameCount(winnerScore,loserScore);
            }
        }

    }

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
        if (ruleSettings.enabledDeuce && winnerScore.pointCount === 40 && loserScore.pointCount === 40) {
            winnerScore.pointCount = "Ad";
        } else if (ruleSettings.enabledDeuce && loserScore.pointCount === "Ad") {
            loserScore.pointCount = 40;
        }
        //デュースなしor上記2条件に該当しない場合ゲーム獲得処理
        else {
            AddGameCount(winnerScore,loserScore);
        }
    }
}

const AddGameCount = (winnerScore:scoreType, loserScore:scoreType) => {
    //ポイントをリセットにする
    winnerScore.pointCount = 0;
    loserScore.pointCount = 0;
    //ゲームカウントを1上げる
    winnerScore.gameCount++;

    //セット取得となる場合の処理
    if (
        (winnerScore.gameCount === ruleSettings.numberOfGames && loserScore.gameCount < ruleSettings.numberOfGames - 1)
        || (ruleSettings.enabledTieBreakInMatch === true && winnerScore.gameCount === ruleSettings.numberOfGames + 1)
        || (ruleSettings.enabledTieBreakInMatch === false && winnerScore.gameCount === ruleSettings.numberOfGames)
        || (ruleSettings.enabledTieBreakInGame === true)){
        //セット取得処理
        AddSetCount(winnerScore,loserScore);
    }
    /*
    通常処理　5-5まで 6-5 5-6 は処理なしで進む
    if
    タイブレークフラグオン 6-6
    セット取得 7-5 7-6 6-4 
    */
}

const AddSetCount = (winnerScore:scoreType, loserScore:scoreType) => {
    //セットカウントにゲーム数を格納
    winnerScore.setCount.push(winnerScore.gameCount);
    loserScore.setCount.push(loserScore.gameCount);
    //ゲームカウントをリセット
    winnerScore.gameCount = 0;
    loserScore.gameCount = 0;
    
    /*
        考え直す
        表示
                4-6
        15      6-4     30
                2-3

        セット取得後
        ゲーム数を
        winnerScore.setCount[]
        winnerScore.setCount[4,6]
    
    */
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
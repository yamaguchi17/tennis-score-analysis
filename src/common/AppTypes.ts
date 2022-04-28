import { DEUCE_MODE, TIE_BREAK_MODE } from './AppConst';

type pointDetailType = {
    pointCountA: number | string,
    pointCountB: number | string,
    gameCountA: number,
    gameCountB: number,        
    setCountA: number[],
    setCountB: number[],
    enabledTieBreak: boolean,
    deuceCountInGame: number,
    serverSide: string,
    gameGetSide: string,
};

//ポイント管理の定義
export type PointType = {
    [index: string]: string | number | pointDetailType,
    pointID: number,
    serve: string,
    serveCource: string,
    serveType: string,
    pointCategory: string,
    shotType: string,
    shotSpinType: string,
    shotDetail: string,
    shotDetailCource: string,
    rallyCount: number,
    point: pointDetailType,
    pointGetSide: string,
};

// export type PointType = {
//     pointID: number;
//     serve: string;
//     serveCource: string;
//     serveType: string;
//     pointCategory: string;
//     shotType: string;
//     shotSpinType: string;
//     shotDetail: string;
//     shotDetailCource: string;
//     rallyCount: number;
//     point: {
//         pointCountA: number | string;
//         pointCountB: number | string;
//         gameCountA: number;
//         gameCountB: number;        
//         setCountA: number[];
//         setCountB: number[];
//         enabledTieBreak: boolean;
//         deuceCountInGame: number;
//         serverSide: string;
//     };
//     pointGetSide: string;
// };



//スコア計算の型定義
export type scoreType = {
    pointCount: number | string,
    gameCount: number,
    setCount: number[],
}

//ルール設定の型定義
export type ruleSetType = {
    tieBreakMode: string,
    deuceMode: string,
    numberOfGames: string,
    numberOfTieBreakPoint: string,
    playerNameA: string,
    playerNameB: string,
    selectedServer: string,
}

//--DBテーブル用定義-------------------------//

// export type globalRuleSetType = {
//   userId:string,
//   data:ruleSetType,
// }

//グローバルstateテーブルの型定義
export type globalStateType = {
    userId: string,
    isLoggedIn: boolean,
    isRecording: boolean,
    recodingMatchId: number,
    displayResultId: number,
}

//グローバルルールテーブルの型定義
export type globalRuleSetType = {userId:string} & ruleSetType;

//マッチデータテーブルの型定義
export type MatchDataType = {
  id?:number,
  currentPointId: number,
  data:PointType[],
}

//リザルトデータテーブルのbaseDataの型定義
type ResultBaseDataType = {
    macthName: string,
    macthDate: Date,
    player1Name: string,
    player2Name: string,
    gameCount: number[][], 
    totalPoint: number,
  }

//リザルトデータテーブルのstatuデータの要素の型定義
type valueAndRateType = {
    value: number,
    rate: string,
    rateType: string,
}

//リザルトデータテーブルのstatuデータの型定義
export type resultDataStatuType = {
    //基本スタッツ
    pointWon: valueAndRateType,
    error: valueAndRateType,
    winner: valueAndRateType,
    nieceShot: valueAndRateType,
    totalPointWon: valueAndRateType,
    //サーブ
    serveCount: valueAndRateType,
    serviceAce: valueAndRateType,
    doubleFault: valueAndRateType,
    serve1stIn: valueAndRateType,
    serve2ndIn: valueAndRateType,
    serve1stWon: valueAndRateType,
    serve2ndWon: valueAndRateType,
    //ラリー数
    rally5orUnderWon: valueAndRateType,
    rallyOver5Won: valueAndRateType,
    //ショット別
    serveWon: valueAndRateType,
    returnWon: valueAndRateType,
    returnError: valueAndRateType,
    strokeWon: valueAndRateType,
    strokeError: valueAndRateType,
    volleyWon: valueAndRateType,
    volleyError: valueAndRateType,
    smashWon: valueAndRateType,
    smashError: valueAndRateType,
    lobWon: valueAndRateType,
    lobError: valueAndRateType,
    dropWon: valueAndRateType,
    dropError: valueAndRateType,
    //サーブ割合
    serveCourceWide: valueAndRateType,
    serveCourceBody: valueAndRateType,
    serveCourceCenter: valueAndRateType,
    serveCourceFore: valueAndRateType,
    serveCourceBack: valueAndRateType,
    serveTypeFlat: valueAndRateType,
    serveTypeSlice: valueAndRateType,
    serveTypeSpin: valueAndRateType,
    serveTypeTopSlice: valueAndRateType,
    //ファア・バック
    foreReturnWon: valueAndRateType,
    foreReturnError: valueAndRateType,
    backReturnWon: valueAndRateType,
    backReturnError: valueAndRateType,
    foreStrokeWon: valueAndRateType,
    foreStrokeError: valueAndRateType,
    backStrokeWon: valueAndRateType,
    backStrokeError: valueAndRateType,
    foreVolleyWon: valueAndRateType,
    foreVolleyError: valueAndRateType,
    backVolleyWon: valueAndRateType,
    backVolleyError: valueAndRateType, 
    //回転種別
    spinWon: valueAndRateType,
    spinError: valueAndRateType,
    sliceWon: valueAndRateType,
    sliceError: valueAndRateType,
    flatWon: valueAndRateType,
    flatError: valueAndRateType,  
    //コース
    crossWon: valueAndRateType,
    crossError: valueAndRateType,
    straightWon: valueAndRateType,
    straightError: valueAndRateType,
    centerWon: valueAndRateType,
    centerError: valueAndRateType,
}

//リザルトデータテーブルの型定義
export type ResultDataType = {
  id:number,
  baseData: ResultBaseDataType,
  statuPlayer1:resultDataStatuType,
  statuPlayer2:resultDataStatuType,
}



//--型のデフォルト値-------------------------//

//PointTypeのデフォルト値を渡す
export const pointDefaultData = () => {
    const pointDefaultArray:PointType[] = [{
        pointID: 0,
        serve: '',
        serveCource: '',
        serveType: '',
        pointCategory: '',
        shotType: '',
        shotSpinType: '',
        shotDetail: '',
        shotDetailCource: '',
        rallyCount: 0,
        point: {
            pointCountA: 0,
            pointCountB: 0,
            gameCountA: 0,
            gameCountB: 0,
            setCountA: [],
            setCountB: [],
            enabledTieBreak: false,
            deuceCountInGame: 0,
            serverSide: '',
            gameGetSide: '',
        },
        pointGetSide: '',
    }];
    return(pointDefaultArray);
}

//globalStateTypeのデフォルト値を渡す
export const globalStateDefaultDataGet = () => {
    const globalStateData:globalStateType = {
        userId: "0",
        isLoggedIn: false,
        isRecording: false,
        recodingMatchId: 0,
        displayResultId: 0,
    };
    return(globalStateData);
}


//ruleSetTypeのデフォルト値を渡す
export const ruleSetDefaultDataGet = () => {
    const ruleSetData:globalRuleSetType = {
        userId: "0",
        tieBreakMode:TIE_BREAK_MODE.TIE_BREAK,
        deuceMode:DEUCE_MODE.DEUCE,
        numberOfGames: "6",
        numberOfTieBreakPoint: "7",
        playerNameA : "playerA",
        playerNameB : "playerB",
        selectedServer: 'player1',
    };
    return(ruleSetData);
}

//ResultBaseDataTypeのデフォルト値を渡す
export const ResultBaseDefaultDataGet = () => {
    const ResultBaseData:ResultBaseDataType = {
        macthName: "",
        macthDate: new Date(),
        player1Name: "",
        player2Name: "",
        gameCount: [[]],
        totalPoint: 0,
    };
    return(ResultBaseData);
}

//resultDataStatuTypeのデフォルト値を渡す
// const StatuTypeBasic = {value:0, rate:"", rateType:"basic"};
// const StatuTypeExtra = {value:0, rate:"", rateType:"extra"};
// const StatuTypeServe = {value:0, rate:"", rateType:"serve"};
export const resultDataStatuDefaultDataGet = () => {
    const resultDataStatu:resultDataStatuType = {
        //基本スタッツ
        pointWon: {value:0, rate:"", rateType:"basic"},
        error: {value:0, rate:"", rateType:"basic"},
        winner: {value:0, rate:"", rateType:"basic"},
        nieceShot: {value:0, rate:"", rateType:"basic"},
        totalPointWon: {value:0, rate:"", rateType:"basic"},
        //サーブ
        serveCount: {value:0, rate:"", rateType:"basic"},
        serviceAce: {value:0, rate:"", rateType:"basic"},
        doubleFault: {value:0, rate:"", rateType:"basic"},
        serve1stIn: {value:0, rate:"", rateType:"serve"},
        serve2ndIn: {value:0, rate:"", rateType:"extra"},
        serve1stWon: {value:0, rate:"", rateType:"extra"},
        serve2ndWon: {value:0, rate:"", rateType:"extra"},
        //ラリー数
        rally5orUnderWon: {value:0, rate:"", rateType:"basic"},
        rallyOver5Won: {value:0, rate:"", rateType:"basic"},
        //ショット別
        serveWon: {value:0, rate:"", rateType:"basic"},
        returnWon: {value:0, rate:"", rateType:"basic"},
        returnError: {value:0, rate:"", rateType:"basic"},
        strokeWon: {value:0, rate:"", rateType:"basic"},
        strokeError: {value:0, rate:"", rateType:"basic"},
        volleyWon: {value:0, rate:"", rateType:"basic"},
        volleyError: {value:0, rate:"", rateType:"basic"},
        smashWon: {value:0, rate:"", rateType:"basic"},
        smashError: {value:0, rate:"", rateType:"basic"},
        lobWon: {value:0, rate:"", rateType:"basic"},
        lobError: {value:0, rate:"", rateType:"basic"},
        dropWon: {value:0, rate:"", rateType:"basic"},
        dropError: {value:0, rate:"", rateType:"basic"},
        //サーブ割合
        serveCourceWide: {value:0, rate:"", rateType:"serve"},
        serveCourceBody: {value:0, rate:"", rateType:"serve"},
        serveCourceCenter: {value:0, rate:"", rateType:"serve"},
        serveCourceFore: {value:0, rate:"", rateType:"serve"},
        serveCourceBack: {value:0, rate:"", rateType:"serve"},
        serveTypeFlat: {value:0, rate:"", rateType:"serve"},
        serveTypeSlice: {value:0, rate:"", rateType:"serve"},
        serveTypeSpin: {value:0, rate:"", rateType:"serve"},
        serveTypeTopSlice: {value:0, rate:"", rateType:"serve"},
        //ファア・バック
        foreReturnWon: {value:0, rate:"", rateType:"basic"},
        foreReturnError: {value:0, rate:"", rateType:"basic"},
        backReturnWon: {value:0, rate:"", rateType:"basic"},
        backReturnError: {value:0, rate:"", rateType:"basic"},
        foreStrokeWon: {value:0, rate:"", rateType:"basic"},
        foreStrokeError: {value:0, rate:"", rateType:"basic"},
        backStrokeWon: {value:0, rate:"", rateType:"basic"},
        backStrokeError: {value:0, rate:"", rateType:"basic"},
        foreVolleyWon: {value:0, rate:"", rateType:"basic"},
        foreVolleyError: {value:0, rate:"", rateType:"basic"},
        backVolleyWon: {value:0, rate:"", rateType:"basic"},
        backVolleyError: {value:0, rate:"", rateType:"basic"}, 
        //回転種別
        spinWon: {value:0, rate:"", rateType:"basic"},
        spinError: {value:0, rate:"", rateType:"basic"},
        sliceWon: {value:0, rate:"", rateType:"basic"},
        sliceError: {value:0, rate:"", rateType:"basic"},
        flatWon: {value:0, rate:"", rateType:"basic"},
        flatError: {value:0, rate:"", rateType:"basic"},  
        //コース
        crossWon: {value:0, rate:"", rateType:"basic"},
        crossError: {value:0, rate:"", rateType:"basic"},
        straightWon: {value:0, rate:"", rateType:"basic"},
        straightError: {value:0, rate:"", rateType:"basic"},
        centerWon: {value:0, rate:"", rateType:"basic"},
        centerError: {value:0, rate:"", rateType:"basic"},
    };
    return(resultDataStatu);
}

export const resultDefaultDataGet = () => {
    const resultData:ResultDataType = {
        id:0,
        baseData: ResultBaseDefaultDataGet(),
        statuPlayer1:resultDataStatuDefaultDataGet(),
        statuPlayer2:resultDataStatuDefaultDataGet(),
    };
    return(resultData);
}
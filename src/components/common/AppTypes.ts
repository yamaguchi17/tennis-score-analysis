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

//グローバルstateの型定義
export type globalStateType = {
    userId: string,
    isLoggedIn: boolean,
    isRecording: boolean,
    recodingMatchId: number,
    displayResultId: number,
}

export type globalRuleSetType = {userId:string} & ruleSetType;

export type MatchDataType = {
  id?:number,
  currentPointId: number,
  data:PointType[],
}

type valueAndRateType = {
    value: number,
    rate: string,
    rateType: string,
}

type resultDataStatuType = {
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
    rally5orUnderError: valueAndRateType,
    rallyOver5Won: valueAndRateType,
    rallyOver5Error: valueAndRateType,
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

export type ResultDataType = {
  id:number,
  baseData:{
    macthName: string,
    macthDate: Date,
    player1Name: string,
    player2Name: string,
    gameCount: number[][], 
    totalPoint: number,
  },
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



const StatuTypeBasic = {value:0, rate:"", rateType:"basic"};
const StatuTypeExtra = {value:0, rate:"", rateType:"extra"}

//resultDataStatuTypeのデフォルト値を渡す
export const resultDataStatuDefaultDataGet = () => {
    const resultDataStatu:resultDataStatuType = {
        //基本スタッツ
        pointWon: StatuTypeBasic,
        error: StatuTypeBasic,
        winner: StatuTypeBasic,
        nieceShot: StatuTypeBasic,
        totalPointWon: StatuTypeBasic,
        //サーブ
        serveCount: StatuTypeBasic,
        serviceAce: StatuTypeBasic,
        doubleFault: StatuTypeBasic,
        serve1stIn: StatuTypeExtra,
        serve2ndIn: StatuTypeExtra,
        serve1stWon: StatuTypeExtra,
        serve2ndWon: StatuTypeExtra,
        //ラリー数
        rally5orUnderWon: StatuTypeBasic,
        rally5orUnderError: StatuTypeBasic,
        rallyOver5Won: StatuTypeBasic,
        rallyOver5Error: StatuTypeBasic,
        //ショット別
        serveWon: StatuTypeBasic,
        returnWon: StatuTypeBasic,
        returnError: StatuTypeBasic,
        strokeWon: StatuTypeBasic,
        strokeError: StatuTypeBasic,
        volleyWon: StatuTypeBasic,
        volleyError: StatuTypeBasic,
        smashWon: StatuTypeBasic,
        smashError: StatuTypeBasic,
        lobWon: StatuTypeBasic,
        lobError: StatuTypeBasic,
        dropWon: StatuTypeBasic,
        dropError: StatuTypeBasic,
        //サーブ割合
        serveCourceWide: StatuTypeExtra,
        serveCourceBody: StatuTypeExtra,
        serveCourceCenter: StatuTypeExtra,
        serveCourceFore: StatuTypeExtra,
        serveCourceBack: StatuTypeExtra,
        serveTypeFlat: StatuTypeExtra,
        serveTypeSlice: StatuTypeExtra,
        serveTypeSpin: StatuTypeExtra,
        serveTypeTopSlice: StatuTypeExtra,
        //ファア・バック
        foreReturnWon: StatuTypeBasic,
        foreReturnError: StatuTypeBasic,
        backReturnWon: StatuTypeBasic,
        backReturnError: StatuTypeBasic,
        foreStrokeWon: StatuTypeBasic,
        foreStrokeError: StatuTypeBasic,
        backStrokeWon: StatuTypeBasic,
        backStrokeError: StatuTypeBasic,
        foreVolleyWon: StatuTypeBasic,
        foreVolleyError: StatuTypeBasic,
        backVolleyWon: StatuTypeBasic,
        backVolleyError: StatuTypeBasic, 
        //回転種別
        spinWon: StatuTypeBasic,
        spinError: StatuTypeBasic,
        sliceWon: StatuTypeBasic,
        sliceError: StatuTypeBasic,
        flatWon: StatuTypeBasic,
        flatError: StatuTypeBasic,  
        //コース
        crossWon: StatuTypeBasic,
        crossError: StatuTypeBasic,
        straightWon: StatuTypeBasic,
        straightError: StatuTypeBasic,
        centerWon: StatuTypeBasic,
        centerError: StatuTypeBasic,
    };
    return(resultDataStatu);
}
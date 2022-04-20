import { DEUCE_MODE, TIE_BREAK_MODE } from './AppConst';

export type point = {
    pointCountA: number | string;
    pointCountB: number | string;
    gameCountA: number;
    gameCountB: number;        
    setCountA: number[];
    setCountB: number[];
    enabledTieBreak: boolean;
    deuceCountInGame: number;
    serverSide: string;
};

//ポイント管理の定義
export type PointType = {
    [index: string]: string | number | point;
    pointID: number;
    serve: string;
    serveCource: string;
    serveType: string;
    pointCategory: string;
    shotType: string;
    shotSpinType: string;
    shotDetail: string;
    shotDetailCource: string;
    rallyCount: number;
    point: {
        pointCountA: number | string;
        pointCountB: number | string;
        gameCountA: number;
        gameCountB: number;        
        setCountA: number[];
        setCountB: number[];
        enabledTieBreak: boolean;
        deuceCountInGame: number;
        serverSide: string;
    };
    pointGetSide: string;
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

//Resultデータの定義
export type ResultType = {
    resultId: number,
    matchName: string,
};

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

export type ResultDataType = {
  id:number,
  data:ResultType,
}



//--型のデフォルト値-------------------------//

//PointTypeのデフォルト値を渡す
export const pointDefaultData = () => {
    const pointDefaultArray:PointType[] = [{
        // pointID:0,
        // point:{
        //     pointCountA:0,
        //     pointCountB:0,
        //     gameCountA:0,
        //     gameCountB:0,
        //     setCountA:[],
        //     setCountB:[],
        //     enabledTieBreak:false,
        //     deuceCountInGame:0,
        //     serverSide:''
        // }
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
            serverSide: ''
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
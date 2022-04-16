//ポイント管理の定義
export type PointType = {
    pointID: number;
    serve?: string;
    serveCource?: string;
    serveType?: string;
    pointCategory?: string;
    shotType?: string;
    shotSpinType?: string;
    shotDetail?: string;
    shotDetailCource?: string;
    rallyCount?: number;
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
    pointGetSide?: string;
};

//PointTypeのデフォルト値を渡す
export const pointDefaultData = () => {
    const pointDefaultArray:PointType[] = [{
        pointID:0,
        point:{
            pointCountA:0,
            pointCountB:0,
            gameCountA:0,
            gameCountB:0,
            setCountA:[],
            setCountB:[],
            enabledTieBreak:false,
            deuceCountInGame:0,
            serverSide:''
        }
    }];
    return(pointDefaultArray);
}

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
    playerNameA: String,
    playerNameB: String,
    selectedServer: String,
}

//グローバルstateの型定義
export type globalStateType = {
    userId: string,
    isLoggedIn: boolean,
    isRecording: boolean,
    recodingMatchId: number,
    displayResultId: number,
}

//ポイント管理の定義
export type ResultType = {
    resultId: number,
    matchName: string,
};
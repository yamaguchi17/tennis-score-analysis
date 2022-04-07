//point型定義
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
    point: {
        pointCountA: number | string;
        pointCountB: number | string;
        gameCountA: number;
        gameCountB: number;        
        setCountA: number[];
        setCountB: number[];
        enabledTieBreak: boolean;
        deuceCountInGame: number;
    };
    pointGetSide?: string;
};

//スコア計算用の型定義
export type scoreType = {
    pointCount: number | string,
    gameCount: number,
    setCount: number[],
}

export type ruleSetType = {
    tieBreakMode: string,
    deuceMode: string,
    numberOfGames: string,
    numberOfTieBreakPoint: string,
    // enabledTieBreak: boolean,
    // enabledSemiAdDeuce: boolean,    
}
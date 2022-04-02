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
    };
    pointGetSide?: string;
};

//スコア計算用の型定義
export type scoreType = {
    pointCount: number | string,
    gameCount: number,
    setCount: number[],
}
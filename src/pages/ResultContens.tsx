import { useState, useLayoutEffect, useContext } from "react";
import { ResultDataType, resultDataStatuType, resultDefaultDataGet} from '../common/AppTypes';
import { matchDataDBupdate } from '../common/AppFunctions';
import { db } from "../common/db";
import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { format } from "date-fns";


export const ResultContens: React.VFC = () => {
  
    //context
    const { globalState, setGlobalState } = useContext(GlobalStateContext);

    const [resultData, setResultData] = useState<ResultDataType>(resultDefaultDataGet());
    
    useLayoutEffect(()=>{
        db.resultData.get(globalState.displayResultId)
        .then((rd)=>{
            if(rd !== undefined) setResultData(rd);
        });
    },[]);

    return (
        <>
            <p>結果表示</p>
            <p>{resultData.id}</p>
            <p>{resultData.baseData.macthName}</p>
            <p>{format(resultData.baseData.macthDate, 'yyyy-MM-dd')}</p>
            <p>{resultData.baseData.player1Name}</p>
            <p>{resultData.baseData.player2Name}</p>
            <p>gameCount: {resultData.baseData.gameCount.flat()}</p>
            <p>totalPoint: {resultData.baseData.totalPoint}</p>
            <Statu resultData={resultData}/>
            {JSON.stringify(resultData)}
        </>
    )
}

type Props = {
    resultData: ResultDataType
}

const Statu: React.VFC<Props> = ({resultData})=> {
    const contents = Object.entries(resultData.statuPlayer1).map(([ key, val1 ]) => {
        //player2側を設定
        const keyName: keyof resultDataStatuType = key as keyof resultDataStatuType;
        const val2 = resultData.statuPlayer2[keyName];

        return (
            <div key={key}>
                <p>{key}</p>
                <div style={{display:'flex'}}>
                    <ul>
                        <li key={key+"1value"}>{val1.value}</li>
                        <li key={key+"1rate"}>{val1.rate}</li>
                    </ul>
                    <ul>
                        <li key={key+"2value"}>{val2.value}</li>
                        <li key={key+"2rate"}>{val2.rate}</li>
                    </ul>
                </div>   
            </div>
        );

    });

    return <div>{contents}</div>
};
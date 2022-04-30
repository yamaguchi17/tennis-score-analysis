import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { ResultDataType, resultDataStatuType, resultDefaultDataGet} from '../common/AppTypes';
import { db } from "../common/db";
import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { format } from "date-fns";
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography';


export const ResultContens: React.VFC = () => {
  
    //context
    const { globalState, setGlobalState } = useContext(GlobalStateContext);
    const [ resultData, setResultData ] = useState<ResultDataType>(resultDefaultDataGet());
    
    //DB読み込み
    useLayoutEffect(()=>{
        db.resultData.get(globalState.displayResultId)
        .then((rd)=>{
            if(rd !== undefined) setResultData(rd);
        });
    },[]);

    //スクロール位置をトップへ戻す
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div style={{width:'22rem'}}>
            <Typography style={{textAlign:'center', marginTop:'1rem'}} variant="h6" component="h2">{resultData.baseData.macthName}</Typography>
            <p style={{textAlign:'right'}}>{format(resultData.baseData.macthDate, 'yyyy-MM-dd')}</p>
            <div style={{display:'flex'}}>
                <p style={{display:'inline-block', width:'33%', textAlign:'center', fontSize:'1.2rem',fontWeight:'bold', color:'hsla(209, 78%, 46%, 1)'}}>{resultData.baseData.player1Name}</p>
                <ul style={{textAlign:'center',padding:'1.2rem 0 1rem 0', margin:0, width:'33%'}}>
                    {resultData.baseData.gameCount.map((value,index)=>{
                        return <li key={"gameCount"+index} style={{listStyle:'none'}}>{value[0]} - {value[1]}</li>
                    })}
                </ul>
                <p style={{display:'inline-block', width:'33%', textAlign:'center', fontSize:'1.2rem', fontWeight:'bold', color:'hsla(92, 78%, 46%, 1)'}}>{resultData.baseData.player2Name}</p>
            </div>
            <p style={{textAlign:'center'}}>totalPoint: {resultData.baseData.totalPoint}</p>
            <Statu resultData={resultData}/>
            <pre>{JSON.stringify(resultData, null,  4)}</pre>
        </div>
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

        let p1Display = "";
        let p2Display = "";

        if(val1.rateType === 'basic'){
            p1Display = String(val1.value);
            p2Display = String(val2.value);
        } else if(val1.rateType === 'serve'){
            p1Display = `${val1.rate}%(${String(val1.value)}/${String(resultData.statuPlayer1.serveCount.value)})`;
            p2Display = `${val2.rate}%(${String(val2.value)}/${String(resultData.statuPlayer2.serveCount.value)})`;
        } else{
            if(key === 'serve2ndIn'){
                p1Display = `${val1.rate}%(${String(val1.value)}/${String(resultData.statuPlayer1.serveCount.value - resultData.statuPlayer1.serve1stIn.value)})`;
                p2Display = `${val2.rate}%(${String(val2.value)}/${String(resultData.statuPlayer2.serveCount.value - resultData.statuPlayer2.serve1stIn.value)})`;
            } else if(key === 'serve1stWon'){
                p1Display = `${val1.rate}%(${String(val1.value)}/${String(resultData.statuPlayer1.serve1stIn.value)})`;
                p2Display = `${val2.rate}%(${String(val2.value)}/${String(resultData.statuPlayer2.serve1stIn.value)})`;                
            } else if(key === 'serve2ndWon'){
                p1Display = `${val1.rate}%(${String(val1.value)}/${String(resultData.statuPlayer1.serve2ndIn.value)})`;
                p2Display = `${val2.rate}%(${String(val2.value)}/${String(resultData.statuPlayer2.serve2ndIn.value)})`;  
            }
    }

        return (
            <div key={key}>
                <p style={{textAlign:'center', margin:'2rem 0 0.5rem 0'}}>{key}</p>
                <div style={{display:'flex'}}>
                    <SUl>
                        <SLivalue key={key+"1value"}>{p1Display}</SLivalue>
                        <SLiRate key={key+"1rate"} style={{maxWidth:val1.rate+'%',backgroundColor:'hsla(209, 78%, 46%, 1)', margin:'0 0 0 auto'}}>{val1.rate}</SLiRate>
                    </SUl>
                    <SUl>
                        <SLivalue key={key+"2value"} style={{textAlign:'right'}}>{p2Display}</SLivalue>
                        <SLiRate key={key+"2rate"} style={{maxWidth:val1.rate+'%',backgroundColor:'hsla(92, 78%, 46%, 1)'}}>{val2.rate}</SLiRate>
                    </SUl>
                </div>   
            </div>
        );

    });

    return <>{contents}</>
};

const SUl = styled.div`
    width: 50%;
    height: 1.0rem;
    background-color: #eee;
    padding: 0;
    margin: 0;
`;

const SLivalue = styled.div`
    display: block;
    position: relative;
    top: -1.9rem;
`;

const SLiRate = styled.div`  
    height: 1.0rem;
    display: block;
    position: relative;
    top: -1.5rem;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
`;


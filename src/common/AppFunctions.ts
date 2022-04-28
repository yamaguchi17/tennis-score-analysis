import { PointType } from './AppTypes';
import { db } from "./db";

//DB_matchDataテーブル更新関数
export const matchDataDBupdate = (name:string, value:string|number, id:number) => {
    db.matchData.get({id}).then((md)=>{
        if(md !== undefined){
            const newData:PointType[] = JSON.parse(JSON.stringify(md.data));
            const keyName: keyof PointType = name as keyof PointType;
            newData[md.currentPointId][keyName] = value;
            db.matchData.update(id,{data:newData});
        }
    });
};
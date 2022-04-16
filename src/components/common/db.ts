import Dexie, { Table } from 'dexie'
import {globalStateType,ruleSetType,PointType,ResultType} from './AppTypes'

// export interface Friend {
//   id?: number
//   name: string
//   age: number
// }

//サンプルコード
export type Friend = {
  id?: number
  name: string
  age: number
}

export type globalRuleSetType = {
  userId:string,
  data:ruleSetType,
}

type MatchDataType = {
  id?:number,
  data:PointType[],
}

type ResultDataType = {
  id:number,
  data:ResultType,
}

//テスト
type testType = {
  id?:number,
  data:string,
}


export class MySubClassedDexie extends Dexie {
  // テーブルの型を定義
  friends!: Table<Friend>
  globalState!: Table<globalStateType>
  ruleSettings!: Table<globalRuleSetType>
  matchData!: Table<MatchDataType>
  resultData!: Table<ResultDataType>
  testData!: Table<testType>

  constructor() {
    // IndexDBでの名前を設定
    super('TSADatabase')

    // DBの初期化
    this.version(1).stores({
      friends: '++id, name, age',
      globalState:'userId, isLoggedIn, isRecording, recodingMatchId, displayResultId',
      ruleSettings:'userId, data',
      matchData:'++id, data',
      resultData:'id, data',
      testData:'++id, data',
    })
  }
}

export const db = new MySubClassedDexie()
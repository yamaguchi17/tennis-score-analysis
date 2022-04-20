import Dexie, { Table } from 'dexie';
import {globalStateType,globalRuleSetType,MatchDataType,ResultDataType} from './AppTypes';

//サンプルコード
export interface Friend {
  id?: number;
  name: string;
  age: number;
}

export class MySubClassedDexie extends Dexie {
  // テーブルの型を定義
  globalState!: Table<globalStateType>;
  ruleSettings!: Table<globalRuleSetType>;
  matchData!: Table<MatchDataType>;
  resultData!: Table<ResultDataType>;
  //サンプルコード
  friends!: Table<Friend>;

  constructor() {
    // IndexDBでの名前を設定
    super('TSADatabase')

    // DBの初期化
    this.version(1).stores({
      globalState:'userId, isLoggedIn, isRecording, recodingMatchId, displayResultId',
      ruleSettings:'userId, tieBreakMode, deuceMode, numberOfGames, numberOfTieBreakPoint, playerNameA, playerNameB, selectedServer',
      matchData:'++id, currentPointId, data',
      resultData:'id, data',
    })
  }
}

export const db = new MySubClassedDexie()
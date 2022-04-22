import { useState, useLayoutEffect, useContext } from "react";
import { GlobalStateContext } from "./providers/GlobalStateProvider";

export const Result = () => {

  /*記録中の場合
  計算しDBに保存 非同期処理 await しない
  then( 記録中を解除)
  
  return ロード画面  
  */

  /*記録中じゃない場合
  下のreturnでResult画面の表示をする
  */

  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  const [ isCompleted, setIsCompleted ]  = useState(false);

  //Recordで入力されたデータを計算
  if(!globalState.displayResultId) {
    //ローディング画面を表示するコンポーネントを作成
    return (
      <>
        <h2>処理中</h2>
      </>
    );

  }
  //対象のResultDataを表示
  else {
    //
    return (
      <>
        <h2>Result</h2>
      </>
    );    
  }




}
import { LANG_TYPES } from "../common/AppConst";

//言語ごとの表示文字列返却関数
export const WordsLang = (lang:number, name:string):string => {
    let str:string = "";

    switch (name) {
        //基本スタッツ
        case "pointWon":
            lang === LANG_TYPES.JP ? str = "ウィナー ＋ ナイスショット" : str = "Winner + Niece Shot";
            break;
        case "error":
            lang === LANG_TYPES.JP ? str = "エラー" : str = "Error";
            break;
        case "winner":
            lang === LANG_TYPES.JP ? str = "ウィナー" : str = "Winner";
            break;
        case "nieceShot":
            lang === LANG_TYPES.JP ? str = "ナイスショット" : str = "Niece Shot";
            break;
        case "totalPointWon":
            lang === LANG_TYPES.JP ? str = "合計獲得ポイント" : str = "Total Point Won";
            break;
        //サーブ            
        case "serveCount":
            lang === LANG_TYPES.JP ? str = "サーブ回数" : str = "Serve Count";
            break;
        case "serviceAce":
            lang === LANG_TYPES.JP ? str = "サービスエース" : str = "Service Ace";
            break;
        case "doubleFault":
            lang === LANG_TYPES.JP ? str = "ダブルフォルト" : str = "Double Fault";
            break;
        case "serve1stIn":
            lang === LANG_TYPES.JP ? str = "1stサーブ確率" : str = "1st Serve In";
            break;
        case "serve2ndIn":
            lang === LANG_TYPES.JP ? str = "2ndサーブ確率" : str = "2nd Serve In";
            break;
        case "serve1stWon":
            lang === LANG_TYPES.JP ? str = "1stサーブ時の得点" : str = "1st Serve Won";
            break;
        case "serve2ndWon":
            lang === LANG_TYPES.JP ? str = "2ndサーブ時の得点" : str = "2nd Serve Won";
            break;
        //ラリー数            
        case "rally5orUnderWon":
            lang === LANG_TYPES.JP ? str = "ラリー5回以下の得点" : str = "Rally 5 or Under Won";
            break;
        case "rallyOver5Won":
            lang === LANG_TYPES.JP ? str = "ラリー6回以上の得点" : str = "Rally Over 5 Won";
            break;
        //ショット別            
        case "serveWon":
            lang === LANG_TYPES.JP ? str = "サーブ得点" : str = "Serve Won";
            break;
        case "returnWon":
            lang === LANG_TYPES.JP ? str = "リターン得点" : str = "Return Won";
            break;
        case "returnError":
            lang === LANG_TYPES.JP ? str = "リターンエラー" : str = "Return Error";
            break;
        case "strokeWon":
            lang === LANG_TYPES.JP ? str = "ストローク得点" : str = "Stroke Won";
            break;
        case "strokeError":
            lang === LANG_TYPES.JP ? str = "ストロークエラー" : str = "Stroke Error";
            break;
        case "volleyWon":
            lang === LANG_TYPES.JP ? str = "ボレー得点" : str = "Volley Won";
            break;
        case "volleyError":
            lang === LANG_TYPES.JP ? str = "ボレーエラー" : str = "Volley Error";
            break;
        case "smashWon":
            lang === LANG_TYPES.JP ? str = "スマッシュ得点" : str = "Smash Won";
            break;
        case "smashError":
            lang === LANG_TYPES.JP ? str = "スマッシュエラー" : str = "Smash Error";
            break;
        case "lobWon":
            lang === LANG_TYPES.JP ? str = "ロブ得点" : str = "Lob Won";
            break;
        case "lobError":
            lang === LANG_TYPES.JP ? str = "ロブエラー" : str = "Lob Error";
            break;
        case "dropWon":
            lang === LANG_TYPES.JP ? str = "ドロップ得点" : str = "Drop Won";
            break;
        case "dropError":
            lang === LANG_TYPES.JP ? str = "ドロップエラー" : str = "Drop Error";
            break;
        //サーブ割合            
        case "serveCourceWide":
            lang === LANG_TYPES.JP ? str = "サーブコース：ワイド" : str = "Serve Cource Wide";
            break;
        case "serveCourceBody":
            lang === LANG_TYPES.JP ? str = "サーブコース：ボディ" : str = "Serve Cource Body";
            break;
        case "serveCourceCenter":
            lang === LANG_TYPES.JP ? str = "サーブコース：センター" : str = "Serve Cource Center";
            break;
        case "serveCourceFore":
            lang === LANG_TYPES.JP ? str = "サーブコース：フォア" : str = "Serve Cource Fore";
            break;
        case "serveCourceBack":
            lang === LANG_TYPES.JP ? str = "サーブコース：バック" : str = "Serve Cource Back";
            break;    
        case "serveTypeFlat":
            lang === LANG_TYPES.JP ? str = "サーブ：フラット" : str = "Serve Type Flat";
            break;
        case "serveTypeSlice":
            lang === LANG_TYPES.JP ? str = "サーブ：スライス" : str = "Serve Type Slice";
            break;
        case "serveTypeSpin":
            lang === LANG_TYPES.JP ? str = "サーブ：スピン" : str = "Serve Type Spin";
            break;
        case "serveTypeTopSlice":
            lang === LANG_TYPES.JP ? str = "サーブ:トップスライス" : str = "Serve Type TopSlice";
            break;
        //ファア・バック
        case "foreReturnWon":
            lang === LANG_TYPES.JP ? str = "フォアリターン得点" : str = "Fore Return Won";
            break;
        case "foreReturnError":
            lang === LANG_TYPES.JP ? str = "フォアリターンエラー" : str = "Fore Return Error";
            break;
        case "backReturnWon":
            lang === LANG_TYPES.JP ? str = "バックリターン得点" : str = "Back Return Won";
            break;
        case "backReturnError":
            lang === LANG_TYPES.JP ? str = "バックリターンエラー" : str = "Back Return Error";
            break;
        case "foreStrokeWon":
            lang === LANG_TYPES.JP ? str = "フォアストローク得点" : str = "Fore Stroke Won";
            break;
        case "foreStrokeError":
            lang === LANG_TYPES.JP ? str = "フォアストロークエラー" : str = "Fore Stroke Error";
            break;
        case "backStrokeWon":
            lang === LANG_TYPES.JP ? str = "バックストローク得点" : str = "Back Stroke Won";
            break;
        case "backStrokeError":
            lang === LANG_TYPES.JP ? str = "バックストロークエラー" : str = "Back Stroke Error";
            break;
        case "foreVolleyWon":
            lang === LANG_TYPES.JP ? str = "フォアボレー得点" : str = "Fore Volley Won";
            break;
        case "foreVolleyError":
            lang === LANG_TYPES.JP ? str = "フォアボレーエラー" : str = "Fore Volley Error";
            break;
        case "backVolleyWon":
            lang === LANG_TYPES.JP ? str = "バックボレー得点" : str = "Back Volley Won";
            break;
        case "backVolleyError":
            lang === LANG_TYPES.JP ? str = "バックボレーエラー" : str = "Back Volley Error";
            break;
        //回転種別            
        case "spinWon":
            lang === LANG_TYPES.JP ? str = "球種：スピン得点" : str = "Spin Won";
            break;
        case "spinError":
            lang === LANG_TYPES.JP ? str = "球種：スピンエラー" : str = "Spin Error";
            break;
        case "sliceWon":
            lang === LANG_TYPES.JP ? str = "球種：スライス得点" : str = "Slice Won";
            break;
        case "sliceError":
            lang === LANG_TYPES.JP ? str = "球種：スライスエラー" : str = "Slice Error";
            break;
        case "flatWon":
            lang === LANG_TYPES.JP ? str = "球種：フラット得点" : str = "Flat Won";
            break;
        case "flatError":
            lang === LANG_TYPES.JP ? str = "球種：フラットエラー" : str = "Flat Error";
            break;
        //コース
        case "crossWon":
            lang === LANG_TYPES.JP ? str = "コース：クロス得点" : str = "Cross Won";
            break;
        case "crossError":
            lang === LANG_TYPES.JP ? str = "コース：クロスエラー" : str = "Cross Error";
            break;
        case "straightWon":
            lang === LANG_TYPES.JP ? str = "コース：ストレート得点" : str = "Straight Won";
            break;
        case "straightError":
            lang === LANG_TYPES.JP ? str = "コース：ストレートエラー" : str = "Straight Error";
            break;
        case "centerWon":
            lang === LANG_TYPES.JP ? str = "コース：センター得点" : str = "Center Won";
            break;
        case "centerError":
            lang === LANG_TYPES.JP ? str = "コース：センターエラー" : str = "Center Error";
            break;
        default:
            str = "未設定";
            break;
    }
    
    return str;
};
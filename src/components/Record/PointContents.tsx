import { useContext } from "react";
import { usePointContentsSelect } from "../../fooks/usePointContentsSelect";
import { GlobalStateContext } from "../../providers/GlobalStateProvider";
import { LANG_TYPES } from "../../common/AppConst";
import { RecordReset } from "./RecordReset";
import styled from '@emotion/styled'
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircOutlineleIcon from '@mui/icons-material/RemoveCircleOutline';

type Props = {
    currentPointID: number
}

export const PointContents: React.VFC<Props> = ({currentPointID}) => {

    const [st, stAction] = usePointContentsSelect(currentPointID);
    const { globalState, setGlobalState } = useContext(GlobalStateContext);

    return (
        <>
            <SOuterArea>
                <p>{globalState.lang === LANG_TYPES.JP ? "サーブ" : "Serve"}</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.serveSelectItem}
                    size="small"
                    exclusive
                    onChange={stAction.serveChange}
                >
                    <CustomToggleButton value="1st">1st</CustomToggleButton>
                    <CustomToggleButton value="2nd">2nd</CustomToggleButton>
                    <CustomToggleButton value="Double Fault">{globalState.lang === LANG_TYPES.JP ? "ダブルフォルト" : "Double Fault"}</CustomToggleButton>
                </ToggleButtonGroup>
                <p>{globalState.lang === LANG_TYPES.JP ? "サーブコース" : "Serve Cource"}</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.serveCourceSelectItem}
                    size="small"
                    exclusive
                    onChange={stAction.serveCourceChange}
                    disabled={st.serveSelectItem === "" || st.serveSelectItem === null || st.serveSelectItem === "Double Fault" ? true : false}
                >
                    <CustomToggleButton value="Wide">{globalState.lang === LANG_TYPES.JP ? "ワイド" : "Wide"}</CustomToggleButton>
                    <CustomToggleButton value="Body">{globalState.lang === LANG_TYPES.JP ? "ボディ" : "Body"}</CustomToggleButton>
                    <CustomToggleButton value="Center">{globalState.lang === LANG_TYPES.JP ? "センター" : "Center"}</CustomToggleButton>
                    <CustomToggleButton value="Fore">{globalState.lang === LANG_TYPES.JP ? "フォア" : "Fore"}</CustomToggleButton>
                    <CustomToggleButton value="Back">{globalState.lang === LANG_TYPES.JP ? "バック" : "Back"}</CustomToggleButton>
                </ToggleButtonGroup>
                <p>{globalState.lang === LANG_TYPES.JP ? "サーブ種類" : "Serve Type"}</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.serveTypeSelectItem}
                    size="small"
                    exclusive
                    onChange={stAction.serveTypeChange}
                    disabled={st.serveSelectItem === "" || st.serveSelectItem === null || st.serveSelectItem === "Double Fault" ? true : false}
                >
                    <CustomToggleButton value="Flat">{globalState.lang === LANG_TYPES.JP ? "フラット" : "Flat"}</CustomToggleButton>
                    <CustomToggleButton value="Slice">{globalState.lang === LANG_TYPES.JP ? "スライス" : "Slice"}</CustomToggleButton>
                    <CustomToggleButton value="Spin">{globalState.lang === LANG_TYPES.JP ? "スピン" : "Spin"}</CustomToggleButton>
                    <CustomToggleButton value="TopSlice">{globalState.lang === LANG_TYPES.JP ? "トップスライス" : "TopSlice"}</CustomToggleButton>
                </ToggleButtonGroup>
                <p>{globalState.lang === LANG_TYPES.JP ? "ラリー数" : "Rally Count"}</p>
                <Box>
                    <IconButton aria-label="Subtract" onClick={stAction.rallyCountSubtract} >
                        <RemoveCircOutlineleIcon color="primary"/>
                    </IconButton>
                    {st.rallyCountItem}
                    <IconButton aria-label="add" onClick={stAction.rallyCountAdd} >
                        <AddCircleOutlineIcon color={"primary"}/>
                    </IconButton>
                </Box>
                <p>{globalState.lang === LANG_TYPES.JP ? "ポイント内容" : "Point Category"}</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.pointCategorySelectItem}
                    size="small"
                    exclusive
                    onChange={stAction.pointCategoryChange}
                >
                    <CustomToggleButton value="Winner">{globalState.lang === LANG_TYPES.JP ? "ウィナー" : "Winner"}</CustomToggleButton>
                    <CustomToggleButton value="NiceShot">{globalState.lang === LANG_TYPES.JP ? "ナイスショット" : "Nice Shot"}</CustomToggleButton>
                    <CustomToggleButton value="Error">{globalState.lang === LANG_TYPES.JP ? "エラー" : "Error"}</CustomToggleButton>
                </ToggleButtonGroup>
                <p>{globalState.lang === LANG_TYPES.JP ? "決め手のショット種類" : "Shot Type"}</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.shotTypeSelectItem}
                    size="small"
                    exclusive
                    onChange={stAction.shotTypeChange}
                    disabled={st.pointCategorySelectItem === "" || st.pointCategorySelectItem === null ? true : false}
                >
                    <CustomToggleButton sx={{fontSize:'0.8em'}} value="Serve">{globalState.lang === LANG_TYPES.JP ? "サーブ" : "Serve"}</CustomToggleButton>
                    <CustomToggleButton value="Return">{globalState.lang === LANG_TYPES.JP ? "リターン" : "Return"}</CustomToggleButton>
                    <CustomToggleButton value="Stroke">{globalState.lang === LANG_TYPES.JP ? "ストローク" : "Stroke"}</CustomToggleButton>
                    <CustomToggleButton value="Volley">{globalState.lang === LANG_TYPES.JP ? "ボレー" : "Volley"}</CustomToggleButton>
                    <CustomToggleButton value="Smash">{globalState.lang === LANG_TYPES.JP ? "スマッシュ" : "Smash"}</CustomToggleButton>
                </ToggleButtonGroup>
                <p>{globalState.lang === LANG_TYPES.JP ? "フォアハンド／バックハンド" : "Shot Detail"}</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.shotDetailSelectItem}
                    size="small"
                    exclusive
                    onChange={stAction.shotDetailChange}
                    disabled={st.pointCategorySelectItem === "" || st.pointCategorySelectItem === null ? true : false}
                >
                    <CustomToggleButton value="Fore">{globalState.lang === LANG_TYPES.JP ? "フォア" : "Fore"}</CustomToggleButton>
                    <CustomToggleButton value="Back">{globalState.lang === LANG_TYPES.JP ? "バック" : "Back"}</CustomToggleButton>
                </ToggleButtonGroup>                
                <p>{globalState.lang === LANG_TYPES.JP ? "回転種類" : "Shot Spin Type"}</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.shotSpinTypeSelectItem}
                    size="small"
                    exclusive
                    onChange={stAction.shotSpinTypeChange}
                    disabled={st.pointCategorySelectItem === "" || st.pointCategorySelectItem === null ? true : false}
                >
                    <CustomToggleButton value="Spin">{globalState.lang === LANG_TYPES.JP ? "スピン" : "Spin"}</CustomToggleButton>
                    <CustomToggleButton value="Slice">{globalState.lang === LANG_TYPES.JP ? "スライス" : "Slice"}</CustomToggleButton>
                    <CustomToggleButton value="Flat">{globalState.lang === LANG_TYPES.JP ? "フラット" : "Flat"}</CustomToggleButton>
                </ToggleButtonGroup>
                <p>{globalState.lang === LANG_TYPES.JP ? "コース" : "Shot Course"}</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.shotDetailCourceSelectItem}
                    size="small"
                    exclusive
                    onChange={stAction.shotDetailCourceChange}
                    disabled={st.pointCategorySelectItem === "" || st.pointCategorySelectItem === null ? true : false}
                >
                    <CustomToggleButton value="Cross">{globalState.lang === LANG_TYPES.JP ? "クロス" : "Cross"}</CustomToggleButton>
                    <CustomToggleButton value="Straight">{globalState.lang === LANG_TYPES.JP ? "ストレート" : "Straight"}</CustomToggleButton>
                    <CustomToggleButton value="Center">{globalState.lang === LANG_TYPES.JP ? "センター" : "Center"}</CustomToggleButton>
                    <CustomToggleButton value="Lob">{globalState.lang === LANG_TYPES.JP ? "ロブ" : "Lob"}</CustomToggleButton>
                    <CustomToggleButton value="Drop">{globalState.lang === LANG_TYPES.JP ? "ドロップ" : "Drop"}</CustomToggleButton>
                </ToggleButtonGroup>
                <RecordReset />
            </SOuterArea>
        </>
    );
}

const SOuterArea = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '24rem',
    maxWidth: '100%',
    marginBottom: '10rem',
    '& > *': { marginBottom: '0.5rem'},
    '& > p': { margin: '1rem 0 0.5rem 0'},
});

const CustomToggleButton = styled(ToggleButton)({
    //勝手に大文字になる設定を取り除く
    textTransform: 'none'
});
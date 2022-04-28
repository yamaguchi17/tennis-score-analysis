import { usePointContentsSelect } from "../../fooks/usePointContentsSelect";
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

    return (
        <>
            <SOuterArea>
                <p>Serve</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.serveSelectItem}
                    exclusive
                    onChange={stAction.serveChange}
                >
                    <CustomToggleButton value="1st">1st</CustomToggleButton>
                    <CustomToggleButton value="2nd">2nd</CustomToggleButton>
                    <CustomToggleButton value="Double Fault">Double Fault</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Serve Cource</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.serveCourceSelectItem}
                    exclusive
                    onChange={stAction.serveCourceChange}
                    disabled={st.serveSelectItem === "" || st.serveSelectItem === null || st.serveSelectItem === "Double Fault" ? true : false}
                >
                    <CustomToggleButton value="Wide">Wide</CustomToggleButton>
                    <CustomToggleButton value="Body">Body</CustomToggleButton>
                    <CustomToggleButton value="Center">Center</CustomToggleButton>
                    <CustomToggleButton value="Fore">Fore</CustomToggleButton>
                    <CustomToggleButton value="Back">Back</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Serve Type</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.serveTypeSelectItem}
                    exclusive
                    onChange={stAction.serveTypeChange}
                    disabled={st.serveSelectItem === "" || st.serveSelectItem === null || st.serveSelectItem === "Double Fault" ? true : false}
                >
                    <CustomToggleButton value="Flat">Flat</CustomToggleButton>
                    <CustomToggleButton value="Slice">Slice</CustomToggleButton>
                    <CustomToggleButton value="Spin">Spin</CustomToggleButton>
                    <CustomToggleButton value="TopSlice">TopSlice</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Rally Count</p>
                <Box>
                    <IconButton aria-label="Subtract" onClick={stAction.rallyCountSubtract} >
                        <RemoveCircOutlineleIcon color="primary"/>
                    </IconButton>
                    {st.rallyCountItem}
                    <IconButton aria-label="add" onClick={stAction.rallyCountAdd} >
                        <AddCircleOutlineIcon color={"primary"}/>
                    </IconButton>
                </Box>
                <p>Point Category</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.pointCategorySelectItem}
                    exclusive
                    onChange={stAction.pointCategoryChange}
                >
                    <CustomToggleButton value="Winner">Winner</CustomToggleButton>
                    <CustomToggleButton value="NiceShot">Nice Shot</CustomToggleButton>
                    <CustomToggleButton value="Error">Error</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Shot Type</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.shotTypeSelectItem}
                    exclusive
                    onChange={stAction.shotTypeChange}
                    disabled={st.pointCategorySelectItem === "" || st.pointCategorySelectItem === null ? true : false}
                >
                    <CustomToggleButton value="Serve">Serve</CustomToggleButton>
                    <CustomToggleButton value="Return">Return</CustomToggleButton>
                    <CustomToggleButton value="Stroke">Stroke</CustomToggleButton>
                    <CustomToggleButton value="Volley">Volley</CustomToggleButton>
                    <CustomToggleButton value="Smash">Smash</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Shot Detail</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.shotDetailSelectItem}
                    exclusive
                    onChange={stAction.shotDetailChange}
                    disabled={st.pointCategorySelectItem === "" || st.pointCategorySelectItem === null ? true : false}
                >
                    <CustomToggleButton value="Fore">Fore</CustomToggleButton>
                    <CustomToggleButton value="Back">Back</CustomToggleButton>
                </ToggleButtonGroup>                
                <p>Shot Spin Type</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.shotSpinTypeSelectItem}
                    exclusive
                    onChange={stAction.shotSpinTypeChange}
                    disabled={st.pointCategorySelectItem === "" || st.pointCategorySelectItem === null ? true : false}
                >
                    <CustomToggleButton value="Spin">Spin</CustomToggleButton>
                    <CustomToggleButton value="Slice">Slice</CustomToggleButton>
                    <CustomToggleButton value="Flat">Flat</CustomToggleButton>
                </ToggleButtonGroup>
                <p>Shot Course</p>
                <ToggleButtonGroup
                    color="primary"
                    value={st.shotDetailCourceSelectItem}
                    exclusive
                    onChange={stAction.shotDetailCourceChange}
                    disabled={st.pointCategorySelectItem === "" || st.pointCategorySelectItem === null ? true : false}
                >
                    <CustomToggleButton value="Cross">Cross</CustomToggleButton>
                    <CustomToggleButton value="Straight">Straight</CustomToggleButton>
                    <CustomToggleButton value="Center">Center</CustomToggleButton>
                    <CustomToggleButton value="Lob">Lob</CustomToggleButton>
                    <CustomToggleButton value="Drop">Drop</CustomToggleButton>
                </ToggleButtonGroup>
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
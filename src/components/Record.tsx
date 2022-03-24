import { ChangeEvent, useState, FC, useCallback, useContext } from "react";
import styled from '@emotion/styled'
import Button from "@mui/material/Button";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export const Record = () => {

    //Serveボタン用state
    const [serveSelectItem, setServeItem] = useState('1st');
    //Serve Courseボタン用state
    const [serveCourceSelectItem, setServeCourceItem] = useState('Wide');
    //Serve Typeボタン用state
    const [serveTypeSelectItem, setServeTypeItem] = useState('Flat');
    //Point Categoryボタン用state
    const [pointCategorySelectItem, setPointCategoryItem] = useState('Winner');
    //Shot Typeボタン用state
    const [shotTypeSelectItem, setShotTypeItem] = useState('Serve');
    //Shot Spin Typeボタン用state
    const [shotSpinTypeSelectItem, setShotSpinTypeItem] = useState('Spin');
    //Shot Detailボタン用state
    const [shotDetailSelectItem, setShotDetailItem] = useState('Fore');
    //Shot Detail Courceボタン用state
    const [shotDetailCourceSelectItem, setShotDetailCourceItem] = useState('Cross');

    //Serveボタン押下処理
    const serveChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeSelectItem: string,
    ) => {
        setServeItem(newServeSelectItem);
    };

    //Serve Courceボタン押下処理
    const serveCourceChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeCourceSelectItem: string,
    ) => {
        setServeCourceItem(newServeCourceSelectItem);
    };
    
    //Serve Typeボタン押下処理
    const serveTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newServeTypeSelectItem: string,
    ) => {
        setServeTypeItem(newServeTypeSelectItem);
    };

    //Point Categoryボタン押下処理
    const pointCategoryChange = (
        event: React.MouseEvent<HTMLElement>,
        newPointCategorySelectItem: string,
    ) => {
        setPointCategoryItem(newPointCategorySelectItem);
    };
    //Shot Typeボタン押下処理
    const shotTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotTypeSelectItem: string,
    ) => {
        setShotTypeItem(newShotTypeSelectItem);
    };
    //Shot Spin Typeボタン押下処理
    const shotSpinTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotSpinTypeSelectItem: string,
    ) => {
        setShotSpinTypeItem(newShotSpinTypeSelectItem);
    };
    //Shot Detailボタン押下処理
    const shotDetailChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotDetailSelectItem: string,
    ) => {
        setShotDetailItem(newShotDetailSelectItem);
    };
    //Shot Detail Courceボタン押下処理
    const shotDetailCourceChange = (
        event: React.MouseEvent<HTMLElement>,
        newShotDetailCourceSelectItem: string,
    ) => {
        setShotDetailCourceItem(newShotDetailCourceSelectItem);
    };    
    

    return (
        <>
            <p>Serve</p>
            <ToggleButtonGroup
                color="primary"
                value={serveSelectItem}
                exclusive
                onChange={serveChange}
            >
                <CustomToggleButton value="1st">1st</CustomToggleButton>
                <CustomToggleButton value="2nd">2nd</CustomToggleButton>
                <CustomToggleButton value="Double Fault">Double Fault</CustomToggleButton>
            </ToggleButtonGroup>
            <p>Serve Cource</p>
            <ToggleButtonGroup
                color="primary"
                value={serveCourceSelectItem}
                exclusive
                onChange={serveCourceChange}
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
                value={serveTypeSelectItem}
                exclusive
                onChange={serveTypeChange}
            >
                <CustomToggleButton value="Flat">Flat</CustomToggleButton>
                <CustomToggleButton value="Slice">Slice</CustomToggleButton>
                <CustomToggleButton value="Spin">Spin</CustomToggleButton>
                <CustomToggleButton value="TopSlice">TopSlice</CustomToggleButton>
            </ToggleButtonGroup>
            <p>Point Category</p>
            <ToggleButtonGroup
                color="primary"
                value={pointCategorySelectItem}
                exclusive
                onChange={pointCategoryChange}
            >
                <CustomToggleButton value="Winner">Winner</CustomToggleButton>
                <CustomToggleButton value="NiceShot">Nice Shot</CustomToggleButton>
                <CustomToggleButton value="Error">Error</CustomToggleButton>
            </ToggleButtonGroup>
            <p>Shot Type</p>
            <ToggleButtonGroup
                color="primary"
                value={shotTypeSelectItem}
                exclusive
                onChange={shotTypeChange}
            >
                <CustomToggleButton value="Serve">Serve</CustomToggleButton>
                <CustomToggleButton value="Return">Return</CustomToggleButton>
                <CustomToggleButton value="Stroke">Stroke</CustomToggleButton>
                <CustomToggleButton value="Volley">Volley</CustomToggleButton>
                <CustomToggleButton value="Smash">Smash</CustomToggleButton>
            </ToggleButtonGroup>
            <p>Shot Spin Type</p>
            <ToggleButtonGroup
                color="primary"
                value={shotSpinTypeSelectItem}
                exclusive
                onChange={shotSpinTypeChange}
            >
                <CustomToggleButton value="Spin">Spin</CustomToggleButton>
                <CustomToggleButton value="Slice">Slice</CustomToggleButton>
                <CustomToggleButton value="Flat">Flat</CustomToggleButton>
            </ToggleButtonGroup>
            <p>Shot Detail</p>
            <ToggleButtonGroup
                color="primary"
                value={shotDetailSelectItem}
                exclusive
                onChange={shotDetailChange}
            >
                <CustomToggleButton value="Fore">Fore</CustomToggleButton>
                <CustomToggleButton value="Back">Back</CustomToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
                color="primary"
                value={shotDetailCourceSelectItem}
                exclusive
                onChange={shotDetailCourceChange}
            >
                <CustomToggleButton value="Cross">Cross</CustomToggleButton>
                <CustomToggleButton value="Straight">Straight</CustomToggleButton>
                <CustomToggleButton value="Center">Center</CustomToggleButton>
            </ToggleButtonGroup>
        </>
    );
}

//トグルボタンのCSSカスタマイズ
const CustomToggleButton = styled(ToggleButton)({
    //勝手に大文字になる設定を取り除く
    textTransform: 'none'
});
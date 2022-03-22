import { ChangeEvent, useState, FC, useCallback, useContext } from "react";
import styled from '@emotion/styled'
import Button from "@mui/material/Button";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export const Record = () => {
    const [alignment, setAlignment] = useState('1st');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <p>Serve</p>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
            >
                <CustomToggleButton value="1st">1st</CustomToggleButton>
                <CustomToggleButton value="2nd">2nd</CustomToggleButton>
                <CustomToggleButton value="Double Fault">Double Fault</CustomToggleButton>
            </ToggleButtonGroup>
        </>
    );
}

//トグルボタンのCSSカスタマイズ
const CustomToggleButton = styled(ToggleButton)({
    //勝手に大文字になる設定を取り除く
    textTransform: 'none'
});
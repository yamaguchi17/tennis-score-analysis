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
                <ToggleButton value="1st">1st</ToggleButton>
                <ToggleButton value="2nd">2nd</ToggleButton>
                <ToggleButton value="Double Fault">Double Fault</ToggleButton>
            </ToggleButtonGroup>
        </>
    );
}
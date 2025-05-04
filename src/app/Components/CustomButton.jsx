import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const CustomButton = ({type,label,onClick}) => {
    return (
        <div>
            <CustomButtonContainer type={type} variant='outlined' fullWidth onClick={onClick}>
                {label}
            </CustomButtonContainer>
        </div>
    )
}

export default CustomButton
const CustomButtonContainer = styled(Button)({
    margin: "20px 0px 0px 0px",
    border: "1px solid #D9D9D9",
    padding:"10px 0px",
    color: "#626262",
})
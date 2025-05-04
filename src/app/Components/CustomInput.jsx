import { TextField } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const CustomInput = ({type="text",label,value,onChange,required=false,name}) => {
  return (
    <div>
        <CustomInputField 
        type={type}
        id="outlined-basic" 
        label={label} 
        variant="outlined" 
        value={value}
        onChange={onChange}
        fullWidth
        required={required}
        name={name}
        />
    </div>
  )
}

export default CustomInput
const CustomInputField=styled(TextField)({
    borderRadius:"none",
    margin:"20px 0px 0px 0px"
})
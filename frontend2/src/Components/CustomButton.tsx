import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { CustomButtonProps } from '../types/global.types';

const CustomButton: React.FC<CustomButtonProps> = ({ type = 'button', label, onClick, fullWidth=false}) => {
  return (
    <div>
      <CustomButtonContainer type={type} variant="outlined" fullWidth={fullWidth} onClick={onClick}>
        {label}
      </CustomButtonContainer>
    </div>
  );
};

export default CustomButton;

const CustomButtonContainer = styled(Button)({
  margin: '20px 0 0 0',
  border: '1px solid #D9D9D9',
  padding: '10px 0',
  color: '#626262',
});

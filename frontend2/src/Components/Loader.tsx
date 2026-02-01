'use client';
import { Backdrop, CircularProgress } from '@mui/material';

const Loader: React.FC = () => {
  return (
    <Backdrop
      open
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;

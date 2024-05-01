import { useState } from 'react';
import { Box, Button } from '@mui/material';
import ImageUpload from './components/ImageUpload';

const GoogleDriveUpload = () => {
  const [filename, setFilename] = useState('');

  const onFileChange = (imageUrl: string) => {
    setFilename(imageUrl);
  };

  return (
    <>
      <Box sx={{maxWidth: '50%'}}>
        <ImageUpload onChange={onFileChange} label={'Put image'} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={() => console.log('Filename = ', filename)}>
          Show filename
        </Button>
      </Box>
    </>
  );
};

export default GoogleDriveUpload;
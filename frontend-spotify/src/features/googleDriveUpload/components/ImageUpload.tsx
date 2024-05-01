import React, { useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';

interface Props {
  onChange: (imageUrl: string) => void;
  label: string;
}

const ImageUpload: React.FC<Props> = ({ onChange, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const user = useAppSelector(selectUser);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFilename(file.name);

      console.log('Token', user?.token);

      try {
        // Создаем FormData объект для передачи файла
        const formData = new FormData();
        formData.append('image', file);

        // Определяем Content-Type динамически на основе расширения файла изображения
        const contentType = getImageContentType(file.name);


        if (!user) return;

        const response = await axios.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', formData, {
          headers: {
            'Content-Type': contentType,
            'Authorization': `Bearer ${user?.token}`,
          },
        });

        console.log(response);

        const imageUrl = response.data.webContentLink;
        onChange(imageUrl);
      } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
      }
    } else {
      setFilename('');
    }
  };
  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const getImageContentType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      // Добавьте дополнительные типы изображений по мере необходимости
      default:
        return 'image/jpeg'; // По умолчанию используем JPEG
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            disabled
            label={label}
            value={filename}
            onClick={activateInput}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ImageUpload;


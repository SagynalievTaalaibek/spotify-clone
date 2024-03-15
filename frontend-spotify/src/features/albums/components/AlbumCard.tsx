import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DeleteOutlined } from '@mui/icons-material';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';

interface Props {
  id: string;
  name: string;
  artistName: string;
  image: string;
  yearOfIssue: number;
  isPublished: boolean;
  userId: string;
  deleteLoading: boolean;
  onDelete: (id: string) => void;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

const AlbumCard: React.FC<Props> = ({
  id,
  name,
  image,
  yearOfIssue,
  artistName,
  isPublished,
  userId,
  deleteLoading,
  onDelete,
}) => {
  const user = useAppSelector(selectUser);
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  const onDeleteAlbum = () => {
    onDelete(id);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: '100%' }}>
        <ImageCardMedia image={cardImage} title={name} />
        <CardContent>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h5">Album: {name}</Typography>
              <Typography variant="h6">Year of issue {yearOfIssue}</Typography>
              {!isPublished && (
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ color: 'red', display: 'inline' }}
                >
                  Not published {isPublished}
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ display: 'flex' }}>
          {user && user.role === 'admin' && !isPublished && (
            <Grid item xs={12} sx={{ margin: 0 }}>
              <Button
                variant="contained"
                sx={{ marginLeft: 'auto', marginTop: 'auto' }}
              >
                Published
              </Button>
            </Grid>
          )}
          {(user && !isPublished && user._id === userId) ||
          user?.role === 'admin' ? (
            <Grid item sx={{ marginLeft: 'auto' }}>
              <IconButton disabled={deleteLoading} onClick={onDeleteAlbum}>
                <DeleteOutlined sx={{ fontSize: '30px' }} />
              </IconButton>
            </Grid>
          ) : (
            ''
          )}
          <Grid item sx={{ marginLeft: 'auto' }}>
            <IconButton
              component={Link}
              to={`/tracks/${id}?artist=${artistName}&album=${name}`}
              sx={{ margin: '0 10px 0 auto' }}
            >
              <ArrowForwardIcon sx={{ fontSize: '30px' }} />
            </IconButton>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumCard;

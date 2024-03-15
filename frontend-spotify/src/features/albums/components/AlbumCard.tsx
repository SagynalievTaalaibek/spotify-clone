import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DeleteOutlined } from '@mui/icons-material';
import { apiURL } from '../../../constants';
import imageNotAvailable from '../../../assets/images/image_not_available.png';

interface Props {
  id: string;
  name: string;
  artistName: string;
  image: string;
  yearOfIssue: number;
  isPublished: boolean;
  userId: string;
  deleteLoading: boolean;
  publishLoading: boolean;
  onPublish: (id: string) => void;
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
  publishLoading,
  onPublish,
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

  const onPublishAlbum = () => {
    onPublish(id);
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
                disabled={publishLoading}
                sx={{ marginLeft: 'auto', marginTop: 'auto' }}
                onClick={onPublishAlbum}
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

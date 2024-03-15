import React from 'react';
import { Link } from 'react-router-dom';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DeleteOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { deleteArtist } from '../artistsThunks';

interface Props {
  id: string;
  userId: string;
  name: string;
  photo: string;
  isPublished: boolean;
  deleteLoading: boolean;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

const ArtistCard: React.FC<Props> = ({
  id,
  name,
  photo,
  isPublished,
  userId,
  deleteLoading,
}) => {
  let cardImage = imageNotAvailable;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  if (photo) {
    cardImage = apiURL + '/' + photo;
  }

  const onDeleteArtist = () => {
    dispatch(deleteArtist(id));
  };

  return (
    <Grid item xs sm={12} md={6} lg={4}>
      <Card sx={{ height: '100%' }}>
        <ImageCardMedia image={cardImage} title={name} />
        <CardContent>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h4">{name}</Typography>
              {!isPublished && (
                <Typography variant="h6" component="p" sx={{ color: 'red' }}>
                  Not published
                </Typography>
              )}
            </Grid>
            <Grid item container xs={4}>
              {(user && !isPublished && user._id === userId) ||
              user?.role === 'admin' ? (
                <Grid item sx={{ marginLeft: '40px' }}>
                  <IconButton disabled={deleteLoading} onClick={onDeleteArtist}>
                    <DeleteOutlined sx={{ fontSize: '30px' }} />
                  </IconButton>
                </Grid>
              ) : (
                ''
              )}
              <Grid item sx={{ marginLeft: 'auto' }}>
                <IconButton component={Link} to={`/albums/${id}`}>
                  <ArrowForwardIcon sx={{ fontSize: '30px' }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {user && user.role === 'admin' && !isPublished && (
            <Grid container xs={12} sx={{ margin: 0 }}>
              <Button
                variant="contained"
                sx={{ marginLeft: 'auto', marginTop: 'auto' }}
              >
                Published
              </Button>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ArtistCard;

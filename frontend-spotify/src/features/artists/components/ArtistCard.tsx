import React from 'react';
import { Link } from 'react-router-dom';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Props {
  id: string;
  name: string;
  photo: string;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

const ArtistCard: React.FC<Props> = ({ id, name, photo }) => {
  let cardImage = imageNotAvailable;

  if (photo) {
    cardImage = apiURL + '/' + photo;
  }

  return (
    <Grid item xs sm={12} md={6} lg={4}>
      <Card sx={{ height: '100%' }}>
        <ImageCardMedia image={cardImage} title={name} />
        <CardContent>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h4">{name}</Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton component={Link} to={`/albums/${id}`}>
                <ArrowForwardIcon sx={{ fontSize: '30px' }} />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ArtistCard;

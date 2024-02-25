import React from 'react';
import {
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

interface Props {
  id: string;
  name: string;
  image: string;
  yearOfIssue: number;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

const AlbumCard: React.FC<Props> = ({ id, name, image, yearOfIssue }) => {
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{ height: '100%' }}>
        <ImageCardMedia image={cardImage} title={name} />
        <CardContent>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h5">Name of Album{name}</Typography>
              <Typography variant="h6">Year of issue {yearOfIssue}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ display: 'flex' }}>
          <IconButton
            component={Link}
            to={`/tracks/${id}`}
            sx={{ margin: '0 10px 0 auto' }}
          >
            <ArrowForwardIcon sx={{ fontSize: '30px' }} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumCard;

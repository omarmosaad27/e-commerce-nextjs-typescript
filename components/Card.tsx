import React from 'react';
import { useGlobalContext } from '../context/context';
import { useState } from 'react';
import {
  Typography,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Grid,
  Button,
  CardActionArea,
} from '@mui/material';

export default function CardItem({
  id,
  title,
  category,
  image,
  price,
  rating: { count },
  description,
}): JSX.Element {
  const { addToCart } = useGlobalContext();
  const [readMore, setReadMore] = useState(false);

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ maxWidth: 345, minHeight: 550 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            style={{ height: '200px', width: '100%' }}
          />
          <CardContent>
            <Typography
              variant="body1"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              align="center"
              color="textSecondary"
              gutterBottom
              paragraph
            >
              {readMore ? description : `${description.substring(0, 100)}`}
              ...{' '}
              <Button onClick={() => setReadMore(!readMore)}>
                {readMore ? 'show less' : 'read more'}
              </Button>
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="textSecondary"
              gutterBottom
              paragraph
            >
              ${price}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="textSecondary"
              gutterBottom
              paragraph
            >
              category: {category}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="textSecondary"
              gutterBottom
              paragraph
            >
              quantity: {count}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => addToCart(id)}
          >
            add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

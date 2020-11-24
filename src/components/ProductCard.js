import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
const useStyles = makeStyles({
  root: {
    width: 300,
    margin: 30,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ProductCard(props) {
  const [quantity, setQuantity] = useState(1);
  const classes = useStyles();
  const { product } = props;

  const addToBasket = () => {
    const productSelected = {
      id: product.id,
      product: product.product,
      description: product.description,
      main_img: product.main_img,
      marque: product.marque,
      price: product.price,
      quantity,
    };
    axios.post('http://localhost:3000/api/basket', productSelected);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {product.product}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {product.description}
        </Typography>
        <Typography className={classes.pos} component="p">
          Marque : {product.marque}
        </Typography>
        <Typography variant="body2" component="p">
          {product.stock} pièces disponibles
        </Typography>
        <Typography variant="body2" component="p">
          {product.price} € / unité
        </Typography>
        <img width="100px" src={product.main_img} alt={product.product} />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => addToBasket()}>
          Commander
        </Button>
        <TextField
          id="standard-number"
          label="Quantité"
          type="number"
          value={quantity}
          InputProps={{
            inputProps: { min: 1, max: product.stock },
          }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => setQuantity(parseInt(event.target.value, 10))}
        />
      </CardActions>
    </Card>
  );
}

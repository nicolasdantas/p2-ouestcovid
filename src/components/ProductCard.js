import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: 350,
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
      stock: product.stock,
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
        <Typography
          variant="body2"
          component="p"
          style={{ color: product.stock <= 0 && 'red' }}
        >
          {product.stock <= 0
            ? 'Produit indisponible'
            : `${product.stock} pièces disponibles`}
        </Typography>
        <Typography variant="body2" component="p">
          {product.price} € / unité
        </Typography>
        <img width="100px" src={product.main_img} alt={product.product} />
      </CardContent>
      <CardActions className="add-to-basket">
        <IconButton
          disabled={product.stock <= 0 && true}
          size="small"
          onClick={() => addToBasket()}
          style={{ color: product.stock > 0 && '#2d414d', outline: 'none' }}
        >
          <AddShoppingCartIcon />
        </IconButton>

        <TextField
          disabled={product.stock <= 0 && true}
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

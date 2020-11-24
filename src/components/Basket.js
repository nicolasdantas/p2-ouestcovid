import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './style/Basket.scss';

const useStyles = makeStyles({
  table: {},
});
export default function Basket() {
  const classes = useStyles();
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/basket')
      .then((response) => setBasket(response.data));
  });

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:3000/api/basket/${id}`);
  };

  const deleteBasket = () => {
    axios.delete(`http://localhost:3000/api/basket`);
  };

  return (
    <>
      <div className="basket">
        <h1>Votre panier</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" />
                <TableCell align="center">Marque</TableCell>
                <TableCell align="center">Produit</TableCell>
                <TableCell align="center">Quantité</TableCell>
                <TableCell align="center">Prix unitaire</TableCell>
                <TableCell align="center">Prix total</TableCell>
                <TableCell align="center">Supprimer le produit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basket.map((product) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row" align="center">
                    <img
                      src={product.main_img}
                      width="40px"
                      alt={product.product}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {product.marque}
                  </TableCell>
                  <TableCell align="center">{product.product}</TableCell>

                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">
                    {parseInt(product.quantity * product.price, 10)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => deleteProduct(product.id)}
                      variant="contained"
                      type="button"
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="basket-button">
          <Button
            // onClick={handleClick}
            variant="contained"
            type="button"
          >
            Envoyer ma commande
          </Button>
          <Button
            className="button-empty-basket"
            onClick={deleteBasket}
            variant="contained"
            type="button"
          >
            Vider mon panier
          </Button>
        </div>
      </div>
    </>
  );
}

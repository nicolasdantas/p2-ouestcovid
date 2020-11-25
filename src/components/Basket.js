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
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './style/Basket.scss';
import ConfirmationModal from './ConfirmationModal';

const useStyles = makeStyles({
  table: {},
});
export default function Basket(props) {
  const classes = useStyles();
  const [modalShow, setModalShow] = useState(false);
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

  const sendOrder = () => {
    axios.put(`http://localhost:3000/api/products/`, basket);
    axios.delete(`http://localhost:3000/api/basket`);
    setModalShow(true);
    setTimeout(() => {
      props.history.push('/store');
    }, 5000);
  };

  const setQuantity = (quantity, id) => {
    axios.put(`http://localhost:3000/api/basket/${id}`, {
      quantity,
    });
  };

  return (
    <>
      <ConfirmationModal show={modalShow} onHide={() => setModalShow(false)} />
      <div className="basket">
        <h1>Votre panier</h1>{' '}
        <Button
          className="button-empty-basket"
          onClick={() => props.history.push('/store')}
          variant="contained"
          type="button"
        >
          Retour à la boutique
        </Button>
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

                  <TableCell align="center">
                    <TextField
                      id="standard-number"
                      type="number"
                      value={product.quantity}
                      InputProps={{
                        inputProps: { min: 1, max: product.stock },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) =>
                        setQuantity(
                          parseInt(event.target.value, 10),
                          product.id
                        )
                      }
                    />
                  </TableCell>
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
            onClick={() => sendOrder()}
            variant="contained"
            type="button"
            disabled={basket.length === 0}
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

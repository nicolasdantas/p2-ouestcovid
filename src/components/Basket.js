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

export default function Basket(props) {
  const [modalShow, setModalShow] = useState(false);
  const [basket, setBasket] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get('https://ouestcovid-back.herokuapp.com/api/basket', {
        cancelToken: source.token,
      })
      .then((response) => setBasket(response.data))
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Error: ', err.message);
        }
      })
      .then(setIsLoading(false));
    return () => {
      source.cancel('Basket request canceled by user');
    };
  }, [isLoading]);

  const useStyles = makeStyles(() => ({
    button: {
      backgroundColor: '#2d414d',
      color: 'white',
      textTransform: 'none',
      '&$button:hover': {
        backgroundColor: '#2d414d',
      },
      '&$button:focus': {
        outline: 'none',
      },
    },
  }));

  const deleteProduct = (id) => {
    axios.delete(`https://ouestcovid-back.herokuapp.com/api/basket/${id}`);
  };

  const deleteBasket = () => {
    axios.delete(`https://ouestcovid-back.herokuapp.com/api/basket`);
  };

  const sendOrder = () => {
    axios.post(
      `https://new-app-form.herokuapp.com/order?apiKey=${window.apiKey}`,
      basket
    );
    axios.put(`https://ouestcovid-back.herokuapp.com/api/products/`, basket);
    axios.delete(`https://ouestcovid-back.herokuapp.com/api/basket`);
    setModalShow(true);
    setIsLoading(true);
    setTimeout(() => {
      props.history.push('/store');
    }, 5000);
  };

  const setQuantity = (quantity, id) => {
    axios.put(`https://ouestcovid-back.herokuapp.com/api/basket/${id}`, {
      quantity,
    });
  };

  return (
    <>
      <ConfirmationModal show={modalShow} onHide={() => setModalShow(false)} />
      <div className="basket">
        <h1>Votre panier</h1>{' '}
        <Button
          className={`button-empty-basket ${useStyles().button}`}
          onClick={() => props.history.push('/store')}
          variant="contained"
          type="button"
        >
          Retour à la boutique
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
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
                      onChange={(event) => {
                        setQuantity(
                          parseInt(event.target.value, 10),
                          product.id
                        );
                        setIsLoading(true);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">
                    {parseInt(product.quantity * product.price, 10)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        deleteProduct(product.id);
                        setIsLoading(true);
                      }}
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
            className={useStyles().button}
            style={{ outline: 'none' }}
            onClick={() => {
              sendOrder();
            }}
            variant="contained"
            type="button"
            disabled={basket.length === 0}
          >
            Envoyer ma commande
          </Button>
          <Button
            className={`button-empty-basket ${useStyles().button}`}
            onClick={() => {
              deleteBasket();
              setIsLoading(true);
            }}
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

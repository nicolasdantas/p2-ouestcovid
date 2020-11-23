import React, { useContext, useState } from 'react';
import { BasketContext } from '../context/BasketContext';
import Footer from '../components/Footer';
import NavBarConsumer from './NavBarConsumer';
import '../styles/Basket.scss';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {},
});
export default function Basket(props) {
  const classes = useStyles();
  const { basket, deleteProduct } = useContext(BasketContext);
  const [messages, setMessages] = useState();

  const handleClick = () => {
    setMessages(basket.map((product) => `${product.message} to pick-up your order`));
  };

  console.log(messages);

  return (
    <>
      <NavBarConsumer />
      <div className='basket'>
        <h1>Your basket</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Producteur</TableCell>
                <TableCell align='center'>Product</TableCell>
                <TableCell align='center'>Unit price</TableCell>
                <TableCell align='center'>Total price</TableCell>
                <TableCell align='center'>Delete product</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basket.map((product) => (
                <TableRow key={product.producer}>
                  <TableCell component='th' scope='row'>
                    {product.producer}
                  </TableCell>
                  <TableCell align='center'>{product.product}</TableCell>

                  <TableCell align='center'>{product.price}</TableCell>
                  <TableCell align='center'>
                    {parseInt(product.quantity * product.price)}
                  </TableCell>
                  <TableCell align='center'>
                    <Button
                      onClick={() => deleteProduct(product.id)}
                      variant='contained'
                      type='button'
                      style={{ fontFamily: 'IBM Plex Serif, serif' }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {messages ? (
          messages.map((message) => <h3 className='return-title'>{message}</h3>)
        ) : (
          <p></p>
        )}
        <div className='basket-button'>
          <Button
            onClick={handleClick}
            variant='contained'
            type='button'
            style={{ fontFamily: 'IBM Plex Serif, serif' }}
          >
            Send my order
          </Button>
        </div>
      </div>
      <footer className='basket-footer'>
        <Footer />
      </footer>
    </>
  );
}

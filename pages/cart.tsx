import type { NextPage } from 'next';
import Styles from '../styles/cart.module.css';
import { formatCurrency } from '../utilities/currencyFormatter';
import { BsFillTrashFill } from 'react-icons/bs';
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
} from '@mui/material';
import Layout from '../components/Layout';
import { useGlobalContext } from '../context/context';
import Link from 'next/link';
import Image from 'next/image';
const Home: NextPage = () => {
  const {
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    // itemTotal,
    products,
  } = useGlobalContext();
  if (cartItems.length < 1) {
    return (
      <Layout title={'cart page'}>
        <Container>
          <div>
            your cart is empty{' '}
            <Link href={'/'}>
              <a style={{ color: '#2980b9' }}>continue shopping</a>
            </Link>
          </div>
        </Container>
      </Layout>
    );
  }
  return (
    <Layout title={'cart page'}>
      <Container>
        <Link href={'/'}>
          <a style={{ color: '#2980b9', marginBottom: '40px' }}>
            continue shopping
          </a>
        </Link>
        <div className={Styles.cart}>
          <ul className={Styles.cartHeader}>
            <li>Item</li>
            <li>Quantity</li>
            <li>Price</li>
            <li>Action</li>
          </ul>
          {cartItems.map(
            (item: {
              id: number;
              title: string;
              category: string;
              image: string;
              price: number;
              rating: { rate: Number; count: number };
              description: string;
              quantity: number;
            }): JSX.Element => {
              return (
                <ul key={item.id} className={Styles.cartItem}>
                  <li className={Styles.item_img}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                    ></Image>
                  </li>
                  <li className={Styles.item_qauntity}>{item.quantity}</li>
                  <li className={Styles.item_price}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </li>
                  <li className={Styles.btns}>
                    <button
                      className={Styles.btn}
                      style={{ background: '#27ae60' }}
                      onClick={() => {
                        increaseCartQuantity(item.id);
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        decreaseCartQuantity(item.id);
                      }}
                      className={Styles.btn}
                      style={{ background: '#c0392b' }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className={Styles.btn}
                      style={{ color: '#2980b9', fontSize: '1.5rem' }}
                    >
                      <BsFillTrashFill />
                    </button>
                  </li>
                </ul>
              );
            }
          )}
        </div>
        <div className={Styles.total}>
          total:
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const item = products.find((i) => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default Home;

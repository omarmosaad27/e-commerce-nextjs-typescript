import type { NextPage } from 'next';
import Styles from '../styles/cart.module.css';
import { formatCurrency } from '../utilities/currencyFormatter';
import Layout from '../components/Layout';
import { useGlobalContext } from '../context/context';
import Link from 'next/link';
import SingleCart from '../components/CartItem';
import { Container } from '@mui/material';

const Home: NextPage = () => {
  const { cartItems, products } = useGlobalContext();
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
          {cartItems.map((item) => {
            return <SingleCart {...item} key={item.id} />;
          })}
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

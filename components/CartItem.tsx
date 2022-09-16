import React from 'react';
import Styles from '../styles/cart.module.css';
type cartprops = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};
import { BsFillTrashFill } from 'react-icons/bs';
import Image from 'next/image';
import { useGlobalContext } from '../context/context';

export default function SingleCart({
  id,
  title,
  image,
  price,
  quantity,
}: cartprops) {
  const {
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    // itemTotal,
    products,
  } = useGlobalContext();
  return (
    <ul className={Styles.cartItem}>
      <li className={Styles.item_img}>
        <Image src={image} alt={title} width={50} height={50}></Image>
      </li>
      <li className={Styles.item_qauntity}>{quantity}</li>
      <li className={Styles.item_price}>${(price * quantity).toFixed(2)}</li>
      <li className={Styles.btns}>
        <button
          className={Styles.btn}
          style={{ background: '#27ae60' }}
          onClick={() => {
            increaseCartQuantity(id);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            decreaseCartQuantity(id);
          }}
          className={Styles.btn}
          style={{ background: '#c0392b' }}
        >
          -
        </button>
        <button
          onClick={() => removeFromCart(id)}
          className={Styles.btn}
          style={{ color: '#2980b9', fontSize: '1.5rem' }}
        >
          <BsFillTrashFill />
        </button>
      </li>
    </ul>
  );
}

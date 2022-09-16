import { ListItem } from '@mui/material';
import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  ReactNode,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const url = 'https://fakestoreapi.com/products';
const AppContext = createContext({} as cartContext);

type appProviderProps = {
  children: ReactNode;
};
// type CartItem = {
//   id: number;
//   title: string;
//   quantity: number;
//   image: string;
//   price:number
// };
type cartContext = {
  products: any[];
  increaseCartQuantity: (id: number) => void;
  addToCart: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: any[];
};

const AppProvider = ({ children }: appProviderProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [cartItems, setCartItems] = useLocalStorage<any[]>(
    'shopping cart',
    []
  );

  function addToCart(id: number) {
    let addedItem: any = products.find((item) => item.id === id);
    if (cartItems.find((item) => item.id === id)) {
      console.log('item already in the cart');
    } else {
      setCartItems([
        ...cartItems,
        { ...addedItem, quantity: 1, total: addedItem.price },
      ]);
    }
    console.log(cartItems);
  }
  function increaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
    console.log(cartItems);
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        addToCart,
        cartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

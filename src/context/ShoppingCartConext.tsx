import { useContext, createContext, ReactNode, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  qty: number;
};

type ShoppingCartConext = {
  openCart: () => void;
  closeCart: () => void;

  getItemQty: (id: number) => number;
  incressCartQty: (id: number) => void;
  decressCartQty: (id: number) => void;
  removeFromCart: (id: number) => void;

  cartQty: number;
  cartItems: CartItem[];
};

const ShoppingCartConext = createContext({} as ShoppingCartConext);

export function useShoppingCart() {
  return useContext(ShoppingCartConext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shoppingcart",
    []
  );

  const cartQty = cartItems.reduce((qty, item) => item.qty + qty, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQty(id: number) {
    return cartItems.find((item) => item.id === id)?.qty || 0;
  }

  function incressCartQty(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, qty: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decressCartQty(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.qty === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartConext.Provider
      value={{
        getItemQty,
        incressCartQty,
        decressCartQty,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQty,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartConext.Provider>
  );
}

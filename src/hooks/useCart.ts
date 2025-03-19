import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { CartItem, Guitar } from "../types";

export default function useCart() {
  const initialCart = () : CartItem []=> {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: Guitar) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      const updatedCart = [...cart];
      if (updatedCart[itemExists].quantity < MAX_ITEMS) {
        updatedCart[itemExists].quantity += 1;
        setCart(updatedCart);
      }
    } else {
      const newItem : CartItem = {...item, quantity: 1};
      setCart([...cart, newItem]);
    }
  }

  function removeFromCart(id: Guitar["id"]) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1,
        };
      }
      return guitar;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1,
        };
      }
      return guitar;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  // state Derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
}

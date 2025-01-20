import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./auth";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    if (auth.token) {
      const fetchCartData = async () => {
        try {
          const { data } = await axios.get("/api/v1/user/get-cart");
          setCart(data);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };

      fetchCartData();
    }
  }, [auth.token]);

  useEffect(() => {
    if (auth.token) {
      const updateCartData = async () => {
        try {
          await axios.put("/api/v1/user/update-cart", { newCart: cart });
        } catch (error) {
          console.error("Error updating cart data:", error);
        }
      };

      updateCartData();
    }
  }, [auth.token, cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

import { createContext, useContext, useState } from "react";

const Cart = createContext();

const Context = ({ children }) => {
    const [cart, setCart] = useState({});
    return (
        <Cart.Provider value={{ cart, setCart }}>
            {children}
        </Cart.Provider>
    );
};

export const CartState = () => {
    return useContext(Cart);
};

export default Context;

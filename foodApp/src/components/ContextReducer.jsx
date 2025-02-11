import React, { useReducer, useContext, createContext } from 'react';

// Create contexts for the state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to manage cart state
export const ContextReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state, 
                { 
                    id: action.id, 
                    name: action.name, 
                    qty: action.qty, 
                    size: action.size, 
                    price: action.price, 
                    img: action.img 
                }
            ];
        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index, 1); // Remove item at specified index
            return newArr;
        case "DROP":
            return []; // Clear the cart (empty array)
        case "UPDATE":
            let updatedArr = [...state];
            updatedArr.find((food, index) => {
                if (food.id === action.id) {
                    updatedArr[index] = { 
                        ...food, 
                        qty: parseInt(action.qty) + food.qty, 
                        price: action.price + food.price 
                    };
                }
            });
            return updatedArr;
        default:
            console.log("Error in Reducer");
            return state; // Add return for default case
    }
};

// ContextProvider component that provides state and dispatch via context
export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ContextReducer, []); // Use the ContextReducer

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

// Custom hooks for accessing state and dispatch
export const useCart = () => useContext(CartStateContext); // To access the cart state
export const useDispatchCart = () => useContext(CartDispatchContext); // To dispatch actions to the cart

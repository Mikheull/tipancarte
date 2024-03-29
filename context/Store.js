import Cookies from "js-cookie";
import { createContext, useReducer } from "react";
// Create context
export const Store = createContext();
// Define an initial state
const initialState = {
    cart: {
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
    },
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null
}
// Define reducer function
function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            // GET PAYLOAD ITEM
            const newItem = action.payload; // newItem refers an received Object Product Model properties
            // ALREADY EXIST NEW ITEM ?
            // Search in state if already existsthis item (Return object if is true)
            const existItem = state.cart.cartItems.find((item) =>
                item._id == newItem._id
            );
            
            // TO ADD NO MATTER PRODUCT IS REPETEAD
            const cartItems = existItem ? state.cart.cartItems.map((item) =>
                item._id === existItem._id ? newItem : item
            ) : [...state.cart.cartItems, newItem];
            // console.log('cart items: ', cartItems)
            Cookies.set('cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } } // cartItems: cartItems
        }
        case 'CART_REMOVE_ITEM': {
            const itemToDelete = action.payload
            const cartItems = state.cart.cartItems.filter((item) => { return item._id !== itemToDelete._id })
            // console.log('Cart after deletion: ', cartItems)
            Cookies.set('cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }
        }
        case 'USER_LOGIN': {
            Cookies.set('userInfo', JSON.stringify(action.payload))
            return { ...state, userInfo: action.payload }
        }
        case 'USER_LOGIN_GOOGLE': {
            Cookies.set('userInfo', JSON.stringify(action.payload))
            return { ...state, userInfo: action.payload }
        }
        case 'USER_LOG_OUT': {
            return { ...state, userInfo: null, cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' } }
        }
        case 'CART_CLEAR': {
            return { ...state, cart: { ...state.cart, cartItems: [] } }
        }

        default:
            break;
    }
}

// Create Store provider that allows to wrap all components inside StoreProvider
export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}

import { loader } from "./shop";

export function addItem(item,next){
    let cart = [];
    if (typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        })
        cart = Array.from(new  Set(cart.map((p) => (p._id)))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart))
        next();
    }
};
//remove duplicates
//build an array from new Set and turn it back into array using Arra.from
//so that later we can re-map it
//new set will only allow unitque values in i
//so pass the ids of each object/products
//if the loop tries to add the same value again it'll get ignored
//...with the array of ids we got on when frist map() was used
//run map() on it again and return the actual product from the cart
export function itemTotal(){
    if (typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length;
        }
        return 0
    }
    
};


export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};
//update quantity of item in cart **you still have to update tha map function**
export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
};
//remove item from cart
export const removeItem = productId => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);//takes the cart and use the slice method to remove the item at that index
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};

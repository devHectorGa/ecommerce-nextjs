import { toast } from 'react-toastify';
import { includes, size, remove } from 'lodash';
import { BASE_PATH, CART } from '../utils/constants';
import { authFetch } from '../utils/fetch';

export function getProductsCart() {
  const cart = localStorage.getItem(CART);

  if (cart) {
    const products = cart.split(',');
    return products;
  } else {
    return null;
  }
}

export function addProductCart(product) {
  const cart = getProductsCart();

  if (cart) {
    const productFound = includes(cart, product);

    if (productFound) {
      toast.warning('Este producto ya esta en el carrito');
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success('Producto añadido correctamente');
    }
  } else {
    localStorage.setItem(CART, product);
    toast.success('Producto añadido al carrito');
  }
}

export function countProductsCart() {
  const cart = getProductsCart();

  if (cart) {
    return size(cart);
  } else {
    return 0;
  }
}

export function removeProductCart(product) {
  const cart = getProductsCart();

  const newCart = cart.filter((item) => item !== product);

  if (newCart.length) {
    localStorage.setItem(CART, newCart);
  } else {
    localStorage.removeItem(CART);
  }
}

export async function paymentCartApi(token, products, idUser, address, logout) {
  try {
    const addressShipping = address;
    delete addressShipping.user;
    delete addressShipping.createAt;

    const url = `${BASE_PATH}/orders`;
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        products,
        idUser,
        addressShipping,
      }),
    };

    return await authFetch(url, params, logout);
  } catch (error) {
    console.error(error);
    return null;
  }
}

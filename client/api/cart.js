import { toast } from 'react-toastify';
import { includes, size } from 'lodash';
import { BASE_PATH, CART } from '../utils/constants';

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

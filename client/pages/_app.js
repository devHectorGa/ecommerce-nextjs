import { useMemo, useState, useEffect } from 'react';
import '../scss/global.scss';
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { setToken, getToken, removeToken } from '../api/token';
import {
  getProductsCart,
  addProductCart,
  countProductsCart,
} from '../api/cart';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  useEffect(() => {
    setTotalProductsCart(countProductsCart());
  }, [reloadCart, auth]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push('/');
    }
  };

  const addProduct = (product) => {
    const token = getToken();
    if (token) {
      addProductCart(product);
      setReloadCart(!reloadCart);
    } else {
      toast.warning('Para comprar un juego tienes que iniciar sesión.');
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductsCart,
      removeProductCart: () => null,
      removeAllProductsCart: () => null,
    }),
    [totalProductsCart]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

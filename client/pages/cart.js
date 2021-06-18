import { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { getGameByUrlApi } from '../api/game';
import useCart from '../hooks/useCart';

export default function Cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();

  return products?.length ? <FullCart products={products} /> : <EmptyCart />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>No hay productos en el carrito</h2>
    </BasicLayout>
  );
}

function FullCart({ products }) {
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    (async () => {
      const productsTemp = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productsTemp.push(data);
      }
      setProductsData(productsTemp);
    })();
  }, []);

  return (
    <BasicLayout className="empty-cart">
      <h2>Carrito</h2>
    </BasicLayout>
  );
}

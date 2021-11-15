import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import BasicLayout from '../layouts/BasicLayout';
import { getOrdersApi } from '../api/order';
import useAuth from '../hooks/useAuth';
import Order from '../components/Orders/Order';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logout);
      setOrders(response);
    })();
  }, []);
  return (
    <BasicLayout className="orders">
      <div className="orders__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
          {orders.length ? (
            <OrderList orders={orders} />
          ) : (
            <h2 style={{ textAlign: 'center' }}>
              Todavía no has realizado ninguna compra
            </h2>
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

function OrderList({ orders }) {
  return (
    <Grid>
      {orders?.map((order) => (
        <Grid.Column key={order?._id} mobile={16} tablet={8} computer={8}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  );
}

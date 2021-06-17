import { useState, useEffect } from 'react';
import { size, forEach } from 'lodash';
import BasicLayout from '../layouts/BasicLayout';
import { getFavoriteApi } from '../api/favorite';
import useAuth from '../hooks/useAuth';
import { Loader } from 'semantic-ui-react';
import ListGames from '../components/ListGames';

export default function wishlist() {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getFavoriteApi(auth.idUser, logout);
      if (response.length) {
        const gamesList = [];
        response.forEach((data) => gamesList.push(data.game));
        setGames(gamesList);
      } else {
        setGames([]);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de deseos</div>
        <div className="data">
          {loading ? (
            <Loader active={loading}>Cargando juegos</Loader>
          ) : (
            <>
              {games?.length && <ListGames className="content" games={games} />}
              {!games?.length && <h3>No tienes ningún juego en tu lista</h3>}
            </>
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

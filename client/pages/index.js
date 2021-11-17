import { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import BasicLayout from '../layouts/BasicLayout';
import { getLastGamesApi } from '../api/game';
import ListGames from '../components/ListGames';
import Seo from '../components/Seo';

export default function Home() {
  const [games, setGames] = useState(null);
  const [loadingHome, setLoadingHome] = useState(false);
  useEffect(() => {
    setLoadingHome(true);
    (async () => {
      const response = await getLastGamesApi(50);
      setGames(response || []);
      setLoadingHome(false);
    })();
  }, []);
  return (
    <BasicLayout className="home">
      <Seo />
      {loadingHome ? (
        <Loader active={loadingHome}>Cargando juegos</Loader>
      ) : (
        <>
          {games?.length && <ListGames games={games} />}
          {!games?.length && <h3>No hay juegos</h3>}
        </>
      )}
    </BasicLayout>
  );
}

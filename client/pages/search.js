import { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { searchGamesApi, getLastGamesApi } from '../api/game';
import ListGames from '../components/ListGames';
import Seo from '../components/Seo';

export default function Search() {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const { query, push } = useRouter();

  useEffect(() => {
    document.getElementById('search-game').focus();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const decodeQuery = decodeURIComponent(query?.query || '');
      if (decodeQuery?.length) {
        const response = await searchGamesApi(decodeQuery);
        if (response.length) {
          setGames(response);
        } else {
          setGames([]);
        }
      } else {
        const response = await getLastGamesApi();
        setGames(response);
      }
      setLoading(false);
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      <Seo title={`Buscando ${query.query}`} />
      {loading ? (
        <Loader active={loading}>Cargando juegos</Loader>
      ) : (
        <>
          {games?.length > 0 && <ListGames className="content" games={games} />}
          {!games?.length && <h3>No se han encontrado juegos</h3>}
        </>
      )}
    </BasicLayout>
  );
}

import { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import BasicLayout from '../../layouts/BasicLayout';
import { getGamesPlatformApi, getTotalGamesPlatformApi } from '../../api/game';
import ListGames from '../../components/ListGames';
import Pagination from '../../components/Pagination';

const limitPerPage = 20;

export default function Platform() {
  const { query } = useRouter();
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalGames, setTotalGames] = useState(null);

  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    if (!query.page || currentPage === 1) {
      return 0;
    } else {
      return currentPage * limitPerPage - limitPerPage;
    }
  };

  useEffect(() => {
    (async () => {
      if (query?.platform) {
        setLoading(true);
        const response = await getGamesPlatformApi(
          query?.platform,
          limitPerPage,
          getStartItem()
        );
        setGames(response || []);
        setLoading(false);
      }
    })();
  }, [query]);
  useEffect(() => {
    (async () => {
      if (query?.platform) {
        const response = await getTotalGamesPlatformApi(query.platform);
        setTotalGames(response || 0);
      }
    })();
  }, [query?.platform]);

  return (
    <BasicLayout className="platform">
      {loading ? (
        <Loader active={loading}>Cargando juegos</Loader>
      ) : (
        <>
          {games?.length && <ListGames className="content" games={games} />}
          {!games?.length && <h3>No hay juegos</h3>}
          {totalGames > 0 && (
            <Pagination
              totalGames={totalGames}
              page={query.page ? parseInt(query.page) : 1}
              limitPerPage={limitPerPage}
            />
          )}
        </>
      )}
    </BasicLayout>
  );
}

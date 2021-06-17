import { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { searchGamesApi } from '../api/game';
import { useRouter } from 'next/router';

export default function Search() {
  const [games, setGames] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById('search-game').focus();
  }, []);

  useEffect(() => {
    (async () => {
      const decodeQuery = decodeURIComponent(query?.query || '');
      if (decodeQuery?.length) {
        const response = await searchGamesApi(decodeQuery);
        if (response.length) {
          setGames(response);
        } else {
          setGames([]);
        }
      } else {
        setGames([]);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      <h1>Búsqueda...</h1>
    </BasicLayout>
  );
}

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../../layouts/BasicLayout';
import { getGamesPlatformApi } from '../../api/game';

const limitPerPage = 10;

export default function Platform() {
  const { query } = useRouter();
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      if (query?.platform) {
        const response = await getGamesPlatformApi(
          query?.platform,
          limitPerPage,
          0
        );
        setGames(response || []);
      }
    })();
  }, [query?.platform]);

  return (
    <BasicLayout>
      <h1>Estamos en plataforma {query?.platform}</h1>
    </BasicLayout>
  );
}

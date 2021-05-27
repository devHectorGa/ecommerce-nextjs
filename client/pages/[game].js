import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../layouts/BasicLayout';
import { getGameByUrlApi } from '../api/game';

export default function Game() {
  const [game, setGame] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);
      setGame(response);
    })();
  }, [query]);

  return (
    <BasicLayout className="game">
      <h1>Games</h1>
    </BasicLayout>
  );
}

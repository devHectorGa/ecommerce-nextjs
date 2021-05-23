import { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { getLastGamesApi } from '../api/game';

export default function Home() {
  const [games, setGames] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getLastGamesApi(50);
      setGames(response || []);
    })();
  });
  return (
    <BasicLayout>
      <h1>Estamos en la Home</h1>
    </BasicLayout>
  );
}

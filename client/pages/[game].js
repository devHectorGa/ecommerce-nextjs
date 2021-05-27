import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../layouts/BasicLayout';
import { getGameByUrlApi } from '../api/game';
import HeaderGame from '../components/Game/HeaderGame';
import { Loader } from 'semantic-ui-react';

export default function Game() {
  const [game, setGame] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      if (query?.game) {
        const response = await getGameByUrlApi(query.game);
        setGame(response);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="game">
      {game?.title ? (
        <>
          <HeaderGame game={game} />
          <p>Tab Game</p>
        </>
      ) : (
        <Loader active>Cargando juego</Loader>
      )}
    </BasicLayout>
  );
}

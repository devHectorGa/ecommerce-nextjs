import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../layouts/BasicLayout';
import { getGameByUrlApi } from '../api/game';
import HeaderGame from '../components/Game/HeaderGame';
import TabsGame from '../components/Game/TabsGame';
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
          <TabsGame game={game} />
        </>
      ) : (
        <Loader active>Cargando juego</Loader>
      )}
    </BasicLayout>
  );
}

import { useState, useEffect } from 'react';
import { Image, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import { map } from 'lodash';
import useWindowSize from '../../hooks/useWindowSize';
import {
  breakPointUpSm,
  breakPointUpMd,
  breakPointUpLg,
} from '../../utils/breakpoint';

export default function ListGames({ games }) {
  const [columns, setColumns] = useState(5);
  const { width } = useWindowSize();

  const getColumnsRender = (width) => {
    switch (true) {
      case width > breakPointUpLg:
        return 5;
      case width > breakPointUpMd:
        return 3;
      case width > breakPointUpSm:
        return 2;
      default:
        return 1;
    }
  };
  useEffect(() => {
    setColumns(getColumnsRender(width));
  }, [width, getColumnsRender]);

  return (
    <div className="list-games">
      <Grid>
        <Grid.Row columns={columns}>
          {map(games, (game) => (
            <Game key={game._id} game={game} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

function Game({ game }) {
  return (
    <Grid.Column className="list-games__game">
      <Link href={`/${game.url}`}>
        <a>
          <div className="list-games__game-poster">
            <Image src={game?.poster?.url} alt={game.title} />
            <div className="list-games__game-poster-info">
              {game?.discount && (
                <span className="discount"> -{game.discount}%</span>
              )}
              <span className="price">{game.price}$</span>
            </div>
          </div>
          <h2>{game.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
}

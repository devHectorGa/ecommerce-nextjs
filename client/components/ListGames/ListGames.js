import { Image, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import { map } from 'lodash';

export default function ListGames({ games }) {
  return (
    <div className="list-games">
      <Grid>
        <Grid.Row columns={5}>
          {map(games, (game) => (
            <Game game={game} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

function Game({ game }) {
  return (
    <Grid.Column className="list-games__game">
      <Link href={`/games/${game.url}`}>
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

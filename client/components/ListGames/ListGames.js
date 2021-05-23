import { map } from 'lodash';

export default function ListGames({ games }) {
  return (
    <div className="list-games">
      {map(games, (game) => (
        <h3>{game?.title}</h3>
      ))}
    </div>
  );
}

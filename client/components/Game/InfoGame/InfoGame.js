import ReactPlayer from 'react-player/lazy';
import CarouselScreenshots from '../CarouselScreenshots';

export default function InfoGame({ game }) {
  return (
    <div className="info-game">
      <div className="info-game__wrapper-video">
        <ReactPlayer url={game.video} width="100%" height="auto" controls />
      </div>
      <CarouselScreenshots title={game.title} screenshots={game.screenshots} />
    </div>
  );
}

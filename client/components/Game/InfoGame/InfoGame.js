import ReactPlayer from 'react-player/lazy';
import moment from 'moment';
import 'moment/locale/es';
import CarouselScreenshots from '../CarouselScreenshots';

export default function InfoGame({ game }) {
  return (
    <div className="info-game">
      <div className="info-game__wrapper-video">
        <ReactPlayer url={game.video} width="100%" height="auto" controls />
      </div>
      <CarouselScreenshots title={game.title} screenshots={game.screenshots} />
      <div className="info-game__content">
        <div dangerouslySetInnerHTML={{ __html: game.summary }} />
        <div className="info-game__content-date">
          <h4>Fecha de lanzamiento</h4>
          <p>{moment(game.releaseDate).format('LL')}</p>
        </div>
      </div>
    </div>
  );
}

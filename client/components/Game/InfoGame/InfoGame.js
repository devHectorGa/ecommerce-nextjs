import ReactPlayer from 'react-player/lazy';

export default function InfoGame({ game }) {
  return (
    <div className="info-game">
      <div className="info-game__wrapper-video">
        <ReactPlayer
          className="info-game__video"
          url={game.video}
          width="100%"
          height="auto"
          controls
        />
      </div>
    </div>
  );
}

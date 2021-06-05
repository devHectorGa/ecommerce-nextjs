import { Image } from 'semantic-ui-react';
import Slider from 'react-slick';
import { map } from 'lodash';

const settings = {
  className: 'carousel-screenshots',
  dots: false,
  infinite: true,
  slidesToShow: 5,
  swipeToSlider: true,
};

export default function CarouselScreenshots({ screenshots }) {
  return (
    <Slider
      {...{
        ...settings,
        slidesToShow:
          screenshots.length < settings.slidesToShow
            ? screenshots.length
            : settings.slidesToShow,
      }}
    >
      {map(screenshots, (screenshot) => (
        <Image
          key={screenshot.id}
          src={screenshot.url}
          alt={screenshot.name}
          onClick={() => console.log('Abrir imagen')}
        />
      ))}
    </Slider>
  );
}

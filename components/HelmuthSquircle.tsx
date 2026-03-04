import Carousel, { CarouselSlide } from './Carousel';

const HELMUTH_SLIDES: CarouselSlide[] = [
  {
    id: 'public',
    image: require('../assets/images/Image Assets/1. Home/helmuth/public.png'),
    caption: 'Your neighbor in public',
  },
  {
    id: 'naked',
    image: require('../assets/images/Image Assets/1. Home/helmuth/naked.png'),
    caption: 'Your neighbor naked',
  },
  {
    id: 'marathon',
    image: require('../assets/images/Image Assets/1. Home/helmuth/marathon.png'),
    caption: 'Your neighbor running',
  },
  {
    id: 'lawyer',
    image: require('../assets/images/Image Assets/1. Home/helmuth/lawyer.png'),
    caption: 'Your neighbor at work',
  },
  {
    id: 'orang',
    image: require('../assets/images/Image Assets/1. Home/helmuth/orang.png'),
    caption: 'Your neighbor with his friends',
  },
];

export default function HelmuthSquircle() {
  const squircleBackground = require('../assets/images/Image Assets/0. Global/squircles/helmuth-phone.png');

  return (
    <Carousel slides={HELMUTH_SLIDES} squircleBackground={squircleBackground} />
  );
}

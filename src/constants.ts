import {
  FireIcon,
  HomeIcon,
  TrendingUpIcon,
  UserGroupIcon,
  //   FaceFrownIcon,
  //   FaceSmileIcon,
  //   HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  //   XMarkIcon,
} from '@heroicons/react/solid';
import { Mood } from './interfaces';

export const DEFAULT_PROFILE_PICTURE =
  'https://pbs.twimg.com/media/CJXvZGYUwAAymYD.png';

export const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Popular', href: '#', icon: FireIcon, current: false },
  { name: 'Communities', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Trending', href: '#', icon: TrendingUpIcon, current: false },
];

export const moods: Mood[] = [
  {
    name: 'Excited',
    value: 'excited',
    icon: FireIcon,
    iconColor: 'text-white',
    bgColor: 'bg-red-500',
  },
  {
    name: 'Loved',
    value: 'loved',
    icon: HeartIcon,
    iconColor: 'text-white',
    bgColor: 'bg-pink-400',
  },
  {
    name: 'Happy',
    value: 'happy',
    icon: FireIcon,
    iconColor: 'text-white',
    bgColor: 'bg-green-400',
  },
  {
    name: 'Sad',
    value: 'sad',
    icon: FireIcon,
    iconColor: 'text-white',
    bgColor: 'bg-yellow-400',
  },
  {
    name: 'Thumbsy',
    value: 'thumbsy',
    icon: FireIcon,
    iconColor: 'text-white',
    bgColor: 'bg-blue-500',
  },
  {
    name: 'I feel nothing',
    value: null,
    icon: FireIcon,
    iconColor: 'text-gray-400',
    bgColor: 'bg-transparent',
  },
];

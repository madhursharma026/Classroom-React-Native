import {STRINGS} from '../constants/strings';

export const onBoardingScreens = [
  {
    title: STRINGS.stepOneHeader,
    subTitle: STRINGS.stepOneSubHeader,
    icon: require('../assets/images/slide1.png'),
  },
  {
    title: STRINGS.stepTwoHeader,
    subTitle: STRINGS.stepTwoSubHeader,
    icon: require('../assets/images/slide2.png'),
  },
  {
    title: STRINGS.stepThreeHeader,
    subTitle: STRINGS.stepThreeSubHeader,
    icon: require('../assets/images/slide3.png'),
  },
];

export const THEME_SETTINGS_OPTIONS = [
  {
    index: 0,
    value: STRINGS.SYSTEM_DEFAULT,
    theme: 'system',
    checked: true,
  },
  {
    index: 1,
    value: STRINGS.LIGHT,
    theme: 'light',
    checked: false,
  },
  {
    index: 2,
    value: STRINGS.DARK,
    theme: 'dark',
    checked: false,
  },
];

export const UPCOMING_CLASSES_LIST = [
  {
    thumbnail: require('../assets/images/slide1.png'),
    className: 'react native class',
    description: 'react native components',
    startTime: '9am',
    teacherName: 'abc john',
    levelOfClass: 1,
  },
  {
    thumbnail: require('../assets/images/slide2.png'),
    className: 'nodejs class',
    description: 'nodejs',
    startTime: '11:20am',
    teacherName: 'xyz john',
    levelOfClass: 1,
  },
  {
    thumbnail: require('../assets/images/slide3.png'),
    className: 'react js class',
    description: 'react js components',
    startTime: '10am',
    teacherName: 'john cena',
    levelOfClass: 3,
  },
  {
    thumbnail: require('../assets/images/slide1.png'),
    className: 'english class',
    description: 'english talk',
    startTime: '8am',
    teacherName: 'micheal',
    levelOfClass: 1,
  },
  {
    thumbnail: require('../assets/images/slide2.png'),
    className: 'android basic',
    description: 'android components',
    startTime: '10:30am',
    teacherName: 'xyz john',
    levelOfClass: 2,
  },
];

import {StyleSheet} from 'react-native';
import {getHeightOfBottomBar} from '../utils/scalingUtils';
import COLORS from './colors';

const commonStyles = StyleSheet.create({
  flex: {flex: 1},
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBarStyle: {
    position: 'absolute',
    marginBottom: 0,
    borderTopWidth: 0,
    paddingBottom: 5,
    height: getHeightOfBottomBar(),
    backgroundColor: COLORS.TAB_BG_COLOR,
  },
});

export default commonStyles;

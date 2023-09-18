import {Appearance} from 'react-native';
import {SET_THEME} from '../actions/themeActions';

import * as Colors from './../../themes/themeColors';
const defaultMode = Appearance.getColorScheme() || 'light';
const isDark = defaultMode === 'dark';

const initialState = {
  themeMode: 'system',
  isDark: isDark,
  colors: isDark ? Colors.DARK_THEME_COLORS : Colors.LIGHT_THEME_COLORS,
};

const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_THEME: {
      const mode = Appearance.getColorScheme() || 'light';
      const themeMode = action.payload === 'system' ? mode : action.payload;
      const isDarkMode = themeMode === 'dark';
      return {
        ...state,
        themeMode: action.payload,
        isDark: isDarkMode,
        colors: isDarkMode
          ? Colors.DARK_THEME_COLORS
          : Colors.LIGHT_THEME_COLORS,
      };
    }

    default:
      return state;
  }
};

export default themeReducer;

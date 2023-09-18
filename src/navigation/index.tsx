import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SCREENS from '../constants/screens';
import commonStyles from '../themes/commonStyles';
import {TabIcon} from '../components/TabIcon';
import Home from '../screens/Home';
import Classes from '../screens/Classes';
import Convo from '../screens/Convo';
import Learn from '../screens/Learn';
import More from '../screens/More';
import SVG from '../constants/svgs';
import {STRINGS} from '../constants/strings';
import COLORS from '../themes/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import ClassDetails from '../screens/Classes/ClassDetails';
import VideoCall from '../components/VideoCall/VideoCall';
import AudioCall from '../components/AudioCall/AudioCall';
import BrodcastStream from '../components/VideoCall/BrodcastCall';
import RoomPage from '../components/VideoCall/RoomPage';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTab() {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const colors = theme.colors;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          commonStyles.tabBarStyle,
          {backgroundColor: colors.HEADER_BG_COLOR},
        ],
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={SCREENS.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            TabIcon({
              tabBarLabel: STRINGS.HOME,
              focused,
              activeIcon: SVG.ACTIVE_HOME_TAB_ICON,
              inActiveIcon: SVG.INACTIVE_HOME_TAB_ICON,
              labelColor: COLORS.LIGHT_GREEN,
            }),
        }}
      />
      <Tab.Screen
        name={SCREENS.CLASSES}
        component={Classes}
        options={{
          tabBarIcon: ({focused}) =>
            TabIcon({
              tabBarLabel: STRINGS.CLASSES,
              focused,
              activeIcon: SVG.ACTIVE_CLASSES_TAB_ICON,
              inActiveIcon: SVG.INACTIVE_CLASSES_TAB_ICON,
              labelColor: COLORS.DARK_YELLOW,
            }),
        }}
      />
      <Tab.Screen
        name={SCREENS.CONVO}
        component={Convo}
        options={{
          tabBarIcon: ({focused}) =>
            TabIcon({
              tabBarLabel: STRINGS.CONVO,
              focused,
              activeIcon: SVG.ACTIVE_CONVO_TAB_ICON,
              inActiveIcon: SVG.INACTIVE_CONVO_TAB_ICON,
              labelColor: COLORS.BLUE_LIGHT,
            }),
        }}
      />
      <Tab.Screen
        name={SCREENS.LEARN}
        component={Learn}
        options={{
          tabBarIcon: ({focused}) =>
            TabIcon({
              tabBarLabel: STRINGS.LEARN,
              focused,
              activeIcon: SVG.ACTIVE_LEARN_TAB_ICON,
              inActiveIcon: SVG.INACTIVE_LEARN_TAB_ICON,
              labelColor: COLORS.PURPLE_LIGHT,
            }),
        }}
      />
      <Tab.Screen
        name={SCREENS.MORE}
        component={More}
        options={{
          tabBarIcon: ({focused}) =>
            TabIcon({
              tabBarLabel: STRINGS.MORE,
              focused,
              activeIcon: SVG.ACTIVE_MORE_TAB_ICON,
              inActiveIcon: SVG.INACTIVE_MORE_TAB_ICON,
              labelColor: COLORS.PINK_LIGHT,
            }),
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name={SCREENS.HOME_TAB} component={HomeTab} />
      <RootStack.Screen name={SCREENS.VIDEO_CALL} component={VideoCall} />
      <RootStack.Screen name={SCREENS.AUDIO_CALL} component={AudioCall} />
      <RootStack.Screen name={'BrodcastStream'} component={BrodcastStream} />
      <RootStack.Screen name={SCREENS.CLASS_DETAILS} component={ClassDetails} />
      <RootStack.Screen name={'RoomPage'} component={RoomPage} />
    </RootStack.Navigator>
  );
}

export default AppNavigator;

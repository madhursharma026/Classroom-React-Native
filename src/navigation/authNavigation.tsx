import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SCREENS from '../constants/screens';
import Onboarding from '../screens/OnBoarding';
import Login from '../screens/Login';
import VerifyOtp from '../screens/VerifyOtp';

const RootStack = createNativeStackNavigator();
const OnBoardingStack = createNativeStackNavigator();

function OnBoardingStackNav() {
  return (
    <OnBoardingStack.Navigator screenOptions={{headerShown: false}}>
      <OnBoardingStack.Screen
        name={SCREENS.ON_BOARDING}
        component={Onboarding}
      />
    </OnBoardingStack.Navigator>
  );
}
function AuthNavigator() {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen
        name={SCREENS.ON_BOARDING_STACK_NAV}
        component={OnBoardingStackNav}
      />
      <RootStack.Screen name={SCREENS.LOGIN} component={Login} />
      <RootStack.Screen name={SCREENS.VERIFY_OTP} component={VerifyOtp} />
    </RootStack.Navigator>
  );
}

export default AuthNavigator;



// export type RootStackParamList = {
//   PreJoinPage: undefined;
//   RoomPage: { url: string; token: string };
// };
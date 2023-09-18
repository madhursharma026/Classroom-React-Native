import {CommonActions} from '@react-navigation/native';

const resetRoute = (navigation: any, route: any) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: route}],
    }),
  );
};

export {resetRoute};

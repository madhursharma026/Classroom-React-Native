import * as React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Header} from '../../components/Header';
import {STRINGS} from '../../constants/strings';
import COLORS from '../../themes/colors';
import {RootState} from '../../redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import Button from '../../components/Button';
import SCREENS from '../../constants/screens';
import {responsiveHeight, scale} from '../../utils/scalingUtils';
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useSubscription,
} from '@apollo/client';
import {GET_ALL_USERS} from '../../graphql/query';
import {INITIATE_CONVERSATION, PAIR_MATCHES} from '../../graphql/mutations';

const Convo = ({navigation, colors}: {navigation: any; colors: any}) => {
  const [allUsers] = useLazyQuery(GET_ALL_USERS);

  const [initiateConversation] = useMutation(INITIATE_CONVERSATION);
  const client = useApolloClient();
  const subscription = client.subscribe({query: PAIR_MATCHES});
  // const pairMatched = useSubscription(PAIR_MATCHES);

  // const getAllUsers = async () => {
  //   await allUsers({
  //     variables: {},
  //   })
  //     .then(res => {
  //       console.log('getAllUsers res ==> ', res);
  //     })
  //     .catch(err => console.log('getAllUsers err ==> ', err));
  // };

  React.useEffect(() => {
    initiateChat();
    return () => {};
  }, []);

  const initiateChat = async () => {
    await initiateConversation({
      variables: {},
    })
      .then(res => {
        console.log('API Call initiateConversation res ==> ', res);
        matchPair();
      })
      .catch(err => console.log('API Call initiateConversation err ==> ', err));
  };

  const matchPair = () => {
    subscription.subscribe({
      next: result => {
        // Handle the received data from the subscription
        console.log('API Call Received subscription data:', result.data);
      },
      complete: () => {
        console.log('subscription complete ==> ');
      },
      error: error => {
        console.error('API Call Subscription error:', error);
      },
    });
  };

  // const matchPair1 = async () => {
  //   await pairMatched({
  //     variables: {},
  //   })
  //     .then(res => {
  //       console.log('API Call pairMatched res ==> ', res);
  //     })
  //     .catch(err => console.log('API Call pairMatched err ==> ', err));
  // };

  return (
    <View style={[styles.container, {backgroundColor: colors.SCREEN_BG_COLOR}]}>
      <Header title={STRINGS.CONVO} navigation={navigation} colors={colors} />
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <Button
          title={'Audio Call'}
          wrapperStyle={styles.loginBtnViewStyle}
          onClick={() => {
            navigation.navigate(SCREENS.AUDIO_CALL);
            // navigation.navigate(SCREENS.VIDEO_CALL);
          }}
        />

        <Button
          title={'Get All Users'}
          wrapperStyle={styles.loginBtnViewStyle}
          onClick={() => {
            // getAllUsers();
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  const {themeReducer} = state;
  const {themeMode, isDark, colors} = themeReducer;
  return {
    themeMode,
    isDark,
    colors,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Convo);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.WHITE},
  loginBtnViewStyle: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(45),
    backgroundColor: COLORS.BLUE_STONE,
    marginTop: responsiveHeight(1),
    marginHorizontal: 0,
  },
});

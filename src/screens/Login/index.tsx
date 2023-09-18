import React, {useState} from 'react';
import {View, StyleSheet, Keyboard, SafeAreaView} from 'react-native';
import {STRINGS} from '../../constants/strings';
import {
  responsiveHeight,
  responsiveWidth,
  scale,
  getResponsiveFontSize,
} from '../../utils/scalingUtils';
import {Header} from '../../components/Header';
import COLORS from '../../themes/colors';
import SCREENS from '../../constants/screens';
import {RootState} from '../../redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import Button from '../../components/Button';
import TextInputBox from '../../components/TextInput';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useMutation} from '@apollo/client';
import {FIRST_SETP_USER_LOGIN} from '../../graphql/mutations';

const Login = ({
  navigation,
  colors,
  isDark,
}: {
  navigation: any;
  colors: any;
  isDark: boolean;
}) => {
  const [firstStepUserLogin] = useMutation(FIRST_SETP_USER_LOGIN);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onRequestOTP = async () => {
    Keyboard.dismiss();
    if (!phoneNumber || phoneNumber === '') {
      setErrorMessage(STRINGS.PHONE_NUMBER_REQUIRED);
      return;
    }

    await firstStepUserLogin({
      variables: {
        firstStepUserLoginInput: {
          mobileNumber: phoneNumber,
        },
      },
    })
      .then(res => {
        Toast.show(String(STRINGS.REQUEST_OTP_SUCCESS));
        navigation.navigate(SCREENS.VERIFY_OTP, {mobileNumber: phoneNumber});
      })
      .catch(error => {
        console.log('firstStepUserLogin error ===> ', error);

        Toast.show(error?.message);
      });

    return;
  };

  const renderBottomButtons = () => {
    return (
      <View style={styles.marginBottomViewStyle}>
        <Button title={STRINGS.REQUEST_OTP} onClick={onRequestOTP} />
      </View>
    );
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.ONBOARDING_BG_COLOR}]}>
      <SafeAreaView style={{flex: 1}}>
        <Header
          title={STRINGS.WELCOME_BACK}
          navigation={navigation}
          isLeftView={true}
          colors={colors}
          isDark={isDark}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}>
          <View style={styles.subContentViewStyle}>
            <View style={styles.inputContentViewStyle}>
              <TextInputBox
                inputTitle={STRINGS.PHONE_NUMBER}
                textInputProps={{
                  placeholder: STRINGS.ENTER_PHONE_NUMBER,
                  value: phoneNumber,
                  onChangeText: (text: any) => {
                    setPhoneNumber(text);
                    setErrorMessage('');
                  },
                  placeholderTextColor: colors.SLIDE_NOTE_COLOR,
                }}
                inputStyle={[
                  styles.inputTextStyle,
                  {
                    borderBottomColor: colors.SLIDE_NOTE_COLOR,
                    color: colors.INPUT_FIELD_COLOR,
                  },
                ]}
                keyboardType={'number-pad'}
                wrapperStyle={{marginTop: 0}}
                colors={colors}
                error={errorMessage ? errorMessage : ''}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        {renderBottomButtons()}
      </SafeAreaView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  subContentViewStyle: {
    flex: 1,
    paddingHorizontal: responsiveWidth(2),
  },
  inputContentViewStyle: {
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(10),
  },
  inputTitleTextStyle: {
    color: COLORS.GRAY_DARK,
    fontSize: getResponsiveFontSize(14),
  },
  inputTextStyle: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BLACK_OPACITY_2,
    fontSize: getResponsiveFontSize(14),
    paddingBottom: responsiveHeight(0.2),
  },
  marginBottomViewStyle: {marginBottom: responsiveHeight(5)},
  loginBtnViewStyle: {
    borderRadius: 8,
    marginHorizontal: responsiveWidth(5),
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(50),
    backgroundColor: COLORS.BLUE_STONE,
  },
  loginBtnTextStyle: {
    color: COLORS.WHITE,
    fontSize: getResponsiveFontSize(14),
    fontWeight: '500',
  },
});

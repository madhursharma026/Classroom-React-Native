import * as React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {Header} from '../../components/Header';
import {STRINGS} from '../../constants/strings';
import COLORS from '../../themes/colors';
import {RootState} from '../../redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {
  responsiveHeight,
  responsiveWidth,
  scale,
  getResponsiveFontSize,
} from '../../utils/scalingUtils';
import Button from '../../components/Button';
import SCREENS from '../../constants/screens';

const sectionImg = require('../../assets/images/slide2.png');

const Home = ({navigation, colors}: {navigation: any; colors: any}) => {
  React.useEffect(() => {
    const randomID = Math.floor(Math.random() * 101);
    console.log('uid ===> ', randomID);
  }, []);

  const renderTopicSection = () => {
    return (
      <View
        style={[
          styles.sectionContainerViewStyle,
          {
            backgroundColor: colors.HEADER_BG_COLOR,
          },
        ]}>
        <View>
          <Text
            style={[styles.stepOneHeader, {color: colors.SLIDE_TITLE_COLOR}]}>
            {STRINGS.PRACTICE_MAKE_PERFECT}
          </Text>
          <Text
            style={[styles.stepOneSubHeader, {color: colors.SLIDE_NOTE_COLOR}]}>
            {STRINGS.PRACTICE_MAKE_PERFECT_NOTE}
          </Text>
          <View style={styles.imageSectionViewStyle}>
            <Image source={sectionImg} style={styles.imageContentViewStyle} />
          </View>
          <Button
            title={STRINGS.CHOOSE_A_PLAN}
            wrapperStyle={styles.loginBtnViewStyle}
          />
        </View>
      </View>
    );
  };

  const renderClassesSection = () => {
    return (
      <View
        style={[
          styles.sectionContainerViewStyle,
          {
            backgroundColor: colors.HEADER_BG_COLOR,
          },
        ]}>
        <View>
          <Text
            style={[styles.stepOneHeader, {color: colors.SLIDE_TITLE_COLOR}]}>
            {STRINGS.YOUR_NEW_CLASSROOM}
          </Text>
          <Text
            style={[styles.stepOneSubHeader, {color: colors.SLIDE_NOTE_COLOR}]}>
            {STRINGS.YOUR_NEW_CLASSROOM_NOTE}
          </Text>
          <Button
            title={STRINGS.LEARN_MORE}
            wrapperStyle={styles.loginBtnViewStyle}
          />
        </View>
      </View>
    );
  };

  const renderGroupSection = () => {
    return (
      <View
        style={[
          styles.sectionContainerViewStyle,
          {
            backgroundColor: colors.HEADER_BG_COLOR,
          },
        ]}>
        <View>
          <View style={styles.imageSectionViewStyle}>
            <Image source={sectionImg} style={styles.imageContentViewStyle} />
          </View>
          <Text
            style={[styles.stepOneHeader, {color: colors.SLIDE_TITLE_COLOR}]}>
            {STRINGS.NEW_GROUPS_SUBSCRIPTION}
          </Text>
          <Text
            style={[styles.stepOneSubHeader, {color: colors.SLIDE_NOTE_COLOR}]}>
            {STRINGS.NEW_GROUPS_SUBSCRIPTION_NOTE}
          </Text>
          <Button
            title={STRINGS.SUBSCRIBE_TO_GROUPS}
            wrapperStyle={styles.loginBtnViewStyle}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.SCREEN_BG_COLOR}]}>
      <Header title={STRINGS.HOME} navigation={navigation} colors={colors} />
      <ScrollView contentContainerStyle={styles.scrollViewContentStyle}>
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <Button
            title={'Video Call'}
            wrapperStyle={styles.loginBtnViewStyle}
            onClick={() => {
              // navigation.navigate(SCREENS.AUDIO_CALL);
              // navigation.navigate(SCREENS.VIDEO_CALL);
              navigation.navigate(SCREENS.VIDEO_CALL);
            }}
          />

          <Button
            title={'Brodcast Stream'}
            wrapperStyle={styles.loginBtnViewStyle}
            onClick={() => {
              // navigation.navigate(SCREENS.AUDIO_CALL);
              navigation.navigate('BrodcastStream');
            }}
          />
        </View>
        {renderTopicSection()}
        {renderClassesSection()}
        {renderGroupSection()}
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
  loginBtnTextStyle: {
    color: COLORS.WHITE,
    fontSize: getResponsiveFontSize(14),
    fontWeight: '500',
  },
  sectionContainerViewStyle: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
    borderRadius: 24,
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(5),
  },
  stepOneHeader: {
    fontSize: getResponsiveFontSize(22),
    lineHeight: getResponsiveFontSize(26),
    textAlign: 'left',
    fontWeight: 'bold',
  },
  stepOneSubHeader: {
    fontSize: getResponsiveFontSize(15),
    lineHeight: getResponsiveFontSize(20),
    textAlign: 'left',
    marginTop: responsiveHeight(1.5),
    color: COLORS.GRAY_DARK,
  },
  imageSectionViewStyle: {
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContentViewStyle: {height: 130, width: 130},
  scrollViewContentStyle: {paddingBottom: responsiveHeight(15)},
});

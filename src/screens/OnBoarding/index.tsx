import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {onBoardingScreens} from '../../utils/commonUtils';
import {
  deviceWidth,
  responsiveWidth,
  responsiveHeight,
  getResponsiveFontSize,
  scale,
} from '../../utils/scalingUtils';
import SCREENS from '../../constants/screens';
import {STRINGS} from '../../constants/strings';
import COLORS from '../../themes/colors';
import {RootState} from '../../redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import Button from '../../components/Button';

const Onboarding = ({navigation, colors}: {navigation: any; colors: any}) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  interface OnboardingSlide {
    title: string;
    subTitle: string;
    icon: any;
  }

  const renderSlide = ({item}: {item: OnboardingSlide}) => {
    if (!item) {
      return null;
    }
    return (
      <View style={styles.slideView}>
        <Text style={[styles.stepOneHeader, {color: colors.SLIDE_TITLE_COLOR}]}>
          {item?.title}
        </Text>
        <Text
          style={[styles.stepOneSubHeader, {color: colors.SLIDE_NOTE_COLOR}]}>
          {item?.subTitle}
        </Text>
        <View style={styles.slideImageViewStyle}>
          <Image source={item.icon} style={styles.slideImageSizeStyle} />
        </View>
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {onBoardingScreens.map((item, i) => {
          return (
            <View
              key={i.toString()}
              style={i === currentScreenIndex ? styles.activeDot : styles.dot}
            />
          );
        })}
      </View>
    );
  };

  const renderBottomButtons = () => {
    return (
      <View style={styles.marginBottomViewStyle}>
        <Button
          title={STRINGS.LOG_IN}
          onClick={() => navigation.navigate(SCREENS.LOGIN)}
          isBorderButton
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.ONBOARDING_BG_COLOR}]}>
      <View style={styles.container}>
        <Carousel
          data={onBoardingScreens}
          renderItem={renderSlide}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth}
          containerCustomStyle={styles.scrollViewStyle}
          contentContainerCustomStyle={styles.scrollViewStyle}
          onSnapToItem={index => {
            setCurrentScreenIndex(index);
          }}
          onBeforeSnapToItem={index => {
            setCurrentScreenIndex(index);
          }}
          keyExtractor={(item, i) => `key - ${i}`}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          activeSlideAlignment={'center'}
          pagingEnabled
        />
        {renderPagination()}
        {renderBottomButtons()}
      </View>
    </SafeAreaView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideView: {
    paddingTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
    flex: 1,
  },
  scrollViewStyle: {
    ...Platform.select({
      android: {
        marginTop: -responsiveHeight(15),
        paddingTop: responsiveHeight(15),
      },
      ios: {
        overflow: 'visible',
      },
    }),
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: responsiveHeight(5),
  },
  dot: {
    backgroundColor: COLORS.GRAY,
    height: responsiveWidth(3),
    width: responsiveWidth(3),
    borderRadius: responsiveWidth(4),
    marginLeft: responsiveWidth(2),
    marginRight: responsiveWidth(2),
  },
  activeDot: {
    backgroundColor: COLORS.BLUE_STONE,
    height: responsiveWidth(3),
    width: responsiveWidth(3),
    borderRadius: responsiveWidth(4),
    marginLeft: responsiveWidth(2),
    marginRight: responsiveWidth(2),
  },
  loginBtnViewStyle: {
    borderColor: COLORS.BLUE_STONE,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: responsiveWidth(5),
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(50),
  },
  loginBtnTextStyle: {
    color: COLORS.BLUE_STONE,
    fontSize: getResponsiveFontSize(14),
    fontWeight: '500',
  },
  slideImageViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideImageSizeStyle: {height: '85%', width: '100%'},
  marginBottomViewStyle: {marginBottom: responsiveHeight(2)},
});

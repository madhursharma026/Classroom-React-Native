import * as React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Header} from '../../../components/Header';
import {STRINGS} from '../../../constants/strings';
import COLORS from '../../../themes/colors';
import {RootState} from '../../../redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {
  responsiveHeight,
  responsiveWidth,
  getResponsiveFontSize,
  scale,
} from '../../../utils/scalingUtils';
import Button from '../../../components/Button';

const ClassDetails = ({
  navigation,
  route,
  colors,
  isDark,
}: {
  navigation: any;
  route: any;
  colors: any;
  isDark: any;
}) => {
  const classDetails = route.params.classDetails;
  return (
    <View style={[styles.container, {backgroundColor: colors.SCREEN_BG_COLOR}]}>
      <Header
        title={STRINGS.CLASS_INFO}
        navigation={navigation}
        colors={colors}
        isLeftView
        isDark={isDark}
      />
      <View style={styles.classesListContentView}>
        <View style={styles.imageSectionViewStyle}>
          <Image
            source={classDetails.thumbnail}
            style={styles.imageContentViewStyle}
          />
        </View>
        <Text
          style={[
            styles.classNameTextStyle,
            {color: colors.SLIDE_TITLE_COLOR},
          ]}>
          {classDetails.className}
        </Text>
        <Text
          style={[
            styles.classDescNameTextStyle,
            {color: colors.SLIDE_NOTE_COLOR},
          ]}>
          {classDetails.description}
        </Text>
        <Text
          style={[
            styles.classDescNameTextStyle,
            {color: colors.SLIDE_NOTE_COLOR},
          ]}>
          {`class time - ${classDetails.startTime}`}
        </Text>
        <Text
          style={[
            styles.classDescNameTextStyle,
            {color: colors.SLIDE_NOTE_COLOR},
          ]}>
          {`Teacher - ${classDetails.teacherName}`}
        </Text>
      </View>
      <Button title={STRINGS.JOIN} wrapperStyle={styles.joinBtnViewStyle} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ClassDetails);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.WHITE},
  classNameTextStyle: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: 'bold',
    paddingTop: responsiveHeight(2),
  },
  classesListContentView: {
    flex: 1,
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(2),
  },
  imageSectionViewStyle: {
    width: '100%',
    height: responsiveHeight(30),
  },
  imageContentViewStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  classDescNameTextStyle: {
    fontSize: getResponsiveFontSize(16),
    paddingTop: responsiveHeight(1),
  },
  joinBtnViewStyle: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(45),
    backgroundColor: COLORS.BLUE_STONE,
    marginBottom: responsiveHeight(5),
    marginHorizontal: responsiveWidth(5),
  },
});

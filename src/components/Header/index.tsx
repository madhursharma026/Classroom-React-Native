import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  getResponsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  scale,
  isIphoneXorAbove,
} from '../../utils/scalingUtils';
import COLORS from '../../themes/colors';
import SVG from '../../constants/svgs';
import {SvgXml} from 'react-native-svg';

export const Header = ({
  title,
  navigation,
  isLeftView,
  isRightView,
  colors,
  isDark,
}: {
  title: string;
  navigation: any;
  isLeftView?: boolean;
  isRightView?: boolean;
  colors?: any;
  isDark?: boolean;
}) => {
  return (
    <View
      style={[
        styles.headerContainStyle,
        {
          backgroundColor: colors.HEADER_BG_COLOR,
          borderBottomColor: colors.HEADER_BOTTOM_LINE_COLOR,
        },
      ]}>
      {isLeftView ? (
        <View style={styles.headerLeftContentStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgXml
              xml={isDark ? SVG.ARROW_LEFT_WHITE_ICON : SVG.ARROW_LEFT_ICON}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.headerRightContentStyle} />
      )}
      <View style={styles.headerTitleContentStyle}>
        <Text
          style={[
            styles.headerTitleTextStyle,
            {color: colors.HEADER_TEXT_COLOR},
          ]}>
          {title}
        </Text>
      </View>

      <View style={styles.headerRightContentStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.GRAY_LIGHT,
    height: isIphoneXorAbove() ? scale(75) : scale(60),
    paddingHorizontal: responsiveWidth(2),
    paddingTop: isIphoneXorAbove() ? responsiveHeight(5) : 0,
  },
  headerLeftContentStyle: {width: '15%'},
  headerLeftIconStyle: {height: 30, width: 30},
  headerTitleContentStyle: {
    width: '70%',
    alignItems: 'center',
  },
  headerRightContentStyle: {
    width: '15%',
    height: 30,
  },
  headerTitleTextStyle: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: '400',
  },
});

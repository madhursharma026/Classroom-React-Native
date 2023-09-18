import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  getResponsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/scalingUtils';
import COLORS from '../../themes/colors';

export const TabIcon = ({
  tabBarLabel,
  focused,
  activeIcon,
  inActiveIcon,
  labelColor,
}: {
  tabBarLabel: string;
  focused: boolean;
  activeIcon: string;
  inActiveIcon: string;
  labelColor: string;
}) => {
  return (
    <View style={styles.tabContentStyle}>
      <SvgXml
        xml={focused ? activeIcon : inActiveIcon}
        height={responsiveWidth(6)}
        width={responsiveWidth(6)}
        style={styles.svgIcon}
      />
      <Text
        style={[
          styles.tabBarLabelTextStyle,
          {
            color: focused ? labelColor : COLORS.GRAY_LIGHTER,
          },
        ]}>
        {tabBarLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContentStyle: {alignItems: 'center'},
  transparentLine: {
    backgroundColor: COLORS.TRANSPARENT,
  },
  svgIcon: {
    marginBottom: responsiveHeight(0.5),
  },
  tabBarLabelTextStyle: {
    color: COLORS.GRAY_LIGHTER,
    fontSize: getResponsiveFontSize(14),
    fontWeight: '400',
  },
});

import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {
  getResponsiveFontSize,
  responsiveWidth,
  scale,
} from '../../utils/scalingUtils';
import COLORS from '../../themes/colors';

const Button = ({
  title,
  wrapperStyle,
  isBorderButton,
  onClick = () => {},
}: {
  title: string;
  wrapperStyle?: {};
  isBorderButton?: boolean;
  onClick?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.wrapperStyle,
        isBorderButton ? styles.borderButtonStyle : {},
        wrapperStyle,
      ]}>
      <Text
        style={[
          styles.buttonText,
          isBorderButton ? styles.borderButtonText : {},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    borderRadius: 8,
    marginHorizontal: responsiveWidth(5),
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(50),
    backgroundColor: COLORS.BLUE_STONE,
  },
  borderButtonStyle: {
    backgroundColor: COLORS.TRANSPARENT,
    borderColor: COLORS.BLUE_STONE,
    borderWidth: 1,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: getResponsiveFontSize(14),
    fontWeight: '500',
  },
  borderButtonText: {
    color: COLORS.BLUE_STONE,
  },
});

export default Button;

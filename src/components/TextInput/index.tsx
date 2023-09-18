import React from 'react';
import {TextInput as Input, View, StyleSheet, Text} from 'react-native';
import COLORS from '../../themes/colors';
import {
  getResponsiveFontSize,
  responsiveHeight,
  scale,
} from '../../utils/scalingUtils';

const TextInputBox = ({
  inputTitle,
  isPassword,
  wrapperStyle,
  inputWrapperStyle,
  textInputProps,
  inputStyle,
  inputTitleLabelStyle,
  rightIcon,
  colors,
  error,
  keyboardType = 'default',
  textContentType = 'none',
}: {
  inputTitle?: any;
  isPassword?: boolean;
  wrapperStyle?: {};
  inputWrapperStyle?: {};
  textInputProps: any;
  inputStyle?: {};
  inputTitleLabelStyle?: {};
  rightIcon?: any;
  colors: any;
  error?: string;
  keyboardType?: string;
  textContentType?: string;
}) => {
  return (
    <View style={[styles.containerStyle, wrapperStyle]}>
      {inputTitle ? (
        <Text
          style={[
            styles.inputTitleLabel,
            {color: colors.INPUT_FIELD_COLOR},
            inputTitleLabelStyle,
          ]}>
          {inputTitle}
        </Text>
      ) : null}
      <View style={[styles.inputWrapper, inputWrapperStyle]}>
        <Input
          style={[styles.textInput, inputStyle]}
          secureTextEntry={isPassword}
          textContentType={textContentType}
          keyboardType={keyboardType}
          returnKeyType="done"
          {...textInputProps}
        />
        {rightIcon ? rightIcon() : null}
      </View>
      {error ? <Text style={styles.errorLabel}>* {error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: responsiveHeight(2),
  },
  inputTitleLabel: {
    color: COLORS.GRAY_DARK,
    fontSize: getResponsiveFontSize(14),
  },
  inputWrapper: {
    borderRadius: 4,
    height: scale(40),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(0.5),
  },
  textInput: {
    includeFontPadding: false,
    padding: 0,
    margin: 0,
    width: '100%',
    color: COLORS.BLACK_SHADE_1,
    fontSize: getResponsiveFontSize(15),
    paddingVertical: 0,
  },
  errorLabel: {
    fontSize: getResponsiveFontSize(12),
    lineHeight: getResponsiveFontSize(14),
    includeFontPadding: false,
    color: COLORS.RED,
  },
});

export default TextInputBox;

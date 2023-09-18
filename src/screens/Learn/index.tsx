import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../components/Header';
import {STRINGS} from '../../constants/strings';
import COLORS from '../../themes/colors';
import {RootState} from '../../redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

const Learn = ({navigation, colors}: {navigation: any; colors: any}) => {
  return (
    <View style={[styles.container, {backgroundColor: colors.SCREEN_BG_COLOR}]}>
      <Header title={STRINGS.LEARN} navigation={navigation} colors={colors} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Learn);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.WHITE},
});

import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  Appearance,
  Platform,
} from 'react-native';
import {Header} from '../../components/Header';
import {STRINGS} from '../../constants/strings';
import COLORS from '../../themes/colors';
import {RootState} from '../../redux/store';
import {connect, useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {SET_THEME} from '../../redux/actions/themeActions';
import {
  getResponsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  scale,
} from '../../utils/scalingUtils';
import SVG from '../../constants/svgs';
import {SvgXml} from 'react-native-svg';
import {THEME_SETTINGS_OPTIONS} from '../../utils/commonUtils';
import {clearAll, setThemeMode} from '../../utils/storageUtils';
import {removeAuthTokenAction} from '../../redux/reducers/authReducer';

const More = ({
  navigation,
  isDark,
  themeMode,
  setTheme,
  colors,
}: {
  navigation: any;
  isDark: any;
  themeMode: any;
  setTheme: any;
  colors: any;
}) => {
  const defaultMode = THEME_SETTINGS_OPTIONS.find(
    t => t.theme === themeMode,
  )?.value;
  const [selectedThemeMode, setSelectedThemeMode] = useState(
    defaultMode || THEME_SETTINGS_OPTIONS[0]?.value,
  );
  const [showThemeOption, setShowThemeOption] = useState(false);
  const dispatch = useDispatch();

  const renderThemeSection = () => {
    return (
      <View style={styles.themeSectionViewStyle}>
        <Text
          style={[
            styles.themeTextStyle,
            {
              color: colors.INPUT_FIELD_COLOR,
            },
          ]}>
          {STRINGS.CHOOSE_THEME}
        </Text>
        <TouchableOpacity
          // onPress={() => setShowThemeOption(!showThemeOption)}
          style={[
            styles.dropdownContentViewStyle,
            {borderColor: colors.INPUT_FIELD_COLOR},
          ]}>
          <Text
            style={{
              color: colors.INPUT_FIELD_COLOR,
            }}>
            {selectedThemeMode}
          </Text>
          <SvgXml
            xml={isDark ? SVG.DOWN_ARROW_WHITE_ICON : SVG.DOWN_ARROW_ICON}
            height={20}
            width={20}
          />
        </TouchableOpacity>
        {showThemeOption ? (
          <View
            style={[
              styles.dropdownListContentViewStyle,
              {borderColor: colors.INPUT_FIELD_COLOR},
            ]}>
            {THEME_SETTINGS_OPTIONS.map((option, index) => {
              return (
                <TouchableOpacity
                  onPress={() => onChangeSelect(index, option)}
                  key={index}
                  style={[
                    styles.optionContentStyle,
                    {borderBottomColor: colors.INPUT_FIELD_COLOR},
                  ]}>
                  <Text
                    style={{
                      color: colors.INPUT_FIELD_COLOR,
                    }}>
                    {option.value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  };

  const onChangeSelect = async (key: any, value: any) => {
    try {
      setSelectedThemeMode(value.value);
      setTheme(THEME_SETTINGS_OPTIONS[key].theme);
      await setThemeMode(THEME_SETTINGS_OPTIONS[key].theme);
      if (THEME_SETTINGS_OPTIONS[key].theme === 'light') {
        StatusBar.setBarStyle('dark-content');
      } else if (THEME_SETTINGS_OPTIONS[key].theme === 'dark') {
        if (Platform.OS === 'ios') {
          StatusBar.setBarStyle('light-content');
        } else {
          StatusBar.setBarStyle('dark-content');
        }
      } else if (THEME_SETTINGS_OPTIONS[key].theme === 'system') {
        const systemColor = Appearance.getColorScheme() || 'light';
        if (systemColor === 'light') {
          StatusBar.setBarStyle('dark-content');
        } else {
          StatusBar.setBarStyle('light-content');
        }
      }

      setShowThemeOption(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderSectionMenu = () => {
    return (
      <View style={styles.sectionContentViewStyle}>
        <View>
          <TouchableOpacity style={styles.sectionItemViewStyle}>
            <Text
              style={[
                styles.sectionItemNameStyle,
                {
                  color: colors.SLIDE_TITLE_COLOR,
                },
              ]}>
              {STRINGS.STATS}
            </Text>
            <SvgXml xml={SVG.ARROW_RIGHT_ICON} height={20} width={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItemViewStyle}>
            <Text
              style={[
                styles.sectionItemNameStyle,
                {
                  color: colors.SLIDE_TITLE_COLOR,
                },
              ]}>
              {STRINGS.PROFILE}
            </Text>
            <SvgXml xml={SVG.ARROW_RIGHT_ICON} height={20} width={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowThemeOption(!showThemeOption)}
            style={styles.sectionItemViewStyle}>
            <Text
              style={[
                styles.sectionItemNameStyle,
                {
                  color: colors.SLIDE_TITLE_COLOR,
                },
              ]}>
              {STRINGS.THEME}
            </Text>
            <SvgXml xml={SVG.ARROW_RIGHT_ICON} height={20} width={20} />
          </TouchableOpacity>
          {showThemeOption ? renderThemeSection() : null}
          <TouchableOpacity style={styles.sectionItemViewStyle}>
            <Text
              style={[
                styles.sectionItemNameStyle,
                {
                  color: colors.SLIDE_TITLE_COLOR,
                },
              ]}>
              {STRINGS.CLASS_HISTORY}
            </Text>
            <SvgXml xml={SVG.ARROW_RIGHT_ICON} height={20} width={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItemViewStyle}>
            <Text
              style={[
                styles.sectionItemNameStyle,
                {
                  color: colors.SLIDE_TITLE_COLOR,
                },
              ]}>
              {STRINGS.REFERRAL}
            </Text>
            <SvgXml xml={SVG.ARROW_RIGHT_ICON} height={20} width={20} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.sectionItemViewStyle}>
            <Text
              style={[
                styles.sectionItemNameStyle,
                {
                  color: colors.SLIDE_TITLE_COLOR,
                },
              ]}>
              {STRINGS.MEMBERSHIP}
            </Text>
            <SvgXml xml={SVG.ARROW_RIGHT_ICON} height={20} width={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItemViewStyle}>
            <Text
              style={[
                styles.sectionItemNameStyle,
                {
                  color: colors.SLIDE_TITLE_COLOR,
                },
              ]}>
              {STRINGS.CONTACT_US}
            </Text>
            <SvgXml xml={SVG.ARROW_RIGHT_ICON} height={20} width={20} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={onSignOut}
            style={styles.sectionItemViewStyle}>
            <Text
              style={[
                styles.sectionItemNameStyle,
                {
                  color: colors.SLIDE_TITLE_COLOR,
                },
              ]}>
              {STRINGS.SIGN_OUT}
            </Text>
            <SvgXml xml={SVG.ARROW_RIGHT_ICON} height={20} width={20} />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={[
              styles.appVersionTextStyle,
              {
                color: colors.SLIDE_TITLE_COLOR,
              },
            ]}>
            {`${STRINGS.APP_VERSION} v0.0.1`}
          </Text>
        </View>
      </View>
    );
  };

  const onSignOut = async () => {
    await clearAll();
    dispatch(removeAuthTokenAction());
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.SCREEN_BG_COLOR}]}>
      <Header title={STRINGS.MORE} navigation={navigation} colors={colors} />
      {/* {renderThemeSection()} */}
      {renderSectionMenu()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.WHITE},
  dropdownContentViewStyle: {
    borderWidth: 1,
    height: scale(40),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(2),
  },
  dropdownListContentViewStyle: {
    borderWidth: 1,
    marginTop: responsiveHeight(1),
    borderRadius: 8,
  },
  optionContentStyle: {
    borderBottomWidth: 1,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeSectionViewStyle: {
    // marginHorizontal: responsiveWidth(10),
    marginTop: responsiveHeight(2),
  },
  themeTextStyle: {
    color: COLORS.WHITE,
    fontSize: getResponsiveFontSize(15),
    lineHeight: getResponsiveFontSize(20),
  },
  sectionItemViewStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.BLUE_STONE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: responsiveHeight(0.5),
    height: scale(40),
    alignItems: 'flex-end',
  },
  sectionItemNameStyle: {
    fontSize: getResponsiveFontSize(20),
  },
  sectionContentViewStyle: {
    flex: 0.8,
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  appVersionTextStyle: {
    fontSize: getResponsiveFontSize(14),
  },
});

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
  return {
    setTheme: (payload: string) => dispatch({type: SET_THEME, payload}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(More);

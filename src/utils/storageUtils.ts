import AsyncStorage from '@react-native-async-storage/async-storage';

export const setThemeMode = async (mode: any): Promise<void> => {
  try {
    await AsyncStorage.setItem('themeMode', mode);
  } catch (error) {
    // console.error(error);
  }
};

export const getThemeMode = async () => {
  try {
    const mode = await AsyncStorage.getItem('themeMode');
    // console.log('mode-<', mode);
    if (mode !== null) {
      return mode;
    }
  } catch (error) {
    //console.log('error');
  }
};

export const setAuthToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('AUTH_TOKEN', token);
  } catch (error) {
    console.error('setAuthToken ==> error', error);
  }
};

export const getAuthToken = async () => {
  try {
    const mode = await AsyncStorage.getItem('AUTH_TOKEN');
    if (mode !== null) {
      return mode;
    }
  } catch (error) {
    //console.log('error');
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};

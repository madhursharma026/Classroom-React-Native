import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { StatusBar, useColorScheme } from 'react-native';
import ThemeProvider from './src/contexts/ThemeContext';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  LogBox.ignoreAllLogs();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ThemeProvider />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

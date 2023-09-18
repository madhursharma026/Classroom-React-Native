import React, {useEffect} from 'react';
import {Appearance} from 'react-native';
import AppNavigator from '../navigation';
import {RootState} from '../redux/store';
import {connect, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {SET_THEME} from '../redux/actions/themeActions';
import {getThemeMode, setThemeMode} from '../utils/storageUtils';
import AuthNavigator from '../navigation/authNavigation';
import useAuthorizedSession from '../hooks/useAuthorizedSession';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {gql} from 'graphql-tag';
// import client from '../apolloClient';

const ThemeProvider = ({setTheme}: {setTheme: any}) => {
  useAuthorizedSession();
  const authToken = useSelector(state => state.authReducer?.authToken ?? '');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await getThemeMode();
        if (storedTheme === 'system') {
          setTheme('system');
        }
      } catch (error) {
        console.error('Error loading theme from async storage:', error);
      }
    };

    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      loadTheme();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await getThemeMode();
        if (storedTheme) {
          setThemeMode(storedTheme);
        } else {
          // Set a default theme if no theme is stored
          const defaultTheme = 'system';
          await setThemeMode(defaultTheme);
        }
      } catch (error) {
        console.error('Error loading theme from async storage:', error);
      }
    };

    loadTheme();
  }, []);

  const httpLink = createHttpLink({
    uri: 'http://192.168.0.103:3001/graphql',
  });
  console.log('authToken ==> ', authToken);

  const authLink = setContext((_, {headers}) => {
    // Get the authentication token from wherever you have stored it
    const token = authToken;

    // Return the headers object with the token added
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      {authToken ? <AppNavigator /> : <AuthNavigator />}
    </ApolloProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  const {themeReducer} = state;
  const {themeMode} = themeReducer;
  return {
    themeMode,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setTheme: (payload: string) => dispatch({type: SET_THEME, payload}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider);

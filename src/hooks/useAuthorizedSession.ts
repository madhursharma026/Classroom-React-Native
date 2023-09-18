import {useEffect, useState} from 'react';

import {getAuthToken} from '../utils/storageUtils';
import {setAuthTokenAction} from '../redux/reducers/authReducer';
import {store} from '../redux/store';

const useAuthorizedSession = () => {
  // get token from redux
  const authToken = store.getState().authReducer.authToken || '';

  const [isInitializing, setIsInitializing] = useState(true);
  useEffect(() => {
    const checkStoredTokenAvailability = async () => {
      const storedToken = await getAuthToken();

      if (storedToken) {
        store.dispatch(setAuthTokenAction(storedToken));
      } else {
        throw new Error('No token found');
      }
    };

    const validateSessionAndFetch = async () => {
      try {
        await checkStoredTokenAvailability();
      } catch {
      } finally {
        setIsInitializing(false);
      }
    };

    validateSessionAndFetch();
  }, []);

  return [authToken, isInitializing];
};

export default useAuthorizedSession;

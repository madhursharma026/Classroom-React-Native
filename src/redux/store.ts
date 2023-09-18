import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import {watcherSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['themeReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

let persistor = persistStore(store);

sagaMiddleware.run(watcherSaga);

export type RootState = ReturnType<typeof rootReducer>;

export {store, persistor};

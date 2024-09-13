import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import designReducer from '@/app/slices/design/designSlice';
// Import other reducers as needed

const rootReducer = combineReducers({
  design: designReducer,
  // Add other reducers here
});

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can blacklist certain reducers:
  // blacklist: ['someReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
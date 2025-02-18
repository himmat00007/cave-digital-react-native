import { configureStore, combineReducers } from "@reduxjs/toolkit";
import taskReducer from "./feature/taskSlice";
import userReducer from "./feature/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import Storage from "@react-native-async-storage/async-storage";
const persistConfig = {
  key: "user",
  storage: Storage,
};

const rootReducer = combineReducers({
  task: taskReducer,
  user: persistReducer(persistConfig, userReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

import React from "react";
import MainStackScreen from "./src/router";
import { PaperProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import Loader from "./src/component/Loader";
export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Loader />

          <MainStackScreen />
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}

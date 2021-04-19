import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

//Screens
import Header from "./Shared/Header";

//Navigators
import Main from "./Navigators/Main";

//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </Provider>
  );
}

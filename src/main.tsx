import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import store from "./redux/store";
import { defaultTheme } from "./utils/theme";

const container = document.getElementById("root") as HTMLElement;

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

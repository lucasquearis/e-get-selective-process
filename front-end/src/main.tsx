import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import App from "./App";
import store from "./redux/store";
import { defaultTheme } from "./utils/theme";
import { PersonalThemeProvider } from "./context/PesonalThemeProvider";

const container = document.getElementById("root") as HTMLElement;

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <StyledComponentsThemeProvider theme={defaultTheme}>
      <PersonalThemeProvider>
        <App />
      </PersonalThemeProvider>
    </StyledComponentsThemeProvider>
  </Provider>
);

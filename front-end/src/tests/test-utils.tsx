import "@testing-library/jest-dom";
import "jest-styled-components";
import React, { ReactElement } from "react";
import { cleanup, render, RenderOptions } from "@testing-library/react";
import { afterEach } from "vitest";
import { Provider } from "react-redux";
import store from "../redux/store";
import { defaultTheme } from "../utils/theme";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { PersonalThemeProvider } from "../context/PesonalThemeProvider";

afterEach(() => {
  cleanup();
});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <StyledComponentsThemeProvider theme={defaultTheme}>
        <PersonalThemeProvider>{children}</PersonalThemeProvider>
      </StyledComponentsThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

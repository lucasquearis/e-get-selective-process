import React, { createContext, ReactNode } from "react";
import { defaultTheme } from "../utils/theme";
import { DefaultTheme } from "styled-components";

export const themeDefaultValue = defaultTheme;

export const PersonalThemeContext =
  createContext<DefaultTheme>(themeDefaultValue);

export const PersonalThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const theme = defaultTheme;
  return (
    <PersonalThemeContext.Provider value={theme}>
      {children}
    </PersonalThemeContext.Provider>
  );
};

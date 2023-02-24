import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      background: string;
      white: string;
      error: string;
      neutral: {
        1000: string;
        600: string;
        500: string;
        400: string;
        300: string;
        200: string;
        100: string;
      };
      brand: {
        primary: string;
        secondary: string;
      };
    };
  }
}

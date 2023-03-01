import React from "react";
import { expect, test, describe } from "vitest";
import App from "../App";
import { render, fireEvent, screen } from "./test-utils";

const dataTestIds = {
  inputUserName: "test-input-username",
  inputPassword: "test-input-password",
  buttonLogin: "test-button-login",
};

const mockValues = {
  invalidUserName: "l",
  validUserName: "Teste Vitest/Jest",
  invalidPassword: "1",
  validPassword: "12345",
};

describe("Elementos do Login", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("Verifica elementos para logar", () => {
    const inputUserName = screen.getByTestId(dataTestIds.inputUserName);
    const inputPassword = screen.getByTestId(dataTestIds.inputPassword);
    const buttonLogin = screen.getByTestId(dataTestIds.buttonLogin);
    expect(inputUserName).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });

  test("Verifica logar com elementos válidos", () => {
    const inputUserName = screen.getByTestId(dataTestIds.inputUserName);
    const inputPassword = screen.getByTestId(dataTestIds.inputPassword);
    const buttonLogin = screen.getByTestId(dataTestIds.buttonLogin);
    fireEvent.change(inputUserName, {
      target: { value: mockValues.validUserName },
    });
    fireEvent.change(inputPassword, {
      target: { value: mockValues.validPassword },
    });
    fireEvent.click(buttonLogin);
  });
});

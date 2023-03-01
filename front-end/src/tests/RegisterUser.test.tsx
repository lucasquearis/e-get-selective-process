import React from "react";
import { expect, test, describe } from "vitest";
import App from "../App";
import { render, fireEvent, screen } from "./test-utils";

const dataTestIds = {
  buttonNavigateToRegister: "test-button-register",
  inputFullName: "test-full-name-input",
  inputUserName: "test-username-input",
  inputPassword: "test-password-input",
  confirmRegisterButton: "test-register-button",
  invalidRegisterMessage: "test-invalid-register-message",
};

const mockValues = {
  invalidUserName: "l",
  validUserName: "jestTest",
  invalidFullName: "l",
  validFullName: "Jest Test",
  invalidPassword: "1",
  validPassword: "12345",
};

describe("Elementos do Register", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Verifica se existe o botão para registrar", () => {
    const buttonToRedirectRegister = screen.getByTestId(
      dataTestIds.buttonNavigateToRegister
    );
    expect(buttonToRedirectRegister).toBeInTheDocument();
  });

  test("Navega até a página de registro", () => {
    const buttonToRedirectRegister = screen.getByTestId(
      dataTestIds.buttonNavigateToRegister
    );
    fireEvent(
      buttonToRedirectRegister,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(global.window.location.pathname).toEqual("/register");
  });

  test("Verifica se existem os inputs de registro", () => {
    const inputFullName = screen.getByTestId(dataTestIds.inputFullName);
    const inputUserName = screen.getByTestId(dataTestIds.inputUserName);
    const inputPassword = screen.getByTestId(dataTestIds.inputPassword);
    expect(inputFullName).toBeInTheDocument();
    expect(inputUserName).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });
});

describe("Funcionalidade de register", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Realiza registro válido", async () => {
    const inputFullName = screen.getByTestId(dataTestIds.inputFullName);
    const inputUserName = screen.getByTestId(dataTestIds.inputUserName);
    const inputPassword = screen.getByTestId(dataTestIds.inputPassword);
    const registerButton = screen.getByTestId(
      dataTestIds.confirmRegisterButton
    );
    fireEvent.change(inputFullName, {
      target: { value: mockValues.validFullName },
    });
    fireEvent.change(inputUserName, {
      target: { value: mockValues.validUserName },
    });
    fireEvent.change(inputPassword, {
      target: { value: mockValues.validPassword },
    });
    fireEvent.click(registerButton);
  });

  test("Realizaregistro com nome completo inválido", () => {
    const inputFullName = screen.getByTestId(dataTestIds.inputFullName);
    const inputUserName = screen.getByTestId(dataTestIds.inputUserName);
    const inputPassword = screen.getByTestId(dataTestIds.inputPassword);
    const registerButton = screen.getByTestId(
      dataTestIds.confirmRegisterButton
    );
    fireEvent.change(inputFullName, {
      target: { value: mockValues.invalidFullName },
    });
    fireEvent.change(inputUserName, {
      target: { value: mockValues.validUserName },
    });
    fireEvent.change(inputPassword, {
      target: { value: mockValues.validPassword },
    });
    fireEvent.click(registerButton);
    expect(
      screen.getByTestId(dataTestIds.invalidRegisterMessage)
    ).toHaveTextContent("O nome completo deve conter no mínimo 5 caracteres!");
  });

  test("Realizaregistro com nome de usuário inválido", () => {
    const inputFullName = screen.getByTestId(dataTestIds.inputFullName);
    const inputUserName = screen.getByTestId(dataTestIds.inputUserName);
    const inputPassword = screen.getByTestId(dataTestIds.inputPassword);
    const registerButton = screen.getByTestId(
      dataTestIds.confirmRegisterButton
    );
    fireEvent.change(inputFullName, {
      target: { value: mockValues.validFullName },
    });
    fireEvent.change(inputUserName, {
      target: { value: mockValues.invalidUserName },
    });
    fireEvent.change(inputPassword, {
      target: { value: mockValues.validPassword },
    });
    fireEvent.click(registerButton);
    expect(
      screen.getByTestId(dataTestIds.invalidRegisterMessage)
    ).toHaveTextContent(
      "O nome de usuário deve conter pelo menos 5 caracteres!"
    );
  });

  test("Realiza registro com senha inválida", () => {
    const inputFullName = screen.getByTestId(dataTestIds.inputFullName);
    const inputUserName = screen.getByTestId(dataTestIds.inputUserName);
    const inputPassword = screen.getByTestId(dataTestIds.inputPassword);
    const registerButton = screen.getByTestId(
      dataTestIds.confirmRegisterButton
    );
    fireEvent.change(inputFullName, {
      target: { value: mockValues.validFullName },
    });
    fireEvent.change(inputUserName, {
      target: { value: mockValues.validUserName },
    });
    fireEvent.change(inputPassword, {
      target: { value: mockValues.invalidPassword },
    });
    fireEvent.click(registerButton);
    expect(
      screen.getByTestId(dataTestIds.invalidRegisterMessage)
    ).toHaveTextContent("A senha deve conter no mínimo 5 caracteres!");
  });
});

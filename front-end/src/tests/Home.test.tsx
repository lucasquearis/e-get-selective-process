import React from "react";
import { expect, test, describe, vi } from "vitest";
import Home from "../pages/Home";
import { render } from "./test-utils";

const dataTestIds = {
  headingHome: "test-heading-home",
};

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn(),
}));

describe("Elementos home", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("Verifica elementos home", () => {
    const { getByTestId } = render(<Home />);
    const headingHome = getByTestId(dataTestIds.headingHome);
    expect(headingHome).toBeInTheDocument();
    expect(headingHome).toHaveTextContent("Bem vindo(a), !");
  });
});

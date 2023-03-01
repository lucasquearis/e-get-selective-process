import React from "react";
import { expect, test, describe, vi } from "vitest";
import DashBoard from "../pages/Home/Dashboard";
import { render } from "./test-utils";
import * as ResizeObserverModule from "resize-observer-polyfill";
(global as any).ResizeObserver = ResizeObserverModule.default;

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn(),
}));

describe("Elementos home", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Verifica elementos Dashbaord", () => {
    const { getByTestId } = render(<DashBoard />);
    const loadingComponent = getByTestId("test-loading-svg");
    expect(loadingComponent).toBeInTheDocument();
  });
});

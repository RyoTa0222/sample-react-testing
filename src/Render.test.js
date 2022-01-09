import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render";

describe("Rendering", () => {
  it("should render all the elements correctly", () => {
    render(<Render />);
    // https://github.com/A11yance/aria-query#elements-to-roles
    // screen.debug(screen.getByRole("heading"));
    // https://jestjs.io/docs/expect
    // タグから要素を指定してテストする場合
    expect(screen.getByRole("heading")).toBeTruthy();
    // 複数あるボタンから要素を指定してテストする場合
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    // 複数あるボタンから要素を指定してテストする場合
    expect(screen.getAllByRole("button")[1]).toBeTruthy();
    // テキストから要素を指定してテストする場合
    expect(screen.getByText("Udemy")).toBeTruthy();
    // 文字が該当しないことをテストする場合
    expect(screen.queryByText("Udeny")).toBeNull();
    // testIDから要素を指定してテストする場合
    expect(screen.getByTestId("copyright")).toBeTruthy();
  });
});

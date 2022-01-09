import React from "react";
import { screen, cleanup, render } from "@testing-library/react";
import FrameworkList from "./FrameworkList";

afterEach(() => cleanup());

describe("Rendering the list with props", () => {
  it("Should render No data! when no data propped", () => {
    render(<FrameworkList />);
    // DOMに存在するかどうか
    expect(screen.getByText("No data!")).toBeInTheDocument();
  });
  it("Should render list item correctly", () => {
    const dummyData = [
      { id: 1, item: "React" },
      { id: 2, item: "Angular" },
      { id: 3, item: "Vue" },
    ];
    render(<FrameworkList frameworks={dummyData} />);
    const frameworksItems = screen
      .getAllByRole("listitem")
      .map((ele) => ele.textContent);
    const dummyItems = dummyData.map((ele) => ele.item);
    expect(frameworksItems).toEqual(dummyItems);
  });
});

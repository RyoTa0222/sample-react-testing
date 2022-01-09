import React from "react";
import { render, screen } from "@testing-library/react";
import UseEffectRender from "./UseEffectRender";

describe("useEffect rendering", () => {
  it("Should render only after async function rsolved", async () => {
    render(<UseEffectRender />);
    expect(screen.queryByText(/I am/)).toBeNull();
    // 非同期が完了するまでまつ
    // デフォルトで4秒待つがそれ以上はタイムアウトエラーとなる
    // 非同期処理によって表示される要素の検索にはfindByを使う
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});

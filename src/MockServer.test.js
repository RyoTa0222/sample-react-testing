import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";
import MockServer from "./MockServer";

// mock server 作成
const server = setupServer(
  // req: requestにqueryを追加できる
  // res: response
  // ctx: context
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);

// テスト開始前にモックサーバー起動
beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// サーバーを閉じる
afterAll(() => server.close());

describe("Mocking API", () => {
  it("[Fetch Success]Should display fetched data correctly and button disable", async () => {
    render(<MockServer />);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/Bred dummy/)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });
  it("[Fetch Failure]Should display error msg, no render heading and button abled", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Fetching Failed!"
    );
    // 存在しない要素のアサーションを行うためには、getByをqueryByに置換する
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });
});

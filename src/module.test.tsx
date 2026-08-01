import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { createMessagesModule } from "./module";

describe("createMessagesModule", () => {
  it("exports the messages route through the shared contract", () => {
    const module = createMessagesModule("/api");

    expect(module.id).toBe("messages");
    expect(module.routes.map(({ path }) => path)).toEqual(["/"]);

    render(createElement(module.routes[0].component));
    expect(
      screen.getByRole("heading", { name: "Hello World" }),
    ).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Swal from "sweetalert2";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { HelloWorldPage } from "./HelloWorldPage";
import type { MessageApi } from "./api";

vi.mock("sweetalert2", () => ({
  default: { fire: vi.fn().mockResolvedValue({}) },
}));

describe("HelloWorldPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("persists normalized text before showing success", async () => {
    const api: MessageApi = {
      create: vi.fn().mockResolvedValue({
        id: "1",
        text: "Hello",
        createdAt: "2026-08-01T00:00:00Z",
      }),
    };
    const user = userEvent.setup();
    render(<HelloWorldPage api={api} />);

    await user.type(screen.getByLabelText("Text"), "  Hello  ");
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(api.create).toHaveBeenCalledWith("Hello");
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ text: "Text successfully saved." }),
    );
  });

  it("rejects blank input in the browser", async () => {
    const api: MessageApi = { create: vi.fn() };
    const user = userEvent.setup();
    render(<HelloWorldPage api={api} />);

    await user.type(screen.getByLabelText("Text"), "   ");
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(api.create).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter some text before saving.",
    );
  });
});

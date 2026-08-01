import { afterEach, describe, expect, it, vi } from "vitest";

import { createMessageApi } from "./api";

describe("createMessageApi", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts a message and returns the response", async () => {
    const message = {
      id: "1",
      text: "Hello",
      createdAt: "2026-08-01T00:00:00Z",
    };
    const fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(message),
    });
    vi.stubGlobal("fetch", fetch);

    await expect(createMessageApi("/api").create("Hello")).resolves.toEqual(
      message,
    );
    expect(fetch).toHaveBeenCalledWith(
      "/api/v1/messages",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("raises a stable error for unsuccessful responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    await expect(createMessageApi().create("Hello")).rejects.toThrow(
      "The text could not be saved. Please try again.",
    );
  });
});

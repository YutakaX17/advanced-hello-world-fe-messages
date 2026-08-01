import { type FormEvent, useState } from "react";
import Swal from "sweetalert2";

import type { MessageApi } from "./api";

export interface HelloWorldPageProps {
  api: MessageApi;
}

export function HelloWorldPage({ api }: HelloWorldPageProps) {
  const [text, setText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = text.trim();
    if (!normalized) {
      setError("Enter some text before saving.");
      return;
    }

    setError("");
    setIsSaving(true);
    try {
      await api.create(normalized);
      setText("");
      await Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Text successfully saved.",
        confirmButtonColor: "#2563eb",
      });
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "The text could not be saved.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <h1>Hello World</h1>
      <section className="ahw-card" aria-labelledby="message-form-title">
        <h2 id="message-form-title">Save a message</h2>
        <form className="ahw-form" onSubmit={submit}>
          <label className="ahw-label" htmlFor="message-text">
            Text
          </label>
          <div className="ahw-row">
            <input
              id="message-text"
              name="text"
              value={text}
              maxLength={500}
              placeholder="Enter some text"
              onChange={(event) => setText(event.target.value)}
              disabled={isSaving}
            />
            <button type="submit" disabled={isSaving}>
              {isSaving ? "Saving…" : "Save"}
            </button>
          </div>
          {error ? (
            <p className="ahw-error" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </section>
    </>
  );
}

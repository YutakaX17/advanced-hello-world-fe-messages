export interface Message {
  id: string;
  text: string;
  createdAt: string;
}

export interface MessageApi {
  create(text: string): Promise<Message>;
}

export function createMessageApi(baseUrl = "/api"): MessageApi {
  return {
    async create(text: string): Promise<Message> {
      const response = await fetch(`${baseUrl}/v1/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("The text could not be saved. Please try again.");
      }

      return (await response.json()) as Message;
    },
  };
}

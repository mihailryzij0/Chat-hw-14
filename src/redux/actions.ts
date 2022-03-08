import { Message, MessageData } from "../messagesApi";

export const identification = (payload: string) => ({
  type: "IDENTIFICATION",
  payload,
});

export const loading = () => ({
  type: "LOADING",
});
export const success = (payload: Message[]) => ({
  type: "SUCCESS",
  payload,
});
export const sending = (newMessage: MessageData) => ({
  type: "SENDING",
  newMessage,
});
export const errors = (error: Error) => ({
  type: "ERROR",
  error,
});

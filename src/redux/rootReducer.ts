import { getMessagesList, Message } from "../messagesApi";
import { identification } from "./actions";
import { store } from "./createStore";

export type State = {
  messages: Message[] | undefined;
  error: Error | undefined;
  name: string | undefined;
  status: string | undefined;
};

export const initialState: State = {
  messages: undefined,
  error: undefined,
  name: undefined,
  status: "IDENTIFICATION",
};

export function rootReducer(state = initialState, action: Record<any, any>) {
  switch (action.type) {
    case "IDENTIFICATION":
      return { ...state, name: action.payload, status: "INIT-CHAT" };
    case "LOADING":
      return { ...state, status: "LOADING" };
    case "SENDING":
      const newMessages = state.messages;
      newMessages?.unshift(action.newMessage);
      return {
        ...state,
        status: "SENDING",
      };
    case "SUCCESS":
      return { ...state, messages: action.payload, status: "SUCCESS" };
    case "ERROR":
      return { ...state, arror: action.error };
    default:
      return state;
  }
}

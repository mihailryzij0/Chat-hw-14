// import { createMessageList } from "./createMessageList";
import { CreateApp } from "./createApp";
import "./index.scss";
import {
  getMessagesList,
  sendMessage,
  observeWithEventSource,
} from "./messagesApi";
import { store } from "./redux/createStore";

new CreateApp(document.querySelector("body") as HTMLElement);

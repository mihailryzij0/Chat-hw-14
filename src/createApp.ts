import { identificationUser } from "./identificationUser";
import {
  getMessagesList,
  Message,
  observeWithEventSource,
  sendMessage,
} from "./messagesApi";
import { loading, success, error, sending } from "./redux/actions";
import { store } from "./redux/createStore";
import { sendMessag } from "./sendMessage";
import { showMessages } from "./showMessages";

export class CreateApp {
  messageBox: HTMLElement;
  identifBox: HTMLElement;
  messageForm: HTMLFormElement;
  constructor(private el: HTMLElement) {
    this.messageBox = el.querySelector(".chat-top") as HTMLElement;
    this.identifBox = el.querySelector(".chat") as HTMLElement;
    this.messageForm = el.querySelector(".chat-form") as HTMLFormElement;

    store.subscribe(async () => {
      this.render();
    });

    store.dispatch({ type: "lxclc" });
  }
  async showStatus(status: string) {
    const chatStatus = this.el.querySelector(".chat-status") as HTMLElement;
    chatStatus.innerHTML = `${status}`;
  }
  async render() {
    const state = store.getState();
    switch (state.status) {
      case "IDENTIFICATION":
        await this.showStatus("IDENTIFICATION");
        identificationUser(this.identifBox);
        break;
      case "INIT-CHAT":
        this.initChat();
        break;
      case "LOADING":
        await this.showStatus("LOADING");
        break;
      case "SUCCESS":
        await this.showStatus("SUCCESS");
        showMessages();
        break;
      case "SENDING":
        showMessages();
        break;
      case "ERROR":
        await this.showStatus(`ERROR:${state.error}`);
        break;
      default:
        return;
    }
  }

  initChat() {
    store.dispatch(loading());
    getMessagesList()
      .then((response: Message[]) => {
        store.dispatch(success(response.reverse().splice(0, 30)));
      })
      .catch((error) => {
        store.dispatch(error(error));
      });

    observeWithEventSource((messages: Message[]) => {
      store.dispatch(success(messages.reverse().splice(0, 30)));
    });
    sendMessag();
  }
}

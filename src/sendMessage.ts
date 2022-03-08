import { sendMessage } from "./messagesApi";
import { sending } from "./redux/actions";
import { store } from "./redux/createStore";
export function sendMessag() {
  const select = document.querySelector(
    ".chat-form__select"
  ) as HTMLSelectElement;
  const button = document.querySelector(
    ".chat-form__button"
  ) as HTMLButtonElement;
  const input = document.querySelector(
    ".chat-form__message"
  ) as HTMLInputElement;

  select.addEventListener("change", () => {
    const indexOption = select.options.selectedIndex;
    const emoji = select.options[indexOption].text;
    input.value = `${input.value} ${emoji}`;
  });
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const mesaag = {
      message: input.value,
      name: store.getState().name as string,
      date: new Date(),
    };
    sendMessage(mesaag);
    store.dispatch(sending(mesaag));
    input.value = "";
  });
}

import { CreateApp } from "./createApp";
import { store } from "./redux/createStore";
describe("CreateApp", () => {
  let el: HTMLElement;
  let buttonIdentification: HTMLButtonElement;
  let inputIdentification: HTMLInputElement;
  beforeAll(() => {
    el = document.createElement("div");
    el.innerHTML = `
    <div class="chat">
    <div class="chat-status"></div>
    <div class="chat-top"></div>
    <div class="chat-bottom">
      <form action="" class="chat-form">
        <textarea class="chat-form__message"></textarea>
        <button class="chat-form__button">Отправить</button>
        <select class="chat-form__select">
          <option value="">&#128512;</option>
        </select>
      </form>
    </div>
  </div>`;
    new CreateApp(el);
    document.body.append(el);
  });
  afterAll(() => {
    el?.remove();
  });

  it("Identification", () => {
    buttonIdentification = document.querySelector(
      ".identification-box__button"
    ) as HTMLButtonElement;
    inputIdentification = document.querySelector(
      ".identification-box__input"
    ) as HTMLInputElement;

    inputIdentification.value = "mihailO";
    buttonIdentification.dispatchEvent(new Event("click"));
    const state = store.getState();
    expect(state.name).toBe("mihailO");
  });
  it("create list messages", () => {
    setTimeout(() => {
      let messages = document.querySelectorAll(".message-box");
      expect(messages.length).toBe(30);
    }, 600);
  });

  it("sending messages", () => {
    const select = document.querySelector(
      ".chat-form__select"
    ) as HTMLSelectElement;
    const button = document.querySelector(
      ".chat-form__button"
    ) as HTMLButtonElement;
    const input = document.querySelector(
      ".chat-form__message"
    ) as HTMLInputElement;
    input.value = "testText";
    select.options[0].dispatchEvent(new Event("change"));
    button.dispatchEvent(new Event("click"));
    setTimeout(() => {
      const state = store.getState();
      // @ts-ignore
      const newMessag = state.messages[31];
      expect(newMessag.name).toBe("mihailO");
      expect(newMessag.message).toBe("testText &#128512;");
      const lastMessage = document.querySelectorAll(".message-box__messag");
      expect(lastMessage[31].textContent).toBe("testText &#128512;");
    }, 600);
  });
});

import { Message } from "./messagesApi";
import { success } from "./redux/actions";
import { store } from "./redux/createStore";
import { showMessages } from "./showMessages";

describe("showMessages", () => {
  let el: HTMLElement;
  let messages: Message[];
  beforeAll(() => {
    el = document.createElement("div");
    el.innerHTML = '<div class="chat-top"></div>';
    document.body.append(el);
    messages = [
      {
        name: "abc",
        message: "abc",
        date: "123",
      },
      {
        name: "abcd",
        message: "abcd",
        date: "1234",
      },
    ];
  });
  afterAll(() => {
    el?.remove();
  });

  it("rendering messages", () => {
    store.dispatch(success(messages));
    showMessages();
    const messageBox = el.querySelectorAll(
      ".message-box"
    ) as unknown as HTMLAllCollection;
    const messageName = el.querySelector(
      ".message-box__name"
    ) as unknown as HTMLElement;
    expect(messageBox.length).toBe(2);
    expect(messageName.textContent).toBe("name: abcd");
  });
});

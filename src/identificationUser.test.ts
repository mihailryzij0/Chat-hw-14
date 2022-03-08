import { identificationUser } from "./identificationUser";
import { store } from "./redux/createStore";

describe("identificationUser", () => {
  let el: HTMLElement;
  beforeAll(() => {
    el = document.createElement("div");
    document.body.append(el);
  });
  afterAll(() => {
    el?.remove();
  });
  it("creating markup", () => {
    identificationUser(el);
    const indifBox = el.querySelector(
      ".identification-box"
    ) as HTMLInputElement;
    const input = el.querySelector(
      ".identification-box__input"
    ) as HTMLInputElement;
    const button = el.querySelector(
      ".identification-box__button"
    ) as HTMLButtonElement;

    expect(indifBox).toBeTruthy();
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });
  it("adding display none when clicking on the button ", () => {
    identificationUser(el);
    const input = el.querySelector(
      ".identification-box__input"
    ) as HTMLInputElement;
    const button = el.querySelector(
      ".identification-box__button"
    ) as HTMLButtonElement;
    input.value = "name";
    button.dispatchEvent(new Event("click"));
    const state = store.getState();
    const indifBox = el.querySelector(
      ".identification-box"
    ) as HTMLInputElement;
    expect(indifBox.style.display).toBe("none");
    expect(state.name).toBe("name");
  });
});

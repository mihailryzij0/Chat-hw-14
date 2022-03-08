import { identification } from "./redux/actions";
import { store } from "./redux/createStore";
export function identificationUser(parentEl: HTMLElement) {
  parentEl.innerHTML += `<div class="identification-box">
   <label class="identification-box__label" for="">Ваше имя</label>
   <input class="identification-box__input" type="text">
   <button class="identification-box__button" > Ввод </button>
 </div> `;
  const indifBox = document.querySelector(
    ".identification-box"
  ) as HTMLInputElement;
  const input = document.querySelector(
    ".identification-box__input"
  ) as HTMLInputElement;
  const button = document.querySelector(
    ".identification-box__button"
  ) as HTMLButtonElement;

  button.addEventListener("click", () => {
    store.dispatch(identification(input.value));
    indifBox.style.display = "none";
  });
}

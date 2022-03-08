import { store } from "./redux/createStore";
export async function showMessages() {
  const messageBox = document.querySelector(".chat-top") as HTMLElement;

  while (messageBox.firstChild) {
    messageBox.removeChild(messageBox.firstChild);
  }
  const messages = store.getState().messages || [];
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].message && messages[i].name && messages[i].date) {
      messageBox.innerHTML += `
    <div class="message-box">
    <p class="message-box__name">name: ${messages[i].name}</p>
    <p class="message-box__messag">${messages[i].message}</p>
    <span class="message-box__date" >${messages[i].date.toLocaleString()}</span>
  </div>
    `;
    }
  }
  messageBox.scrollTop = messageBox.scrollHeight;
}

export interface Message {
  name: string;
  nickname?: string;
  message: string;
  date: string;
}

export interface MessageData {
  name: string;
  message: string;
  date: Date;
}

const config = {
  firebaseBaseUrl: "https://otus-js-chat-4ed79-default-rtdb.firebaseio.com",
  firebaseCollection: "messages.json",
};

// /**
//  * @return {Message[]} messagesList
//  */
export async function getMessagesList() {
  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data: Message[]) =>
      Object.values(data).map((el) => ({
        ...el,
        date: new Date(el.date).toLocaleString("ru"),
      }))
    );
}

// /**
//  * @param {Message} data
//  * @param {string} data.name
//  * @param {string} data.message
//  * @returns {boolean}
//  */
export async function sendMessage(data: MessageData) {
  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export function observeWithEventSource(cb: Function) {
  const evtSource = new EventSource(
    `${config.firebaseBaseUrl}/${config.firebaseCollection}`
  );
  evtSource.addEventListener("put", (ev) =>
    cb(Object.values(JSON.parse(ev.data).data))
  );
}

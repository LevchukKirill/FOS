import { io } from "socket.io-client";

export class APIGateway {
  baseURL = process.env.EXPO_PUBLIC_API_URL;
  namespace = "";
  path = "";

  /**
   * Сервис для взаимодействия с веб сокетами
   * @param options {{ baseURL?: string, namespace?: string, path?: string }}
   */
  constructor(options = {}) {
    this.baseURL = options.baseURL || this.baseURL;
    this.namespace = options.namespace || this.namespace;
    this.path = options.path || this.path;
    let url = this.baseURL;
    if (this.namespace) url += this.namespace;
    if (this.path) url += `/${this.path}`;

    this.socket = io(url, {
      transports: ["websocket"],
      timeout: 60000,
      reconnectionDelayMax: 60000,
      withCredentials: true,
    });

    // console.log(this.socket);
  }

  destroy() {
    this.socket.disconnect();
    this.socket.close();
  }

  subscribe(topic, handler = Function) {
    this.socket.on(topic, handler);
  }
}

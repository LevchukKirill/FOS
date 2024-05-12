// import { Message } from "../../js/chat/Message";
import { APIGateway } from "./ApiGateway";

export class OrderGateway extends APIGateway {
  /**
   * Сервис для взаимодействия с веб сокетами
   * @param options {{ baseURL?: string, namespace?: string, path?: string }}
   */
  constructor() {
    super({ namespace: "order" });
  }

  /**
   * @param room {string}
   * @param cb {(roomMessages: Message[]) => {}} }
   */
  joinRoom(room, cb) {
    this.socket.emit("joinRoom", room, cb);
  }

  /**
   * @param room {string}
   */
  leaveRoom(room) {
    this.socket.emit("leaveRoom", room);
  }

  /**
   * @param message {Message[]}
   */
  // async sendMessage(message) {
  //   this.socket.emit("sendMessage", await Message.toDto(message));
  // }

  /**
   * @param handler {(data: Message[])}
   * @param callback {(isSuccess: boolean)}
   */
  receiveMessage(handler = Function) {
    this.socket.on("receiveMessage", handler);
  }
}

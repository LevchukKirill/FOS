import { ApiService } from "./ApiService";

class OrderService extends ApiService {
  constructor() {
    super({ namespace: "order" });
  }
  getAllOrder() {
    console.log(this.axios.defaults.baseURL);
    return this.axios
      .get("")
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }
  createOrder(data) {
    return this.axios
      .post("", { data })
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
  updateOrder(id, data) {
    return this.axios
      .patch(`${id}`, { data })
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
  deleteOrder(id) {
    return this.axios
      .delete(`${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
}
export default OrderService;

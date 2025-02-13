import { ApiService } from "./ApiService";

class OrderFoodService extends ApiService {
  constructor() {
    super({ namespace: "orderfood" });
  }
  getAllOrderFood() {
    console.log(this.axios.defaults.baseURL);
    return this.axios
      .get("")
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }

  getAllFoodsByOrderId(orderId) {
    return this.axios
      .get(`/order/${orderId}`)
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }

  createOrderFood({ foodId, orderId }) {
    return this.axios
      .post("", { id })
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
  updateOrderFood(id, data) {
    return this.axios
      .patch(`${id}`, { data })
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
  deleteOrderFood(id) {
    return this.axios
      .delete(`${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
}
export default OrderFoodService;

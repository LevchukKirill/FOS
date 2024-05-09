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

  getAllOrderById(type, id) {
    // console.log(this.axios.defaults.baseURL);
    return (
      this.axios
        //type = user || restaurant
        .get(`${type}/${id}`)
        .then((response) => {
          return response.data;
        })
        .catch(console.error)
    );
  }

  createOrder(basket) {
    return this.axios
      .post("", { ...basket }, { withCredentials: true })
      .then((response) => response.data)
      .catch(console.error);
  }
  updateOrder(id, data) {
    return this.axios
      .put(`${id}`, data)
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

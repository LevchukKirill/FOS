import { ApiService } from "./ApiService";

class OrderService extends ApiService {
  constructor() {
    super({ namespace: "order" });
  }
  getAllOrder(id) {
    console.log(this.axios.defaults.baseURL);
    return this.axios
      .get(`${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }

  getOneOrder(id) {
    // console.log(this.axios.defaults.baseURL);
    return this.axios
      .get(`${id}`)
      .then((response) => {
        return response.data.food;
        // return console.log(response.data.food);
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

  getCurrentOrderById(id) {
    return this.axios
      .get(`user/current/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }

  getAllOrderForCourier(id) {
    return this.axios
      .get(`restaurant/fc/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }

  createOrder(basket) {
    return this.axios
      .post("", { ...basket }, { withCredentials: true })
      .then((response) => response.data)
      .catch(console.error);
  }
  updateOrder(id, data) {
    return this.axios
      .patch(`${id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }

  pay(id, status) {
    return this.axios.post("/paymentCallback", { orderId: id, paid: status });
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

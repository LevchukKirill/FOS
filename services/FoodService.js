import { ApiService } from "./ApiService";

class FoodService extends ApiService {
  constructor() {
    super({ namespace: "food" });
  }
  getAllFood(typeId, restaurantId) {
    console.log(this.axios.defaults.baseURL, typeId, restaurantId);
    return this.axios
      .get("", { params: { typeId, restaurantId } })
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }
  getFoodByType(typeId) {
    return this.axios
      .get(`type/${typeId}`)
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }

  createFood(data) {
    return this.axios
      .post("", { data })
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
  updateFood(id, data) {
    return this.axios
      .patch(`${id}`, { data })
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
  deleteFood(id) {
    return this.axios
      .delete(`${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
}
export default FoodService;

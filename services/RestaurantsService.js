import axios from "axios";
import { ApiService } from "./ApiService";

class RestaurantsService extends ApiService {
  constructor() {
    super({ namespace: "restaurant" });
  }
  getAllRestaurants() {
    console.log(this.axios.defaults.baseURL);
    return this.axios
      .get("")
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }
  createRestaurant(data) {
    return this.axios
      .post("", { data })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
export default RestaurantsService;

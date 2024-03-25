import axios from "axios";
class RestaurantsService {
  getAllRestaurants() {
    return axios
      .get("https://localhost/5000/api/restaurants")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  createRestaurant(data) {
    return axios
      .post("https://localhost/5000/api/restaurants", { data })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
export const restaurantService = new RestaurantsService();

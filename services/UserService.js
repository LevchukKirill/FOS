import { ApiService } from "./ApiService";

class UserService extends ApiService {
  constructor() {
    super({ namespace: "user" });
  }
  getAllUser() {
    console.log(this.axios.defaults.baseURL);
    return this.axios
      .get("")
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }

  getOneUser(id) {
    console.log(this.axios.defaults.baseURL);
    return this.axios
      .get(`${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }

  createUser(data) {
    return this.axios
      .post("", { data })
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
  updateUser(id, data) {
    return this.axios
      .patch(`${id}`, { data })
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
  deleteUser(id) {
    return this.axios
      .delete(`${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
}
export default UserService;

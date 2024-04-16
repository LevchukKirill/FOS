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

  authUser({ phone, password }) {
    return (
      this.axios
        .post("/login", { phone, password })
        .then((response) => response.data.token)
        //TODO: вывод ошибки
        .catch(console.error)
    );
  }
  createUser({ phone, password }) {
    return this.axios
      .post("/registration", { phone, password })
      .then((response) => response.data.token)
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

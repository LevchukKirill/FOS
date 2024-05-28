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

  auth() {
    return this.axios
      .get("/get-user")
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }

  login({ phone, password }) {
    return this.axios
      .post("/login", { phone, password })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.status);
      });
  }
  register({ phone, password }) {
    return this.axios
      .post("/registration", { phone, password })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.status);
      });
  }
  logout() {
    return this.axios.get("/logout").catch(console.error);
  }

  updateUser(id, data) {
    const { name, phone, role } = data;
    return this.axios
      .put(`${id}`, { name, phone, role })
      .then((response) => response)
      .catch((error) => {
        throw new Error(error.status);
      });
  }

  updateUserLocation(location) {
    return this.axios
      .post("/location", { location }, { withCredentials: true })
      .then((response) => console.log(response.data))
      .catch((error) => {
        throw new Error(error.status);
      });
  }

  deleteUser(id) {
    return this.axios
      .delete(`${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }

  getBarcode() {
    console.log(this.axios.defaults.baseURL);
    return this.axios
      .get(`/barcode/`, { responseType: "text" })
      .then((response) => response.data)
      .catch(console.error)
      .finally(() => console.log("Barcode generated"));
  }

  getBarcodeURL() {
    return this.axios.defaults.baseURL + "/barcode/";
  }
}
export default UserService;

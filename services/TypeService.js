import { ApiService } from "./ApiService";

class TypeService extends ApiService {
  constructor() {
    super({ namespace: "type" });
  }
  getAllTypes() {
    console.log(this.axios.defaults.baseURL);
    return this.axios
      .get("")
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }
  createType(data) {
    return this.axios
      .post("", { data })
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
  updateType(id, data) {
    return this.axios
      .patch(`${id}`, { data })
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
  deleteType(id) {
    return this.axios
      .delete(`${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  }
}
export default TypeService;

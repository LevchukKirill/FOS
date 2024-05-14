import axios from "axios";

export class ApiService {
  constructor(options) {
    this.axios = axios.create({
      withCredentials: true,
      baseURL: `${process.env.EXPO_PUBLIC_API_URL}${options.namespace}/`,
    });
  }
}

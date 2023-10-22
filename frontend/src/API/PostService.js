import axios from "axios";

export default class PostService {
  static async getAll(limit = 8, page = 1, filter = "", status = "" ) {
    const response = await axios.get(`http://localhost:3001/api/transports`, {
      params: {
        page,
        limit,
        filter,
        status
      }
    });

    return response;
  }

  static async getOne(id) {
    const response = await axios.get(`http://localhost:3001/api/transport/${id}`);
    return response;
  }

  static async getCategories() {
    const response = await axios.get(`http://localhost:3001/api/categories`);
    return response;
  }

  static async getColors() {
    const response = await axios.get(`http://localhost:3001/api/colors`);
    return response;
  }

  static async createTransport(transport) {
    const { data } = await axios.post("http://localhost:3001/api/transport", transport);
    return data;
  }
}
import axios from "axios";

export default class PostService {
  static async getAll(limit = 8, page = 1) {
    const response = await axios.get(`http://localhost:3001/api/transports`, {
      params: {
        page: page,
        limit: limit
      }
    });

    return response;
  }
}
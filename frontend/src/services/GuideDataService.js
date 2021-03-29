import http from "../http-common";

class GuideDataService {
  getAll() {
    return http.get("/guides");
  }

  get(id) {
    return http.get(`/guides/${id}`);
  }

  create(data) {
    return http.post("/guides", data);
  }

  update(id, data) {
    return http.put(`/guides/${id}`, data);
  }

  delete(id) {
    return http.delete(`/guides/${id}`);
  }

  deleteAll() {
    return http.delete(`/guides`);
  }

  findByTitle(title) {
    return http.get(`/guides?title=${title}`);
  }
}

export default new GuideDataService();

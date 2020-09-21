import http from "@/http-common";

class calendarService {
  getAll() {
    return http.get("/calendar");
  }

  create(data) {
    return http.post("/calendar", data);
  }
}

export default new calendarService();

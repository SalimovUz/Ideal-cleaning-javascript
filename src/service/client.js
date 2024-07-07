import http from "./config";

const client = {
  create: (data) => http.post("/client", data),
  get: (params) => http.get("/client/all", { params }),
  delete: (params) => http.delete("/client", { params }),
  update: (data) => http.put("/client", data),
};

export default client;

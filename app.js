// HTTP module - Server create
import http from "http";

// Request - User sends/requests to Server
// Response - Server sends to User
const app = http.createServer(function (request, response) {
  response.end("Response from server");
});

app.listen(5000, () => {
  console.log("Server running at port 5000...");
});

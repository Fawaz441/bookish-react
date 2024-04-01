// import jsonServer from "json-server";
var jsonServer = require("json-server/lib/server");
const server = jsonServer.create();
const router = jsonServer.router("stub-server/db.json");
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
  if (req.method === "DELETE" && req.query["_cleanup"]) {
    const db = router.db;
    db.set("books", []).write();
    res.sendStatus(204);
  } else {
    next();
  }
});

server.use(middlewares);
server.use(router);
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

server.listen(8080, () => {
  console.log("JSON server is running");
});

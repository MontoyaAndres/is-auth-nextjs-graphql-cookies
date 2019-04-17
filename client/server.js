const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();
const server = express();

app
  .prepare()
  .then(() => {
    server
      .use(cookieParser())
      .get("*", (req, res) => handler(req, res))
      .listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectToDB = require("../database/config.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.paths = {
      movies: "/api/movies",
      catalog: "/api/catalog",
      // to do
      //   users: "/api/users",
      //   comments: "/api/comments",
    };

    // Connect to db
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Initialize the router of the app
    this.routes();
  }

  routes() {
    this.app.use(this.paths.movies, require("../routes/movies.js"));
    this.app.use(this.paths.catalog, require("../routes/catalog.js"));

    if (process.env.NODE_ENV === "production") {
      this._app.use(
        express.static(path.join(path.join(path.resolve(), "/client/build")))
      );

      this._app.get("*", (req, res) => {
        res.sendFile(
          path.resolve(path.resolve(), "client", "build", "index.html")
        );
      });
    }
  }

  async connectDB() {
    await connectToDB();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Parseo y lectura del body
    this.app.use(express.json());

    // public directory
    this.app.use(express.static("public"));

    this.app.use(morgan("combined"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("App listening on port", this.port);
    });
  }
}

module.exports = Server;

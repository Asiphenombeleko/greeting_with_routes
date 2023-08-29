import express from "express";
import { engine } from "express-handlebars";
import greet from "./greet.js";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import DBJS from "./database.js"; //import my database logic

import counterRoute from "./routes/counter.route.js"; //import the routes
import greetedRoute from "./routes/greeted.route.js";
import indexRoute from "./routes/index.route.js";

const app = express();
//create an instance for my database function
const greetingDataBase = greet(DBJS);

let index_route = indexRoute(greetingDataBase);
let greeted_route = greetedRoute(greetingDataBase);
let counter_route = counterRoute(greetingDataBase);

app.engine(
  "handlebars",
  engine({
    layoutsDir: "./views/layouts",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "Asiphe's",
  })
);
// session middleware
app.use(flash());
// let index = greet();

app.get("/");

app.get("/", index_route.index);

app.post("/greeting", index_route.greetMessage);

app.get("/greeted", greeted_route.greeted);

app.get("/counter/:name", counter_route.countersRoute);

app.post("/reset", index_route.reset);

 app.post('/errorHandling', index_route.index)

const PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});

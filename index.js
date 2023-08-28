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

//create an instance for my greet function
let greetInstance = greet();

let index_route = indexRoute(greetingDataBase, greetInstance);
let greeted_route = greetedRoute(greetInstance);
let counter_route = counterRoute(greetInstance);

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
let index = greet();

app.get("/", index_route.makeGreeting);
app.get("/", index_route.reset);
app.post("/greeting", index_route.makeGreeting);
app.get("/counter/:name", counter_route.countersRoute);
app.get("/greeted", greeted_route.greeted);

app.post("/reset", index_route.reset);
app.post('/errorHandling',  index_route.makeGreeting )

const PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});

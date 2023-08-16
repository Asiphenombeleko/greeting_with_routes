import express from 'express'
import { engine } from 'express-handlebars'
import greet from './greet.js'
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';

const app = express();
const greeting = greet()

app.engine('handlebars', engine({
    layoutsDir: "./views/layouts"
}));
app.set('view engine', 'handlebars');
app.set('views', './views')
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "Asiphe's"

})); // session middleware
app.use(flash())

app.get('/', function (req, res) {
    let errorMesg = req.flash("error")[0];
    let greetMesg = req.flash("info")[0]
    let showGreet = !errorMesg;
    res.render('index', {
        counting: greeting.getNumberOfNames(),
        makeGreet: showGreet ? greetMesg : "",
        errorHandling: errorMesg

    });
});
app.post('/greeting', function (req, res) {
    var greetingMesg = greeting.makeGreet(req.body.name, req.body.language)
    let greetMe = greeting.getNames()
    // console.log(greeting.getNameCounter())
    req.flash('info', greetMe);

    let counting = greeting.getNumberOfNames()
    const errors = greeting.errorHandling(req.body.name, req.body.language)
    req.flash('error', errors);
    res.redirect("/")
})

app.get('/counter/:username', function (req, res) {
    res.render('counter', {
        count: greeting.userCount(req.params.username),
        user: req.params.username
    })
})
app.get('/greeted', function (req, res) {
    res.render('greeted', {
        listOfNames: greeting.getNameCounter()
    })
})

app.post('/errorHandling', function (req, res) {
    res.redirect("/")
})


const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})
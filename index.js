import express from 'express'
import { engine } from 'express-handlebars'
import greet from './greet.js'
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import DBJS from './connecting.js'

const app = express();
const greeting = greet(DBJS)

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

app.get('/', async function (req, res) {
    let errorMesg = req.flash("error")[0];
    let greetMesg = req.flash("info")[0]
    let success = req.flash("reset")[0]

    let showGreet = !errorMesg;

    res.render('index', {
        counting:await greeting.getNameCounter(),
        makeGreet: showGreet ? greetMesg : "",
        errorHandling: errorMesg,
        resetMesg : success

    });
});
app.post('/greeting', async function (req, res) {
    var greetingMesg = await greeting.makeGreet(req.body.name, req.body.language)
    let greetMe = greeting.getGreetings()
    // console.log(greeting.getNameCounter())
    req.flash('info', greetMe);

    const errors = greeting.errorHandling(req.body.name, req.body.language)
    req.flash('error', errors);
    res.redirect("/")
})

app.get('/counter/:name',async function (req, res) {
    res.render('counter', {
        count:await greeting.getUserCount(req.params.name),
        user: req.params.name
    })
})
app.get('/greeted',async function (req, res) {
    res.render('greeted', {
        listOfNames: await greeting.nameList()

    })
   
})

app.post('/errorHandling',  function (req, res) {
  
})
app.post('/reset',async function(req, res){
 const reseter = await greeting.reset();
    req.flash("reset", 'Successfully reset!' )
    res.redirect("/")
})

const PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})
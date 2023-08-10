import express from 'express'
import { engine } from 'express-handlebars'
import greet from './greet.js'
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';

const app =express();
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
    res.render('index', {
        makeGreet : req.flash("info")[0]
        
    });
});
app.post('/greeting', function (req, res){
    var greetingMesg=  greeting.makeGreet(req.body.name, req.body.language)
    req.flash('info', greetingMesg);
    res.redirect("/")
})


let greetingCount = 0;

app.get("/greeting-count", (req, res) => {
    res.json({ count: greetingCount });
});

app.post("/increment-count", (req, res) => {
    greetingCount++;
    res.json({ success: true });
});


const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})
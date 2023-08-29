export default function GreetRoute(greetingDataBase) {
    async function index(req, res, next) {
        let counter = await greetingDataBase.getNameCounter()
        let errorMesg = req.flash("error")[0];
        // let greetMesg = req.flash("info")[0]
        let success = req.flash("reset")[0]
        let showGreet = !errorMesg;
        let greetMessage = greetingDataBase.getGreetings()
        res.render('index', {
            count: counter,
            makeGreet: showGreet ? greetMessage : "",
            errorHandling: errorMesg,
            resetMesg: success

        });

    }
    async function reset(req, res, next) {

        await greetingDataBase.reset();
        req.flash("reset", 'Successfully reset!')
        res.redirect("/")
    }

    async function greetMessage(req, res) {
        let name = req.body.name
        let language = req.body.language
        await greetingDataBase.makeGreet(name, language)
        req.flash("error",greetingDataBase.errorHandling(name, language))

        res.redirect("/")

    }
    // async function errors(){

    // }
    return {
        index,
        reset,
        greetMessage,

    }
}
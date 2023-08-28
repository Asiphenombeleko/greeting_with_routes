export default function GreetRoute(greetingDataBase) {
    async function index(req, res, next) {

        try {
            let counter = await greetingDataBase.getNameCounter()
            let errorMesg = req.flash("error")[0];
            let greetMesg = req.flash("info")[0]
            let success = req.flash("reset")[0]
            let showGreet = !errorMesg;

            res.render('index', {
                counting: counter,
                makeGreet: showGreet ? greetMesg : "",
                errorHandling: errorMesg,
                resetMesg: success

            });
        }
        catch (err) {
            next(err);
        }
    }
    async function reset(req, res, next) {
        try {
            await greetingDataBase.reset();
            req.flash("reset", 'Successfully reset!')
            res.redirect("/")
        }
        catch (err) {
            next(err)
        }
    }

    async function greetMessage(req, res) {
        let name = req.body.name
        let language = req.body.language
        await greetingDataBase.makeGreet(name, language)
        let greetMessage = greetingDataBase.getGreetings()
        res.render('index', {
            makeGreet: greetMessage
        })
    }
    // async function errors(){
        
    // }
    return {
        index,
        reset,
        greetMessage,

    }
}
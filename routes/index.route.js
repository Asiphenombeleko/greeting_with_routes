export default function GreetRoute(greetingDataBase) {
    async function makeGreeting(req, res, next) {

        try {
            let errorMesg = req.flash("error")[0];
            let greetMesg = req.flash("info")[0]
            let success = req.flash("reset")[0]
            let showGreet = !errorMesg;

            res.render('index', {
                counting: await greetingDataBase.getNameCounter(),
                makeGreet: showGreet ? greetMesg : "",
                errorHandling: errorMesg,
                resetMesg: success

            });
        }
        catch (error) {
            next(error);
        }
    }
    async function reset(req, res, next) {
        try{
        await greetingDataBase.reset();
        req.flash("reset", 'Successfully reset!')
        res.redirect("/")
        }
        catch(err){
            next(err)
        }
    }
    return {
        makeGreeting,
        reset
    }
}
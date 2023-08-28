export default function Counter(greetingDataBase) {
    async function countersRoute(req, res) {
        const count = await greetingDataBase.getUserCount(req.params.name)
        res.render('counter', {
            count: count.counter,
            user: req.params.name
        })
       
    }
    return {
        countersRoute
    }
}
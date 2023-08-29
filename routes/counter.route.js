export default function Counter(greetingDataBase) {
    async function countersRoute(req, res) {
        let name = req.params.name;
        let count =await greetingDataBase.getUserCount(name)
       
        res.render('counter', {
            count: count,
            user:name 
        });
    
    }
     return {
            countersRoute
        }
}
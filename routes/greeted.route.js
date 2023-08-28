export default function Greeted(greetingDataBase){

    async function  greeted(req, res) {
        const list =  await greetingDataBase.nameList();
        res.render('greeted', {
            listOfNames:list
    
        })
        
    }
    return{
        greeted
    }
}
// Import my database library 

export default function GreetData(db) {
    async function checkName(name) {
        let nameCheck = await db.oneOrNone('SELECT * FROM greettable where name = $1', [name])
        return nameCheck
    }
    async function insertName(name, counter) {
        await db.none('INSERT into greettable (name ,counter)values ($1, $2)', [name, 1])
    }
    async function update(name) {
        await db.none('UPDATE greettable set counter = counter+1 where name =$1', [name])
    }
    async function getCounterNames() {
        let counter = await db.any('SELECT count(*) FROM greettable')
        return counter.count;
    }
    async function userCount(name){
        let count = await db.one('SELECT counter FROM greettable WHERE name = $1', [name]);
        return count.counter
    }
    async function listOfNamesGreeted(){
        let list = await db.manyOrNone('SELECT name FROM greettable');
        return list
    }
    async function resetData() {
        await db.none('DELETE FROM greettable')
    }
    return {
        checkName,
        insertName,
        update,
        resetData,
        getCounterNames,
        userCount,
        listOfNamesGreeted

    }
}
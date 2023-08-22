export default function greet(db) {
  let greetedNames = [];
  let nameRegex = /^[a-zA-Z\s]+$/;
  let greetMe = "";
  let userNames = {}
  let theCounter = 0;

  async function makeGreet(names, languages) {
    if (nameRegex) {
      let named = names.charAt(0).toUpperCase();
      let newName = names.slice(1).toLowerCase();
      let newNames = named + newName;
      // console.log(newNames);
      await namesGreeted(newNames);

      if (languages === "english") {
        greetMe = "Hello " + newNames;
      }
      if (languages === "xhosa") {
        greetMe = "Molo " + newNames;
      }
      if (languages === "french") {
        greetMe = "Bonjour  " + newNames;
      }
    }


  }
  function getGreetings() {
    return greetMe
  }

  async function namesGreeted(name) {
    let nameValidation = nameRegex.test(name);
    if (nameValidation) {

      let nameCheck = await db.oneOrNone('SELECT * FROM greettable where name = $1', [name])
      console.log(nameCheck);
      if (nameCheck == null) {
        await db.none('INSERT into greettable (name ,counter)values ($1, $2)', [name, 1])
      }
      else {
        await db.none('UPDATE greettable set counter = counter+1 where name =$1', [name])
        console.log(userNames);
      }

    }
    return "";
  }


  async function reset() {
    await db.none('DELETE FROM greettable')

  }



  async function getNameCounter() {

    let counter = await db.one('SELECT count(*) FROM greettable')
    console.log(counter);
    return counter.count;
  }

  async function getUserCount(name) {
    let count = await db.one('SELECT counter FROM greettable WHERE name = $1', [name]);

    return count.counter;
  }
  async function nameList(){

    let list = await db.manyOrNone('SELECT name FROM greettable');
    return list;
  }

  

  function errorHandling(names, languages) {

    let message = "";

    if (!names && !languages) {

      message = "Please enter name & select language";

    }
    else if (!languages) {
      message = "Please select the language!";

    }
    else if (!names) {
      message = "Please enter your name!";

    }

    else if (nameRegex.test(names) === false) {
      message = "please enter correct details!";

    }
    return message;
  }
  function counter() {
    if (greetMe) {

    }
  }

  return {
    makeGreet,
    namesGreeted,
    reset,
    errorHandling,
    getGreetings,
    counter,
    getNameCounter,
    getUserCount,
    nameList
  };
}
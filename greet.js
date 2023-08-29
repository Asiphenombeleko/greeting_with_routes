import GreetData from "./db/db.js";

export default function greet(db) {
  const greetingDataBase = GreetData(db);
  let greetedNames = [];
  let nameRegex = /^[a-zA-Z\s]+$/;
  let greetMe = "";
  let userNames = {};
  // let theCounter = 0;

  async function makeGreet(names, languages) {
    if (nameRegex) {
      let named = names.charAt(0).toUpperCase();
      let newName = names.slice(1).toLowerCase();
      let newNames = named + newName;
      
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
    return greetMe;
  }

  async function namesGreeted(name) {
    let nameValidation = nameRegex.test(name);
    if (nameValidation) {
      //this line of code checks the name the user input and see if it passes the regex test
      let nameCheck = await greetingDataBase.checkName(name);
      //here i check if the name =null is true then i should insert the name
      if (nameCheck == null) {
        await greetingDataBase.insertName(name, 1);
      }
      //else if it is not null i should update the counter of the name buy adding 1 each time it gets the name again
      else {
        await greetingDataBase.update(name);
      }
      //return the namecheck which is the variable that stores the names checked
    }
    return nameValidation;
  }

  async function reset() {
    await greetingDataBase.resetData();
  }

  async function getNameCounter() {
    let counter = await greetingDataBase.getCounterNames();
    return counter
  }

  async function getUserCount(name) {
    let count = await greetingDataBase.userCount(name);
    return count;
  }
  async function nameList() {
    let list = await greetingDataBase.listOfNamesGreeted();
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
  // function counter() {
  //   if (greetMe) {
  //   }
  // }

  return {
    makeGreet,
    namesGreeted,
    reset,
    errorHandling,
    getGreetings,
    // counter,
    getNameCounter,
    getUserCount,
    nameList,
  };
}

export default function greet() {
  let greetedNames = [];
  let nameRegex = /^[a-zA-Z\s]+$/;
  let greetMe = "";
  let userNames = {}
  let theCounter = 0;

  function makeGreet(names, languages) {
    if (nameRegex) {
      let named = names.charAt(0).toUpperCase();
      let newName = names.slice(1).toLowerCase();
      let newNames = named + newName;
      // console.log(newNames);
      namesGreeted(newNames);

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
  function getNames() {
    return greetMe
  }

  function namesGreeted(name) {
    if(userNames[name]  && nameRegex.test(name) === true){
      userNames[name] += 1
    }
    else{
      userNames[name]=1
      console.log(userNames);
    }
    
  }

  
  function reset() {
    localStorage.clear();
    location.reload();
    return "";
  }

  
  function getNameCounter() {

    let personList = Object.keys(userNames)
    return personList;
  }
  function getNumberOfNames() {
    let numberOfNames = Object.keys(userNames).length
    return numberOfNames;
  }

  function userCount(name) {
    for (const user in userNames) {
      if (user === name) {
        const element = userNames[user];
        return element;
      }
    }
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
    getNames,
    counter,
    getNameCounter,
    getNumberOfNames,
    userCount
  };
}
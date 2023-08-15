export default function greet() {
  var greetedNames = [];
  var nameRegex = /^[a-zA-Z\s]+$/;
  let greetMe = "";
  var counter = 0;

  function makeGreet(names, languages) {
    if (nameRegex) {
      let named = names.charAt(0).toUpperCase();
      let newName = names.slice(1).toLowerCase();
      let newNames = named + newName;

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

      if (greetedNames.includes(name) === false &&  nameRegex.test(name) === true)   {
        greetedNames.push(name);
      }
    }

  function countingNames() {
    return greetedNames.length;
  }
  function reset() {
    localStorage.clear();
    location.reload();
    return "";
  }

  function listOfNamesGreeted() {
    if(nameRegex){

    }
    return greetedNames;
  }

  function errorHandling(names, languages) {

    console.log(names, languages);

    var message = "";

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
    countingNames,
    namesGreeted,
    listOfNamesGreeted,
    reset,
    errorHandling,
    getNames
  };
}
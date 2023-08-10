export default function greet(nameList) {
    var greetedNames = nameList || [];
  
    function makeGreet(names, languages) {
      let named = names.charAt(0).toUpperCase();
      let newName = names.slice(1).toLowerCase();
      let newNames = named + newName;
      
      namesGreeted(newNames);
  
      if (languages === "english") {
        return "Hello " + newNames;
      }
      if (languages === "xhosa") {
        return "Molo " + newNames;
      }
      if (languages === "french") {
        return "Bonjour  " + newNames;
      }
    }
  
    function namesGreeted(name) {
      if (greetedNames.includes(name) === false) {
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
      return greetedNames;
    }
  
    function errorHandling(names, languages) {
      
      console.log(names, languages);
      var nameRegex = /^[a-zA-Z\s]+$/;
      var message = "";
  
      if (names === "" && !languages) {
       
        message = "Please enter name & select language";
        return message;
      }
      if (!languages) {
        message = "Please select the language!";
        return message;
      }
      if (names === "") {
        message = "Please enter your name!";
        return message;
      }
      
      if (nameRegex.test(names) === false) {
        message = "please enter correct details!";
        return message;
      }
      return message;
    }
  
    return {
      makeGreet,
      countingNames,
      namesGreeted,
      listOfNamesGreeted,
      reset,
      errorHandling,
    };
  }
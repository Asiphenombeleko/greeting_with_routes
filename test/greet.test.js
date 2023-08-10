import assert from 'assert'
import greet from '../greet.js';

describe("Greet", function () {
    it("should return the name of the person greeted in English", function () {
      var greeter = greet();
      assert.equal("Hello Asisipho", greeter.makeGreet("asisipho", "english"));
    });
  
    it("should return the name of the person greeted in isiXhosa", function () {
      var greeter = greet();
      assert.equal("Molo Asisipho", greeter.makeGreet("asisipho", "xhosa"));
    });
    it("should return the name of the person greeted in French", function () {
      var greeter = greet();
      assert.equal("Bonjour  Asisipho", greeter.makeGreet("asisipho", "french"));
    });
  
    describe("The listOfNamesGreeted function",function(){
  
    it("should return the array with names of people greeted", function () {
      var greeter = greet();
      greeter.makeGreet("yamisa", "english");
      greeter.makeGreet("asisipho", "english");
      assert.deepEqual(["Yamisa", "Asisipho"], greeter.listOfNamesGreeted());
  
      greeter.makeGreet("Saffah", "xhosa");
      greeter.makeGreet("Thembakazi", "xhosa");
      assert.deepEqual(["Yamisa", "Asisipho", "Saffah", "Thembakazi"],greeter.listOfNamesGreeted());
      
    })
  
    it("should return the array with names of people greeted", function () {
      var greeter = greet();
      greeter.makeGreet("Olo", "english");
      greeter.makeGreet("Amile", "english");
      assert.deepEqual(["Olo", "Amile"], greeter.listOfNamesGreeted());
  
      greeter.makeGreet("Kwane", "xhosa");
      greeter.makeGreet("Alu", "xhosa");
      assert.deepEqual(["Olo", "Amile", "Kwane", "Alu"],greeter.listOfNamesGreeted());
      
    })
    });
    describe("The CountingNames Function",function(){
  
    
    it("should return the length of the greeted names", function () {
      var greeter = greet();
      greeter.makeGreet("yamisa", "english");
      greeter.makeGreet("Asisipho", "english");
      greeter.makeGreet("Likhona", "english");
      greeter.makeGreet("Alunamda", "english");
      assert.deepEqual(4, greeter.countingNames());
  
      greeter.makeGreet("Lwandle", "english");
      assert.deepEqual(5, greeter.countingNames());
    });
    it("should return the length of the greeted names", function () {
      var greeter = greet();
      greeter.makeGreet("Akhona", "english");
      greeter.makeGreet("Saffah", "english");
      greeter.makeGreet("Mthunzi", "english");
      greeter.makeGreet("Katleho", "english");
      assert.deepEqual(4, greeter.countingNames());
  
    });
    
  })
  });
  describe("My ErrorHandling function", function(){
      it("should return 'Please enter name & select language'when it is not selected",function(){
          var greeter = greet();
         
          assert.equal("Please enter name & select language", greeter.errorHandling('',''))
      })    
  
      it("should return 'Please select the language!'when no language is entered",function(){
          var greeter = greet();
         
          assert.equal("Please select the language!", greeter.errorHandling('Lwandle',''))
      })    
  
      it("should return 'Please enter name!'when no name is entered",function(){
          var greeter = greet();
         
          assert.equal("Please enter your name!", greeter.errorHandling('','xhosa'))
      })    
  
      it("should return 'please enter correct details!'when user enters characters that are not alphabets",function(){
          var greeter = greet();
         
          assert.equal("please enter correct details!", greeter.errorHandling('Asiphe22','french'))
      })    
  })
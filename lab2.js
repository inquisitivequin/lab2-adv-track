'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/
function City(cityName, population) {
  this.cityName = cityName;
  this.population = population;
}

var dowington = new City('Dowington', 1000);

function Blob(consumption) {
  this.consumption = consumption;

  this.eat = function(city) {
    var citypop = city.population;
    var consume = this.consumption;
    while (citypop > 0) {
      consume += 1;
      citypop -= consume;
    }
    return consume;
  };
}

var blob = new Blob(1);

var donHours = blob.eat(dowington);

hoursSpentInDowington = donHours;

var hoursSpentInDowington; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

Blob.prototype.hoursToOoze = function(population, peoplePerHour) {
  var popl = population;
  var peep = peoplePerHour;

  while (popl >= 0) {
    if (popl > 0) {
      peep += 1;
      popl -= peep;
    } else {
      return 0;
    }
  }
  return peep;
};

blob.hoursToOoze(200, 0);

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');
// assert(blob.hoursToOoze(1, 1) === 1, 'nope');
// assert(blob.hoursToOoze(120, 1) === typeOf(number), 'sorry');
assert(blob.hoursToOoze(10, 1) === 5, 'try again');
// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing(homePlanet, lng) {
  this.homePlanet = homePlanet;
  this.lng = lng;
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
}

// sb is a SentientBeing object
SentientBeing.prototype.sayHello = function(sb) {
  switch (sb.lng) {

    case 'klingon':
      console.log(hello[this.lng]);
      return hello.klingon;

    case 'romulan':
      console.log(hello[this.lng]);
      return hello.romulan;

    default:
      console.log(hello[this.lng]);
      return hello['federation standard'];

  }
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating

    //TODO: put this on the SentientBeing prototype
};

function Klingon() {
  this.homePlanet = 'Qo"noS';
  this.lng = 'klingon';
}

function Romulan() {
  this.homePlanet = 'Romulus';
  this.lng = 'romulan';
}

function Human() {
  this.homePlanet = 'Earth';
  this.lng = 'federation standard';
}

Klingon.prototype = new SentientBeing();
Romulan.prototype = new SentientBeing();
Human.prototype = new SentientBeing();
// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');

assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the human should hear hello');

assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');

assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the human should hear hello');

assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {

    return a.charAt(a.length - 1) > b.charAt(b.length - 1);

    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
  }
  stringArray.sort(byLastLetter);
}

var ar1 = ['c', 'b', 'a'];
var ar2 = ['apple', 'carrot', 'banana'];
lastLetterSort(ar1);
lastLetterSort(ar2);

assert(ar1.toString()  ===  'a,b,c', 'lastLetterSort is broken');
assert(ar2.toString() === 'banana,apple,carrot', 'lastLetterSort is broken');

var ar3 = [1, 2, 3];
var ar4 = [10, 100, 1000, 10001];

function sumArray(numberArray) {
  var sum = 0;
  numberArray.forEach(function(number) {
    sum += number;
  }) ;
  return sum;
}

assert(sumArray(ar3)  ===  6, 'sumArray is broken');
assert(sumArray(ar4)  ===  11111, 'sumArray is broken');

var ar5 = [123, 234, 345];
var ar6 = [ar3, ar4, ar5];
var ar7 = [ar1, ar2];

function sumSort(arrayOfArrays) {

  arrayOfArrays.sort(function(a, b) {
    var c = sumArray(a);
    var d  = sumArray(b);
    return c - d;// sumArray(item);
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
  });
}

sumSort(ar6);
sumSort(ar7);

assert(ar6.toString()  === '1,2,3,123,234,345,10,100,1000,10001',
  'sumSort is broken');
assert(ar7.toString()  === 'a,b,c,banana,apple,carrot',
  'sumSort is broken');
//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************

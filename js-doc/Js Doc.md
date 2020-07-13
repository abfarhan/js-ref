# **Js Doc**

![Js documentation](https://github.com/abfarhan/js-ref/blob/master/js-doc/assets/js%20doc.PNG?raw=true)

<center>⚠️ Work In Progress ⚠️</center>

---

The browser has a javascript engine that executes js code. (chrome - v8, firefox – SpiderMonkey).
Inside js engine there is a parser. Firstly, raw JavaScript file goes into the Parser.

### **Topics**:<br>

- [Parser](#parser)
- [Execution Context](#execution-context)
- [Variable Object](#variable-object)
- [Hoisting](#hoisting)
- [Scope and Scope Chain](#scoping)
- [Inheritance](#inheritance)
- [Creating object using function constructor](#creating-object-using-function-constructor)
- [Creating object using Object.create](#creating-object-using-objectcreate)
- [Callback Functions](#callback-functions)
- [First-Class Objects](#first-class-objects)
- [Immediately Invoked Function Expression (IIFE)](#immediately-invoked-function-expression)
- [Closures](#closures)
- [Call, Bind & Apply methods](#call-bind--apply-methods)
- [Let & Const](#let--const)
- [Blocks and IIFE](#blocks-and-IIFE)
- [Arrow Function](#arrow-function)
- [Destructuring](#destructuring)
- [Spread Operator](#spread-operator)
- [Rest Parameter](#rest-parameter)
- [Array methods: every()](#array-methods-every)
- [Array methods: some()](#array-methods-some)
- [Class](#class)
- [Class: static methods](#class-static-methods)
- [Constructor and Super](#constructor-and-super)
- [Global variables](#global-variables)
- ⚠️ Work In Progress ⚠️


## **Parser**

**Parser**: Reads the code line by line and check if the syntax is correct. If the code is correct then the parser produces a datastruture known as Abstract syntax tree, which is then translated into the machine langulage.

## **Execution Context**

**Execution Context**: All the js code needs to run in an environment. And these environment are called execution Context.

- The default execution context is the Global Context.
- The global execution context are for the variables and function that are not inside any function.
- Each time we call a function it gets it's own execution context.

```javascript
var name = 'john';        // Stored in global exec. context

function first() {
                          // Stored in global exec. context
  var a = 'Hello';        // Stored in exec. context of first()
  second();               // Creates a new exec. context
  var x = a + name;       // Stored in exec. context of first()
}

function second() {
                          // Stored in global exec. context
  var b = 'Hi';           // Stored in exec. context of second()
  third();                // Creates a new exec. context
  var y = b + name;       // Stored in exec. context of second()
}

function third() {
                          // Stored in global exec. context
  var c = 'Hey';          // Stored in exec. context of third()
  var z = c + name;       // Stored in exec. context of third()
}

first();                  // Creates new exec. context
```

1. When we call first() fn. a new exec. context is being created and it becomes active context. The variables declared in that context will become attached to that context.
2. And int the fn. first() we call the second(), so a new exec. context is created and it goes to the second() fn. Variables declared inside this fn. is attached to the exec. context of second().
3. When third() is called a new exec. context is created. After executing the third() it goes back to the second() fn. and the third() exec. context is removed from the exec. stack.
4. After executing the second() it goes back to the first() fn. and the second() exec. context is removed from the exec. stack.
5. After executing the first() this exec. context is removed from the exec. stack and global exec. context become active.

**Execution context object** contains 3 things, </br>

- Variable Object.
- Scope chain.
- "This" variable/keyword.

![Execution context object](https://github.com/abfarhan/js-ref/blob/master/js-doc/assets/execution%20context%20object.png?raw=true)

1.  Creation Phase <br>
    a) Creation of Variable Object (VO). <br>
    b) Creation of scope chain. <br>
    c) Determine the value of "this" keyword. <br>

2.  Execution Phase <br>
    The code of the function that generated the current execution context is ran line by line.

```javascript
var age = 25;

function foo() {
  var age = 65;
  console.log(age);       // 65. Gets the age from the exec. context of foo() function
}

foo();
consolelog(age);          // 25 gets the age from the global exec. context
```

## **Variable Object**

- An **argument object** is created with all the arguments that were passed into the function.
  > Function arguments are the values receivd by the function when it is invoked.
- The code is scanned for function declaration. **For each function a property is created in the variable object, pointing to the function**. <br>
  (All the functions will be stored inside VO even before the code is executed.)
- Code is scanned for variable declaration. **For each variable a property is created in the VO and set it to undefined**.

## **Hoisting**

The functions and variables are hoisted in js, which means they are available before execution phase starts.

```javascript
calculateAge(1995);

function calculateAge(year) {
  console.log(2020 - year);
}
```

In the above example the function is called before executing the function definition this is called hoisting.

In the creation phase of execution context the functionn declaration calculateAge is stored in the VO (even before the fn definition code is executed). That's why we can use it.

> **Hoisting with function only works for function declaration and not for function expression.**

### Hoisting with Variables

```javascript
console.log(age); // Undefined
var age = 25;
```

During creation phase a property is created for each variable in VO and set it to undefined.

But if we are using a variable without declaring then it will throw an error.

```javascript
console.log(newAge); // Error
```

It throws error beacuse during creation phase no property is created in VO.

The `let` and `const` hoist but cannot access them before the actual declaration is evaluated at runtime.

```javascript
warrior = 'Ninja';

let warrior;

console.log(warrior); // Uncaught ReferenceError: Cannot access 'warrior' before initialization
```

## **Scoping**

- Scoping determines **where can we access a certain variable**.
- **Each new function a scope** (the space/ environment in which the variables it defines are accessible).
- **Lexical scoping** : a function that is lexically within another function gets access to the scope of the outer function.

![scope image](https://github.com/abfarhan/js-ref/blob/master/js-doc/assets/scope.PNG?raw=true)

## **This variable/ keyword**

It is a variable that each and every execution context gets.

- In regular function call the `this` keyword points at the global object ( the window object in the browser).
- In method call `this` keyword points to the object that is calling the method.
- The `this` keyword is not assigned a value until a function where it is defined is called. ( the value is assigned only when the object calls the method).

```javascript
console.log(this);

var john = {
  name: 'john',
  yob: 1995,
  calculateAge: function () {
    console.log(this);              // john object
    console.log(2020 - this.yob);

    function innerFunction() {
      console.log(this);            // window object
    }

    innerFunction();
  },
};

john.calculateAge();
```

In the above example in case of calculateAge it is a method so it points to the john object. <br>

But in case of innerFunction() eventhough it is present inside a method it is still a regular function. So in regular function `this` keyword always points to the window object.

```javascript
var mike = {
  name: 'mike',
  yob: 1996,
};

mike.calculateAge = john.calculateAge;

mike.calculateAge();               // mike object
```

In the above example mike.calculateAge() the `this` keyword points to mike object because the value to the 'this' keyword assigned only when the method is called.

## **Inheritance**

Javascript is a prototype based language, and inheritance works by using prototype. <br>
Each and every javascript object has a prototype property which makes inheritance possible.

![Prototype chain](https://github.com/abfarhan/js-ref/blob/master/js-doc/assets/prototype%20chain.png?raw=true)

- The prototype property of an object is where we put methods and properties that we want other object to inherit.
- The constructor's prototype property is not the property of constructor itself, it's the property of all the instance that are created through it.
- When a certain method ( or property ) is called, the search starts in the object itself and if it cannot be found, the search moves on to the object's property. This continues until the method is found. This is called prototype chain.

## **Creating object using function constructor**

```javascript
var Person = function (name, yob, job) {
  this.name = name;
  this.yob = yob;
  this.job = job;
};

var john = new Person('John', 1995, 'developer');
```

Here when we use `new` keyword an empty object is created. And then the `Person` function is called. Calling a function creates a new execution context which also has `this` keyword. <br>
In regular function `this` keyword points to the global object but here the `new` keyword created an empty object. So the `this` keyword points to the empty object.

```javascript
Person.prototype.calculateAge = function () {
  console.log(2020 - this.yob);
};

john.calculateAge();
```

Here we are not writing the function inside the constructor but we are writing it in the `Prototype` property so that the other object which uses the instance of the `Person` can inherit the function.

## **Creating object using Object.create**

Here we first define an object that act as a prototype and then create new object based in that prototype.

```javascript
const personProto = {
  calculateAge: function () {
    console.log(2020 - this.yob);
  },
};

const john = Object.create(personProto);

john.name = 'john';
john.yob = 1995;
john.job = 'developer';

const jane = Object.create(personProto, {
  name: { value: 'jane' },
  yob: { value: 2000 },
  job: { value: 'designer' },
});
```

Here first we are creating a prototype object personProto and adds the method. <br>
Then we create the object using Object.create() and pass the prototype.

> In john object we are creating the propertiees for john using `dot (.)` operator.

> In jane we are creating the properties for jane as a second argument of Onject.create() method.

The difference is Object.create inherit directly from what we pass as a first argument. In function constructor the newly created object inherit from the constructor's prototype property.

## **Callback Functions**

A callback function, also known as higher-order function is a function that is passed to another function as an argument, and the callback function is called later inside that function.

Example 1:

```javascript
function greeting(name) {
  alert('Hello ' + name);
}

function processUserInput(callback) {
  var name = prompt('Please enter your name.');
  callback(name);
}

processUserInput(greeting);
```

Example 2:

```javascript
const years = [1990, 1995, 2008, 1998, 2001];

function arrayCalc(arr, fn) {
  const arrRes = [];
  arr.forEach((el) => {
    arrRes.push(fn(el));
  });
  return arrRes;
}

function calculateAge(el) {
  return 2020 - el;
}

function isFullAge(el) {
  return el >= 18;
}

const ages = arrayCalc(years, calculateAge);
const fullAge = arrayCalc(ages, isFullAge);

console.log(ages);
console.log(fullAge);
```

Here we are passing calculateAge and isFullAge as an argument to the arrayCalc function.

## **First-Class Objects**

In javascript, functions are first-class objects. That is, functions are of type object and they can be used in a first-class manner like any other object (string, array, number, etc). Since they are infact object themselves, they can be stored in a variable, passed as an argument to functions ([Callback function](#callback-functions)) , created within functions and returned from a function.

### Assigning function to a variable

If we pass a function to a variable  without parenthesis then it is like passing the entire function.

```javascript
var line = console.log;

line();
line('Hello and welcome!');
```

The benefit of passing a function to variable is that it can only be called after the function is executed, because the variables are hoisted and return undefined if it is not defined.  
In normal function the function can be called before executing because of the hoisting.

### Returning a function from a function

```javascript
function greetingFn(greeting) {
  if (greeting === 'Hello') {
    return function (name) {
      console.log('Hello ' + name);
    };
  } else if (greeting === 'Hi') {
    return function (name) {
      console.log('Hi ' + name);
    };
  } else {
    return function (name) {
      console.log('Hey ' + name);
    };
  }
}
```

> Using variables

```javascript
const helloGreeting = greetingFn('Hello');
const hiGreeting = greetingFn('Hi');

helloGreeting('John');                  // Hello John
hiGreeting('Mark');                     // Hi Mark
```

> Using double parentheses (without variable)

```javascript
greetingFn('Hello')('Jane');            // Hello Jane
greetingFn('Hola')('Kevin');            // Hey Kevin
```

## **Immediately Invoked Function Expression**

IIFE is a function that runs as soon as it is defined.

```javascript
(function () {
  var n = 'John';
  console.log(n);                       // John
})();

console.log(n);                         // Uncaught ReferenceError: n is not defined
```

1. The first is the anonymous function with lexical scope enclosed within the `Grouping Operator ()`. This prevents accessing variables within the IIFE idiom as well as polluting the global scope.
2. The second part creates the immediately invoked function expression `()` through which the JavaScript engine will directly interpret the function and invokes the function immediately.

## **Closures**

An inner function always have access to the variables and parameters of it's outer function even after the outer function has returned.

```javascript
function retirement(retirementAge) {
  const a = ' years left until retirement';
  return function (yob) {
    const age = 2020 - yob;
    const yearsLeftMessage = retirementAge - age + a;
    console.log(yearsLeftMessage);
  };
}

const retirementUS = retirement(66);
const retirementGermany = retirement(65);
const retirementIceland = retirement(65);

retirementUS(1995);
retirementGermany(1985);
retirementIceland(1980);
```

Here `retirement()` function creates a new execution context. This execution context has an object which stores variables, scope chain & `this` variable/keyword. A scope chain is like a pointer to all VO that the function has access to. ie, `retirementAge` argument and variable `a`.
So when the function returns, the execution context is also removed. But the VO is not removed, it is still in the memory and can be accessed. So when we call the inner function `retirementUS`, since the inner function is written lexically in the `retirement()` the inner function gets access to the outer function scope. Since the VO remains there even after the execution context of the `retirement()` is removed, the scope chain works and gets access to the variables even after the function has completed execution. This is how the closure works.

Another quick example:

```javascript
function greetingFn(greeting) {
  const a = ', how are you?';
  return function (name) {
    if (greeting === 'Hello') {
      console.log('Hello ' + name + a);
    } else if (greeting === 'Hi') {
      console.log('Hi ' + name + a);
    } else {
      console.log('Hey ' + name + a);
    }
  };
}

const helloGreeting = greetingFn('Hello');
const hiGreeting = greetingFn('Hi');

helloGreeting('John');
hiGreeting('Mark');

greetingFn('Hello')('Jane');
greetingFn('Hola')('Kevin');
```

## **Call, Bind & Apply methods**

### **Call**

Call method allow us to call a function and set the `this` keyword manually.

``` javascript
const john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function (style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ' ladies and gentlemen ! My name is ' + this.name + ' i\'m ' + this.age + ' years old. And i\'m a ' + this.job);
        }
        else if (style === 'friendly') {
            console.log('Hey what\'s up my name is ' + this.name + ', i\'m ' + this.age + ' years old, i\m a ' + this.job + ' and have a wonderful ' + timeOfDay);
        }
    }
}

john.presentation('formal', 'morning');
john.presentation('friendly', 'evening');

const emily = {
    name: 'Emily',
    age: 24,
    job: 'developer'
}

john.presentation.call(emily, 'formal', 'afternoon');
```

Here we are calling john object's presentation method for emily object. <br>

While using `call` method we need to pass 1st argument as `this` keyword. So, here we are passing emily, so the value of `this` keyword in the presentation method is not john but emily.

### **Apply**

The apply method works almost similar to call method but the only difference is apply method accepts the argument as an array & `this` keyword.


### **Bind**

The `bind()` method also allows us to set `this` keywork explicitly, the difference is, bind doesn't immediately call the function instead it generates the copy of the function, so that we can store it.

**MDN :-** The `bind()` method creates a new function that, when called, has its own `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.


```javascript
const john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function (style, timeOfDay) {
        if (style === 'formal') {
            console.log(`Good ${timeOfDay} ladies and gentlemen ! My name is ${this.name} I'm ${this.age} years old. And I'm a ${this.job}`);
        }
        else if (style === 'friendly') {
            console.log(`Hey what's up my name is ${this.name}, I'm ${this.age} years old, I'm a ${this.job} and have a wonderful ${timeOfDay}`);
        }
    }
}

const johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('morning');
johnFriendly('night');

const emily = {
    name: 'Emily',
    age: 24,
    job: 'developer'
}

const emilyFormal = john.presentation.bind(emily, 'formal');

emilyFormal('afternoon');
```

So the bind allows us to preset some arguments.  
Here, we preset style parameter of `presentation()` method, ie, argument `friendly`.

**Currying :-** It is a technique in which we create a function based on another function but with some preset parameter.

eg: We created `johnFriendly()` function based on `presentation()` method with preset argument `friendly`.

## **Let & Const** 

- Variable declared with let & const are block scoped.

> let is accessible only in the block where it is defined.
``` javascript
function test(param) {
    if (param === true) {
        let n = 'john';
        console.log(n);           // john
    }
    console.log(n);               // Uncaught ReferenceError: n is not defined
}

test(true);
```

- Variable declared with var keyword is function scoped.

``` javascript
function test(param) {
    if (param === true) {
        var n = 'john';
        console.log(n);          // john
    }
    console.log(n);              // john
}

test(true);
```

- Let is accessible only after it is declared

``` javascript
function test(param) {
    if (param === true) {
        console.log(n);         // Uncaught ReferenceError: Cannot access 'n' before initialization
        let n = 'john';
    }
}

test(true);
```

- var is hoisted and set to undefined

``` javascript
function test(param) {
    if (param === true) {
        console.log(n);          // Undefined
        var n = 'john';
    }
}

test(true);
```

## **Blocks and IIFE**

``` javascript
{
    const a = 5;
    let b = 6
}
```

Here `let & const` are block scoped so we can create a block using `{}`
and write the variables inside, so those variables are not accessile from outside the block. In this way we can use `let & const` as IIFE.

## **Arrow Function**

**MDN** - An arrow function expression is a syntactically compact alternative to a regular function expression, although without its own bindings to the `this`, `arguments`, `super`, or `new.target` keywords. Arrow function expressions are ill suited as methods, and they cannot be used as constructors.

``` javascript
const years = [1990, 1995, 2000, 2005];

let age = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index} : ${age}`;
});

console.log(age);
```

- Parentheses are optional when there's only one parameter name

- When there is only one statement and it is return statement, then we can remove return keyword.

- When there is multiple statement then we need write those statement in `{}`. If there is any return statement in that multiple statement then we need to specify the return keyword. 

### **Lexical this keyword**

An arrow function does not have its own `this`. Arrow function shares the surrounding `this` keyword, which means, unlike normal function arrow function does not have `this` keyword, they simply use the `this` keyword of the function they are written in.

**MDN** :- An arrow function does not have its own this. The this value of the enclosing lexical scope is used; arrow functions follow the normal variable lookup rules. So while searching for this which is not present in the current scope, an arrow function ends up finding the this from its enclosing scope.

``` html
<button class="green">Click Me</button>
```

``` javascript
const button = {
    color: 'green',
    position: 1,
    clickMe: function () {
        document.querySelector('.green').addEventListener('click', () => {
            let string = `Button number ${this.position} and it is ${this.color} color`;
            alert(string);   // Button number 1 and it is green color
        });
    }
}

button.clickMe();
```

> Here the arrow function uses the `this` keyword of the clickMe method. 

If w uses normal function instead of arrow function `this.position` and `this.color` will give `undefined` because it points to the global object.

``` javascript
const button = {
    color: 'green',
    position: 1,
    clickMe: function () {
        document.querySelector('.green').addEventListener('click', function () {
            let string = `Button number ${this.position} and it is ${this.color} color`;
            alert(string);    // Button number undefined and it is undefined color
        });
    }
}

button.clickMe();
```

Another example :- with function constructor <br>

Using arrow function.
``` javascript

function Person(fname) {
    this.fname = fname;
}

Person.prototype.myFriends = function (friends) {
    let arr = friends.map((el) => {
        return `${this.fname} is friends with ${el}`
    });
    console.log(arr);
}
let friends = ['Bob', 'Mark', 'Mary'];
new Person('John').myFriends(friends);
```
> Output :- <br>
> John is friends with Bob <br>
> John is friends with Mark <br>
> John is friends with Mary <br>

Here `this` keyword of arrow function inside `map` method points to the `this` keyword of `myFriends` method of Person object. <br>

Using normal function.

``` javascript
function Person(fname) {
    this.fname = fname;
}

Person.prototype.myFriends = function (friends) {
    let arr = friends.map(function (el) {
        return `${this.fname} is friends with ${el}`
    });
    console.log(arr);
}
let friends = ['Bob', 'Mark', 'Mary'];
new Person('John').myFriends(friends);
```

> Output :- <br>
> undefined is friends with Bob <br>
> undefined is friends with Mark <br>
> undefined is friends with Mary <br>

Here `this` keyword of normal function inside `map` method points to the `this` keyword of global object. <br>

## **Destructuring**

Destructuring helps to unpack values from arrays, or properties from objects, into distinct variables.

``` javascript
const [name, job] = ['John', 'Developer'];

console.log(name);      // John
console.log(job);       // Developer
```

``` javascript
const obj = {
    fName: 'John',
    lName: 'Doe'
}

const { fName, lName } = obj;

console.log(fName);         // John
console.log(lName);         // Doe
```

``` javascript
const obj = {
    fName: 'John',
    lName: 'Doe'
}

const { fName: firstName, lName: lastName } = obj;

console.log(firstName);     // John
console.log(lastName);      // Doe
```

### **Returning multiple values from a function using destructuring**

``` javascript
function retirementAgeCalc(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age, retirement] = retirementAgeCalc(1995);

console.log(age);
console.log(retirement);
```

## **Spread Operator**

Spread operator is used to expand an iterable object into list of arguments.

**MDN:-** Spread syntax allows an iterable such as an array expression or string to be expanded in places where zero or more arguments(for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key value pairs(for object literals) are expected.

Basically, spread operator takes an array and transform into single values.

``` javascript
function addAges(a, b, c, d) {
  return a + b + c + d;
}

const sum1 = addAges(18, 19, 20, 21);
console.log(sum1);

const ages = [22, 23, 24, 25];
const sum2 = addAges(...ages);  // using spread operator passing array of values as single values
console.log(sum2);
```

``` javascript
const group1 = ['John', 'Mark', 'Jared', 'Kevin'];
const group2 = ['Jane', 'Bob', 'Bella', 'Mary'];

const combGroup = [...group1, ...group2];  // using spread operator passing array of values as single values
console.log(combGroup);
```

## **Rest Parameter**

Rest parameter allows us to pass an arbitrary number of arguments into a function and use the arguments in that function.

**MDN :-** The rest parameter syntax allows us to represent an indefinite number of arguments as an array.

Basically, rest parameter receives couple of single values and transform it into an array.

``` javascript
function isFullAge(...years) {
    years.forEach((current) => console.log((2020 - current) >= 18))
}

isFullAge(1990, 1995, 2000, 2005)
```

## **Array methods: every()**

The `every()` method checks whether all elements in the array pass the test implemented by the provided function, and if yes then it returns true.  
If any of the element doesn't pass the test then it returns false.

```javascript
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true
```

[click for more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

## **Array methods: some()**

The `some()` method determines whether at least one element of the array matches the given predicate. If at least one element matches then it returns true.  
It only returns false if none of the array elements match the predicate:

```javascript
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// expected output: true
```

[click for more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

## **Class**

- Classes are not hoisted, therefore need to declare first to use it.
- Two ways to define a class: class declarations and class expression.
- Function declaration and expression can be overwritten where as, class can be extended but cannot be overwritten.
- When we create a class it is automatically in strict mode.

```javascript
class Car {
  constructor(doors, engine, color) {
    this.doors = doors;
    this.engine = engine;
    this.color = color;
  }

  carStat() {
    return `This car has ${this.doors} doors, a ${this.engine} engine and the color is ${this.color}`;
  }
}

const cx6 = new Car(4, 'VS', 'grey');

console.log(cx6);
console.log(cx6.carStat());
```

### Class: static methods

Static methods are methods that aren't accessible through an instance of a class, but only available through the class itself. They are usually created for utility functions that don't relate to the instance of the class. 

```javascript
class Car {
  constructor(doors, engine, color) {
    this.doors = doors;
    this.engine = engine;
    this.color = color;
  }

  carStat() {
    return `This car has ${this.doors} doors, a ${this.engine} engine and the color is ${this.color}`;
  }

  static totalDoors(car1, car2) {
    const doors1 = car1.doors;
    const doors2 = car2.doors;

    return doors1 + doors2;
  }
}

const cx6 = new Car(4, 'VS', 'grey');
const benz = new Car(4, 'Vf', 'black');

console.log(cx6);
console.log(cx6.carStat());
console.log(benz);
console.log(benz.carStat());

// console.log(cx6.totalDoors()); // Uncaught TypeError: cx6.totalDoors is not a function
// console.log(benz.totalDoors()); // Uncaught TypeError: benz.totalDoors is not a function

console.log(Car.totalDoors(cx6, benz)); // Output: 8

// Static methods are only accessible through the class but not with the class instances.
```

### Constructor and Super

```javascript
class Car {
  constructor(doors, engine, color) {
    this.doors = doors;
    this.engine = engine;
    this.color = color;
  }

  carStat() {
    return `This car has ${this.doors} doors, a ${this.engine} engine and the color is ${this.color}`;
  }

  static totalDoors(car1, car2) {
    const doors1 = car1.doors;
    const doors2 = car2.doors;

    return doors1 + doors2;
  }
}

class SUV extends Car {
  constructor(doors, engine, color, brand, carStat) {
    super(doors, engine, color, carStat);
    this.brand = brand;
    this.wheels = 4;
    this.ac = true;
  }

  myBrand() {
    return `This SUV is a ${this.brand}`;
  }
}

const cx6 = new SUV(4, 'VS', 'grey', 'Land Rover');
console.log(cx6);

console.log(cx6.myBrand());
console.log(cx6.carStat());
```

### Global variables

```javascript
const warrior_1 = 'Ninja'; // warrior_1 globally scoped

let warrior_2; // warrior_2 globally scoped

const screamWarrior = () => {
  warrior_2 = 'Samurai'; // warrior_2 globally scoped

  let warrior_3 = 'Viking'; // warrior_3 locally scoped

  warrior_4 = 'Assassins'; // warrior_4 globally scoped, because it is not declared but defined, so it's same as declaring it globally.

  console.log(warrior_1, warrior_2, warrior_3, warrior_4);
};

screamWarrior();

console.log(warrior_1, warrior_2, warrior_3, warrior_4);  // Uncaught ReferenceError: warrior_3 is not defined
```

If we use `'use strict'` then warrior_4 will throw error because it is not declared.

---

<center>⚠️ Work In Progress ⚠️</center>

---

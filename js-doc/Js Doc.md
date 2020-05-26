# **Js Doc**

![Js documentation](https://github.com/abfarhan/js-ref/blob/master/js-doc/assets/js%20doc.png?raw=true)

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
- [Creating object using Object.create](#creating-object-using-object.create)
- [Callback Functions](#callback-functions)
- [Immediately Invoked Function Expression (IIFE)](<#immediately-invoked-function-expression-(iife)>)
- [Closures](#closures)
- ⚠️ Work In Progress ⚠️
- ⚠️ Work In Progress ⚠️
- ⚠️ Work In Progress ⚠️
<!--
- [](#)
- [](#)
- [](#)
  -->

## **Parser**

**Parser**: Reads the code line by line and check if the syntax is correct. If the code is correct then the parser produces a datastruture known as Abstract syntax tree, which is then translated into the machine langulage.

## **Execution Context**

**Execution Context**: All the js code needs to run in an environment. And these environment are called execution Context.

- The default execution context is the Global Context.
- The global execution context are for the variables and function that are not inside any function.
- Each time we call a function it gets it's own execution context.

```javascript
var name = 'john'; // Stored in global exec. context

function first() {
  // Stored in global exec. context
  var a = 'Hello'; // Stored in exec. context of first()
  second(); // Creates a new exec. context
  var x = a + name; // Stored in exec. context of first()
}

function second() {
  // Stored in global exec. context
  var b = 'Hi'; // Stored in exec. context of second()
  third(); // Creates a new exec. context
  var y = b + name; // Stored in exec. context of second()
}

function third() {
  // Stored in global exec. context
  var c = 'Hey'; // Stored in exec. context of third()
  var z = c + name; // Stored in exec. context of third()
}

first(); // Creates new exec. context
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
  console.log(age); // 65. Gets the age from the
  // exec. context of foo() function
}

foo();
consolelog(age); // 25 gets the age from the
// global exec. context
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
    console.log(this); // john object
    console.log(2020 - this.yob);

    function innerFunction() {
      console.log(this); // window object
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

mike.calculateAge(); // mike object
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

helloGreeting('John'); // Hello John
hiGreeting('Mark'); // Hi Mark
```

> Using double parentheses (without variable)

```javascript
greetingFn('Hello')('Jane'); // Hello Jane
greetingFn('Hola')('Kevin'); // Hey Kevin
```

## **Immediately Invoked Function Expression (IIFE)**

IIFE is a function that runs as soon as it is defined.

```javascript
(function () {
  var n = 'John';
  console.log(n); // John
})();

console.log(n); // Uncaught ReferenceError: n is not defined
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

---

<center>⚠️ Work In Progress ⚠️</center>

---

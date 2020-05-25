# **Js Doc**

The browser has a javascript engine that exicutes js code. (chrome - v8, firefox – SpiderMonkey).
Inside js engine there is a parser.

### **Topics**:<br>

- [Parser](#parser)
- [Execution Context](#execution-context)
- [Variable Object](#variable-object)
- [Hoisting](#hoisting)
- [Scope and Scope Chain](#scoping)
- [Inheritance](#inheritance)
- [](#)
- [](#)

## **Parser**

**Parser**: Reads the code line by line and check if the syntax is correct. If the code is correct then the parser produces a datastruture known as Abstract syntax tree, which is then translated into the machine langulage.

---

## **Execution Context**

**Execution Context**: All the js code needs to run in an environment. And these environment are called execution Context.

- The default execution context is the Global Context.
- The global execution context are for the variables and function that are not inside any function.
- Each time we call a function it gets it's own execution context.

```
var name = 'john';       // Stored in global exec. context

function first() {       // Stored in global exec. context
    var a = 'Hello';     // Stored in exec. context of first()
    second();            // Creates a new exec. context
    var x = a + name;    // Stored in exec. context of first()
}

function second() {      // Stored in global exec. context
    var b = 'Hi';        // Stored in exec. context of second()
    third();             // Creates a new exec. context
    var y = b + name;    // Stored in exec. context of second()
}

function third() {       // Stored in global exec. context
    var c = 'Hey';       // Stored in exec. context of third()
    var z = c + name;    // Stored in exec. context of third()
}

first();                 // Creates new exec. context
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

1.  Creation Phase <br>
    a) Creation of Variable Object (VO). <br>
    b) Creation of scope chain. <br>
    c) Determine the value of "this" keyword. <br>

2.  Execution Phase <br>
    The code of the function that generated the current execution context is ran line by line.

```
var age = 25;

function foo() {
    var age  = 65;
    console.log(age);  // 65. Gets the age from the
                       // exec. context of foo() function
}

foo();
consolelog(age);       // 25 gets the age from the
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

```
calculateAge(1995);

function calculateAge(year) {
 console.log(2020 - year);
}
```

In the above example the function is called before executing the function definition this is called hoisting.

In the creation phase of execution context the functionn declaration calculateAge is stored in the VO (even before the fn definition code is executed). That's why we can use it.

> **Hoisting with function only works for function declaration and not for function expression.**

### Hoisting with Variables

```
console.log(age);       // Undefined
var age = 25;
```

During creation phase a property is created for each variable in VO and set it to undefined.

But if we are using a variable without declaring then it will throw an error.

```
console.log(newAge);    // Error
```

It throws error beacuse during creation phase no property is created in VO.

## **Scoping**

- Scoping determines **where can we access a certain variable**.
- **Each new function a scope** (the space/ environment in which the variables it defines are accessible).
- **Lexical scoping** : a function that is lexically within another function gets access to the scope of the outer function.

[scope image]()

## **This variable/ keyword**

It is a variable that each and every execution context gets.

- In regular function call the 'this' keyword points at the global object ( the window object in the browser).
- In method call 'this' keyword points to the object that is calling the method.
- The 'this' keyword is not assigned a value until a function where it is defined is called. ( the value is assigned only when the object calls the method).

```
console.log(this);

var john = {
   name: 'john',
   yob: 1995,
   calculateAge: function() {
       console.log(this);                  // john object
       console.log(2020 - this.yob);

       function innerFunction() {
           console.log(this);              // window object
       }

       innerFunction();
   }
}

john.calculateAge();
```

In the above example in case of calculateAge it is a method so it points to the john object. <br>

But in case of innerFunction() eventhough it is present inside a method it is still a regular function. So in regular function 'this' keyword always points to the window object.

```
var mike = {
    name: 'mike;,
    yob: 1996
}

mike.calculateAge = john.calculateAge;

mike.calculateAge();                        // mike object
```

In the above example mike.calculateAge() the 'this' keyword points to mike object because the value to the 'this' keyword assigned only when the method is called.

## **Inheritance**

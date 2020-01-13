let obj = {
  value: 10,

  foo() {
    function bar() {
      console.log(this.value);
    }

    bar();
  }
}

obj.foo(); // Prints `undefined`

obj = {
  value: 10,

  foo() {
    const bar = () => {
      console.log(this.value);
    }

    bar();
  }
}

obj.foo(); // Prints 10

// When you determine the value of `this` inside a function. Check the following:
// 1. Is it an arrow function?
//    1.1 Then value of `this` is the same as value of `this` where the function is defined.
// 2. Else
//    2.1. Determine how the function is called.

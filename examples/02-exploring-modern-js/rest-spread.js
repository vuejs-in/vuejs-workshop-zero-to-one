function foo(...args) {
    console.log(args);
}

foo();
foo(1);
foo(1, 2);
foo(1, 2, 3, 4);

let args = [1, 2, 3, 4, 5];

foo(...args);

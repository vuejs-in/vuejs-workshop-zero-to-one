# Lesson 2

While the world of modern JavaScript is vast and won't be enough for us to cover in its entirety, we will take a look at some of the essential ones in this lesson.

## `let` and `const`

This will allow us to create block scoped variables. `var` suffered the problem of being only function-scoped and thus, causing a lot of mistakes. With `let` and `const`, we can finally have true block-scoped variables with `const` allowing us to create a binding that cannot be changed, further reducing accidents.

Refer [examples/02-exploring-modern-js/let-const.js](../examples/02-exploring-modern-js/let-const.js)

## Shorthand method syntax

Just a syntactic sugar to make it easier to write methods in objects and classes.

Refer [examples/02-exploring-modern-js/shorthand-methods.js](../examples/02-exploring-modern-js/shorthand-methods.js)

## Rest and Spread operators

Allows functions to take variable arguments, which is made available to the function body as an array. This operator is overloaded in that you can take an existing array or an iterable and pass it as individual arguments to a function call.

Refer [examples/02-exploring-modern-js/rest-spread.js](../examples/02-exploring-modern-js/rest-spread.js)

## Destructuring

This makes it easy to extract properties of an object, no matter how deep they are nested in one single line into the current scope.

Refer [examples/02-exploring-modern-js/destructuring.js](../examples/02-exploring-modern-js/destructuring.js)

## Arrow functions

Trying to grapple with the value of `this` is one of the biggest painpoints of modern JS development since the value of `this` is determined at runtime, based on how you invoke a function. Not anymore, as arrow functions provide not just a more consise way to write a function, but also, the value of `this` is determined lexically (a.k.a when you write code) so that it's easier to reason about and reduces the chances of errors.

Refer [examples/02-exploring-modern-js/arrow-fns.js](../examples/02-exploring-modern-js/arrow-fns.js)

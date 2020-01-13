const tightlyBound = 100;

tightlyBound = 200; // ERROR: once bound, cannot be changed!

if (true) {
  let blockScoped = 200;
  const constBlockScoped = 300;
}

console.log(blockScoped);       // ERROR: blockScoped and constBlockScoped is
console.log(constBlockScoped);  // not available outside `if`

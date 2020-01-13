const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: {
    e: 4,
    f: 5
  }
};

const { a, c } = obj;
console.log(a, c);

const { d: { e, f } } = obj;
console.log(e, f);

const { a: foo } = obj;
console.log(foo);

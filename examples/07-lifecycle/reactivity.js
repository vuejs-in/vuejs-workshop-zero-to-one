var obj = {
  price: 10,
  totalPrice: 20
};

var watcher = null;

var updater = () => obj.totalPrice = obj.price * 2;

class Dep {
  constructor() {
    this.subscribers = [];
  }

  subscribe(func) {
    if (func && !this.subscribers.includes(func)) {
      this.subscribers.push(func);
    }
  }

  notify() {
    for (const subscriber of this.subscribers) {
      subscriber();
    }
  }
}

function makeReactive(obj) {
  const keys = Object.keys(obj);

  for (const key of keys) {
    let internalValue = obj[key];
    let dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        dep.subscribe(watcher);

        return internalValue;
      },

      set(value) {
        internalValue = value;

        dep.notify();

        return internalValue;
      }
    })
  }
}

function watch(updater) {
  watcher = updater;
  updater();
  watcher = null;
}

makeReactive(obj);

watch(() => obj.totalPrice = obj.price * 2);

obj.price = 20;

console.log(obj.totalPrice);

obj.price = 100;

console.log(obj.totalPrice);

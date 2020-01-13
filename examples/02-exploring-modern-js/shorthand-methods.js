// The old way
const obj = {
  log: function (text) {
    console.log(text);
  }
};

obj.log('old way');

// The new way
const newObj = {
  log(text) {
    console.log(text);
  }
};

newObj.log('new way');

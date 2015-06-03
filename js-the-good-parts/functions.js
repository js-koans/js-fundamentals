// Functions

var add = function(a, b) {
  return a + b;
};

// Invocation
// 1. Method Invocation pattern

var myObject = {
  value: 0,
  increment: function(inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment();
document.writeln(myObject.value);

myObject.increment(2);
document.writeln(myObject.value);

// 2. Function invocation pattern
myObject.double = function() {
  var that = this;
  var helper = function() {
    that.value = add(that.value, that.value);
  };
  helper();
};
myObject.double();
document.writeln(myObject.getValue());

// 3. The constructor invocation pattern

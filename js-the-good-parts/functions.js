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
document.writeln(myObject.value);

// 3. The constructor invocation pattern
var Quo = function(string) {
  this.status = string;
};

Quo.prototype.get_status = function() {
  return this.status;
};

var myQuo = new Quo('confused');
document.writeln(myQuo.get_status());

// 4. Apply invocation pattern
var array = [3, 4];
// apply method constructs an array of arguments to use to invoke a function.
// two parameters(value bound to this, array of parameters)
var sum = add.apply(null, array);

var statusObject = {
  status: 'A-Ok'
};

var status = Quo.prototype.get_status.apply(statusObject);
console.log('status', status);


// Arguments
var sum = function() {
  var i, sum = 0;
  for(i = 0; i < arguments.length; i += 1) {
    sum += arguments[i];
  }
  return sum;
};
console.log('sum', sum(4, 8, 15, 16, 23, 42));

// Exceptions
var add = function(a, b) {
  if(typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    };
  }
  return a + b;
};

var try_it = function() {
  try {
    add('seven');
  } catch(e) {
    console.log(e.name + ': ' + e.message);
  }
};
try_it();

// Augmenting Types
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

Number.method('integer', function() {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});
console.log((-10/3).integer());

String.method('trim', function() {
  return this.replace(/^\s+|\s+$/g, '');
});
console.log('"' + "     neat    ".trim() + '"');


// Add a method conditionally.
Function.prototype.method = function(name, func) {
  if(!this.prototype[name]) {
    this.prototype[name] = func;
  }
};

// Closure
var myObject = function() {
  var value = 0;
  return {
    increment: function(inc) {
      value += (typeof inc === 'number') ? inc : 1;
    },
    getValue: function() {
      return value;
    }
  }
}();

var quo = function(status) {
  return {
    get_status: function() {
      return status;
    }
  };
};
var myQuo = quo('amazed');
console.log('closure', myQuo.get_status());

var fade = function(node) {
  var level = 1;
  var step = function() {
    var hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;
    if(level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};
fade(document.body);

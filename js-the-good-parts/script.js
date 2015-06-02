// Memoization
var naive_fibonacci = function(n) {
  return (n < 2) ? n : (naive_fibonacci(n - 1) + naive_fibonacci(n - 2));
}

for(var i = 0; i <= 10; i += 1) {
	document.writeln('//' + i + ': ' + naive_fibonacci(i) + '<br>');
}

var fibonacci = function() {
  var memo = [0, 1];
  var fib = function(n) {
    var result = memo[n];
    if(typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}();

var memoizer = function(memo, fundamental) {
  var shell = function(n) {
    var result = memo[n];
    if(typeof result !== 'number') {
      result = fundamental(shell, n);
      memo[n] = result;
    }
    return result;
  };
  return shell;
};

var fibonacci = memoizer([0, 1], function(shell, n) {
  return shell(n - 1) + shell(n - 2);
});

var factorial = memoizer([1, 1], function(shell, n) {
  return n * shell(n - 1);
});

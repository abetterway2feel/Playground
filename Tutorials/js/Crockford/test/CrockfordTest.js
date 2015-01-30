var chai   = require('chai')
  , expect = chai.expect
  , should = chai.should();
var crockford = require('../src/js/crockford.js');

describe('Crockford,', function() {
	var add = crockford.add;
	var mul = crockford.mul;
	var sub = crockford.sub;
	var once = crockford.once;
	var curry = crockford.curry;
	var liftf = crockford.liftf;
	var fromTo = crockford.fromTo;
	var element = crockford.element;
	var doubl = crockford.twice(add);
	var square = crockford.twice(crockford.mul);
	var inc = curry(add, 1);
	var identity = function (arg){ return arg; }


	describe('add', function() {
		it('should add 3 to 4 and get 7', function (){
			expect(add(3, 4)).to.equal(7);
		});
	});

	describe('sub', function() {
		it('should sub 3 from 4 and get -1', function (){
			expect(sub(3, 4)).to.equal(-1);
		});
	});

	describe('mul', function() {
		it('should multiply 3 and 4 and get 12', function (){
			expect(mul(3, 4)).to.equal(12);
		});
	});

	describe('identityf', function() {
		it('should return an identity function, which returns the id value', function (){
			expect(crockford.identityf(3)()).to.equal(3);
		});
	});
	describe('identityf', function() {
		it('should return an identity function, which adds the first and second argument', function (){
			expect(crockford.addf(3)(4)).to.equal(7);
		});
	});
	describe('liftf', function() {
		it('should take a binary function and return a results', function (){
			var addf = liftf(add);
			expect(addf(3)(4)).to.equal(7);

			expect(crockford.liftf(mul)(5)(6)).to.equal(30);
		});
	});
	describe('curry', function() {
		it('should take add and 3 and return a function that adds 3 to all inputs', function (){
			var add3 = crockford.curry(add, 3);
			expect(add3(4)).to.equal(7);
			expect(add3(7)).to.equal(10);
		});
	});

	describe('inc1', function() {
		it('should inc1 should use curry to return and add 1 function', function (){
			expect(inc(5)).to.equal(6);
			expect(inc(inc(5))).to.equal(7);
		});
	});

	describe('inc2', function() {
		it('should inc1 should use liftf to return and add 1 function', function (){
			var inc = liftf(add)(1);
			expect(inc(5)).to.equal(6);
			expect(inc(inc(5))).to.equal(7);
		});
	});

	describe('inc3', function() {
		it('should inc1 should use addf to return and add 1 function', function (){
			var inc = crockford.addf(1);
			expect(inc(5)).to.equal(6);
			expect(inc(inc(5))).to.equal(7);
		});
	});

	describe('twice', function() {
		it('should take a binary function and return a unary function that passes its argument to the binary function twice', function (){			
			expect(doubl(11)).to.equal(22);
			expect(square(11)).to.equal(121);
		});
	});

	describe('reverse', function() {
		it('should reverse the arguments of a binary function', function (){
			var bus = crockford.reverse(sub);
			expect(bus(3, 2)).to.equal(-1);
		});
	});

	describe('composeu', function() {
		it('should take two unary functions and return a unary function that calls both', function (){
			var val = crockford.composeu(doubl, square);
			expect(val(5)).to.equal(100);
		});
	});

	describe('composeb', function() {
		it('should take two binary functions and return a ternary function that calls both', function (){
			var val = crockford.composeb(add, mul);
			expect(val(2,3,7)).to.equal(35);
			expect(val(100,0,1)).to.equal(100);
		});
	});

	describe('once', function() {
		it('should allows a function to only be called once', function (){
			var add_once = once(add);
			expect(add_once(3, 4)).to.equal(7);
			expect(add_once(3, 5)).to.equal(undefined);
		});
	});

	describe('fromTo', function() {
		it('should produce a generator that will produce a value in a range', function (){
			var index = fromTo(0, 3);
			expect(index()).to.equal(0);
			expect(index()).to.equal(1);
			expect(index()).to.equal(2);
			expect(index()).to.equal(undefined);
		});
	});

	describe('element', function() {
		it('should take and array and a generator and return a generator that will produce elements from the array', function (){
			var ele = element(['a', 'b', 'c', 'd'], fromTo(1, 3));

			expect(ele()).to.equal('b');
			expect(ele()).to.equal('c');;
			expect(ele()).to.equal(undefined);
		});
	});

	describe('element', function() {
		it('should have a generator as an optional param', function (){
			var ele = element(['a', 'b', 'c', 'd']);

			expect(ele()).to.equal('a');
			expect(ele()).to.equal('b');
			expect(ele()).to.equal('c');
			expect(ele()).to.equal('d');
			expect(ele()).to.equal(undefined);
		});
	});

	describe('collect', function() {
		it('should take a generator and an array and produce a function that will collect the results in the array', function (){
			var array = [], 
			    col = crockford.collect(fromTo(0,2), array);

			expect(col()).to.equal(0);
			expect(col()).to.equal(1);
			expect(col()).to.equal(undefined);
			expect(array).to.deep.equal([0, 1]);
		});
	});

	describe('filter', function() {
		it('should take a generator and a predicate that produces a generator that produces only values approved by the predicate', function (){
			var fil = crockford.filter(
						fromTo(0,5), 
				        function third(value) {
				        	return (value % 3) === 0;
				        });

			expect(fil()).to.equal(0);
			expect(fil()).to.equal(3);
			expect(fil()).to.equal(undefined);
		});
	});

	describe('concat', function() {
		it('should take two generators and produce a generator that combines the sequences', function (){
			var con = crockford.concat(fromTo(0, 3), fromTo(0,2));

			expect(con()).to.equal(0);
			expect(con()).to.equal(1);
			expect(con()).to.equal(2);
			expect(con()).to.equal(0);
			expect(con()).to.equal(1);
			expect(con()).to.equal(undefined);


		});
	});

	describe('gensymf', function() {
		it('should return a function that generates unique symbols', function (){
			var geng = crockford.gensymf("G");
			var genh = crockford.gensymf("H");
			var gen3 = crockford.gensymf(3);
			expect(geng()).to.equal('G1');
			expect(genh()).to.equal('H1');
			expect(geng()).to.equal('G2');
			expect(genh()).to.equal('H2');
			expect(gen3()).to.equal('31');
		});
	});

	describe('gensymff', function() {
		it('should take a unary function and a seed and return a gensymf', function (){
			var gensymf = crockford.gensymff(inc, 0);
			var geng = gensymf("G");
			var genh = gensymf("H");

			expect(geng()).to.equal('G1');
			expect(genh()).to.equal('H1');
			expect(geng()).to.equal('G2');
			expect(genh()).to.equal('H2');
		});
	});

	describe('fibonaccif', function() {
		it('should return a generator that will return the next fibonacci number', function (){
			var fib = crockford.fibonaccif(0, 1);

			expect(fib()).to.equal(0);
			expect(fib()).to.equal(1);
			expect(fib()).to.equal(1);
			expect(fib()).to.equal(2);
			expect(fib()).to.equal(3);
			expect(fib()).to.equal(5);
		});
	});

	describe('counter', function() {
		it('should return an object containing two functions that implement an up/down counter, hiding the counter', function (){
			var object = crockford.counter(10)
			  , next   = object.next
			  , prev   = object.prev;

			expect(next()).to.equal(11);
			expect(prev()).to.equal(10);
			expect(prev()).to.equal(9);
			expect(next()).to.equal(10);
		});
	});

	describe('revocable', function() {
		it('should take a unary function and return an object containing an invoke function than will invoke the unary function', function (){
			var object = crockford.counter(10)
			  , next   = object.next
			  , prev   = object.prev;

			expect(next()).to.equal(11);
			expect(prev()).to.equal(10);
			expect(prev()).to.equal(9);
			expect(next()).to.equal(10);
		});
	});

	describe('revocable', function() {
		it('should take a unary function and return an object containing an revoke function than disable the invoke function', function (){
			var rev = crockford.revocable(identity),
			    invoke = rev.invoke;
			expect(invoke(7)).to.equal(7);
			rev.revoke();
			expect(invoke(8)).to.equal(undefined);
		});
	});

	describe('addm', function() {
		it('should taketwo m objects and retrns an m object', function (){
			var result = JSON.stringify(crockford.addm(crockford.m(3), crockford.m(4)));

			expect(result).to.equal('{"value":7,"source":"(3+4)"}');

			result = JSON.stringify(crockford.addm(crockford.m(1), crockford.m(Math.PI, "pi")));

			expect(result).to.equal('{"value":4.141592653589793,"source":"(1+pi)"}');
		});
	});

	describe('liftm', function() {
		it('should take a binary function and string and return a function that acts on m objects', function (){
			var addm = crockford.liftm(add, "+");
			var result = JSON.stringify(addm(crockford.m(3), crockford.m(4)));
			expect(result).to.equal('{"value":7,"source":"(3+4)"}');
			var mulm = crockford.liftm(mul, "*");
			result = JSON.stringify(mulm(crockford.m(3), crockford.m(4)));
			expect(result).to.equal('{"value":12,"source":"(3*4)"}');
		});
	});

	describe('liftm', function() {
		it('should take a binary function and string and return a function that acts on m objects', function (){
			var addm = crockford.liftm(add, "+");
			var result = JSON.stringify(addm(crockford.m(3), crockford.m(4)));
			expect(result).to.equal('{"value":7,"source":"(3+4)"}');
			var mulm = crockford.liftm(mul, "*");
			result = JSON.stringify(mulm(crockford.m(3), crockford.m(4)));
			expect(result).to.equal('{"value":12,"source":"(3*4)"}');
		});
	});

	describe('liftm', function() {
		it('should also be able to accept arguments that are either number or m functions', function (){
			var addm = crockford.liftm(add, "+");
			var result = JSON.stringify(addm(3, 4));
			expect(result).to.equal('{"value":7,"source":"(3+4)"}');
		});
	});

	describe('exp', function() {
		it('should evaluate simple array expressions ', function (){
			var sae = [mul, 5, 11];
			expect(crockford.exp(sae)).to.equal(55);
			expect(crockford.exp(42)).to.equal(42);
		});
	});

	describe('exp', function() {
		it('should evaluate nested array expressions ', function (){
			var nae = [
				Math.sqrt,
				[ add,
					[square, 3],
				    [square, 4]
				]
			];
			expect(crockford.exp(nae)).to.equal(5);
		});
	});

	describe('addg', function() {
		it('should add from many invocations until it sees an empy invocation ', function (){
			expect(crockford.addg()).to.equal(undefined);
			expect(crockford.addg(2)()).to.equal(2);
			expect(crockford.addg(2)(7)()).to.equal(9);
			expect(crockford.addg(3)(0)(4)()).to.equal(7);
			expect(crockford.addg(1)(2)(4)(8)()).to.equal(15);
		});
	});

	describe('liftg', function() {
		it('should take a binary functionand apply it to many invocations', function (){
			expect(crockford.liftg(mul)()).to.equal(undefined);
			expect(crockford.liftg(mul)(2)()).to.equal(2);
			expect(crockford.liftg(mul)(2)(7)()).to.equal(14);
			expect(crockford.liftg(mul)(3)(0)(4)()).to.equal(0);
		});
	});

	describe('arrayg', function() {
		it('should build an array from many invocations', function (){
			expect(crockford.arrayg()).to.deep.equal([]);
			expect(crockford.arrayg(3)()).to.deep.equal([3]);
			expect(crockford.arrayg(3)(4)(5)()).to.deep.equal([3,4,5]);
		});
	});

	describe('continuize', function() {
		it('should take a unary function and returns a function that takes a callback and an argument', function (){
			var callback = function(value){
				expect(value).to.equal(9);
			};
			var sqrtc = crockford.continuize(Math.sqrt);
			sqrtc(callback, 81);
		});
	});
});















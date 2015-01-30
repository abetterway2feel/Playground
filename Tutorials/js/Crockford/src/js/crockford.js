var crockford = {
	add: function (first, second){
		return (first + second);
	},

	sub: function (first, second){
		return (first - second);
	},

	mul: function (first, second){
		return (first * second);
	},

	identityf: function (first){
		return function(){
			return first;
		};
	},
	addf: function(first){
		return function(second){
			return crockford.add(first, second);
		};
	},
	liftf: function(bin){
		return function(first){
			return function(second){
				return bin(first, second);
			}
		};
	},
	curry: function(binary, first){
		return function(second){
			return crockford.liftf(binary)(first)(second);
		};
	},
	twice: function(binary){
		return function(a){
			return binary(a, a);
		};
	},
	reverse: function(binary){
		return function(first, second){
			return binary(second, first);
		};
	},
	composeu: function(f, g){
		return function(a){
			return g(f(a));
		};
	},
	composeb: function(f, g){
		return function(a, b, c){
			return g(f(a, b), c);
		};
	},
	once: function(f){
		var flag = true;
		return function(a, b){
			if(flag){
				flag = false;
				return f(a,b);
			}
			return undefined;
		};
	},
	fromTo: function(from, to){
		return function(){
			var value = from;
			if(value < to){
				from += 1 ;
				return value;
			}
			return undefined;
		}; 
	},
	element: function(array, gen){
		if(gen === undefined){
			gen = crockford.fromTo(0, array.length);
		}

		return function(){
			var index = index = gen();
			if(index !== undefined){
				return array[index];
			}
			return undefined;
		};
	},
	collect: function(gen, array){
		return function(){
			var value = gen();
			if(value !== undefined){
				array.push(value);
			}
			return value;
		};
	},
	filter: function(gen, predicate){
		return function(){
			var value;
			do{
			 value = gen();
			} while(value !== undefined && !predicate(value) )
			
			return value;
		};
	},
	concat: function(gen1, gen2){
		var value = undefined;
		return function(){
			value = gen1();
			if(value !== undefined){
				return value;
			}
			return gen2();
		}
	},
	gensymf: function(prefix){
		var current = 0;
		return function(){			
			current += 1;
			return prefix +''+ current;
		}
	},
	gensymff: function(unary, seed){ 
		return function(prefix){
			var number = seed;
			return function(){
				number = unary(number);
				return prefix +''+ number;
			};
		};
	},
	fibonaccif: function(a, b){ 
		var i = 0;
		return crockford.concat(
			crockford.element([a, b]),
				function fibonacci (){
					var next = a + b;
					a = b;
					b = next;
					return next;
				});
		
	},
	counter: function(count){
		return {
			next: function(){
				count +=1
				return count;
			},
			prev: function(){
				count -=1
				return count;
			}
		};
	},
	revocable: function(unary){
		return{
			invoke: function(arg){
				return unary(arg);
			},
			revoke: function(){
				unary = function (){
					return undefined;
				}
			}
		};
	},
	m: function (value, source){
		return {
			value: value,
			source: typeof source === 'string' ? source : String(value)
		};
	},
	addm: function (m1, m2){
		return crockford.m( crockford.add(m1.value, m2.value),
							"(" + m1.source + "+" +
								  m2.source + ")");
	},
	mcheck: function(m){
		if( m.value === undefined || m.source === undefined){
			m = crockford.m(m, m);
		}
		return m;
	},
	liftm: function(binary, op){ 
		return function(m1, m2){
			m1 = crockford.mcheck(m1);
			m2 = crockford.mcheck(m2);
			return crockford.m( 
						binary(m1.value, m2.value),
						"(" + m1.source + op +
						  	  m2.source + ")");
		}

	},
	exp: function(value){
		return Array.isArray(value)
		  ? value[0](crockford.exp(value[1]), crockford.exp(value[2]))
		  : value;
	},
	addgphil: function(value){
		var result = undefined;
		return function inner(innerVal){
			if(innerVal === undefined){
				return result;
			}
			result === undefined 
				? result = innerVal 
				: result += innerVal;
			
			return inner;
		}(value);
	},
	addg: function(first){
		function more(next){
			if(next === undefined){
				return first;
			}
			first += next
			return more;
		}
		if(first !== undefined){
			return more;
		}
	},
	liftg: function(binary){
		return function(first){
			if(first === undefined){
				return first;
			}

			return function more(next){
				if(next === undefined){
					return first;
				}
				first = binary(first, next);
				return more;
			};
		}	
	},
	arrayg: function(first){
		var array = [];
		function more(next){
			if(next === undefined){
				return array;
			}
			array.push(next);
			return more;
		}
		return more(first);
	},
	arrayg:function(first){
		if(first === undefined){
			return [];
		}
		return crockford.liftg(
			function(array, value){
				array.push(value);
				return array;
			}
		)([first]);
	},
	continuize: function(unary){
		return function(callback, arg){
			return callback(unary(arg));
		};
	}

}

module.exports = crockford;
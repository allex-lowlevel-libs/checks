var expect = require('chai').expect,
  lib = require('..');

describe('Testing \'Checks\' lib', function(){
  var fn = function(){
    console.log('Testiram..');
  };
  it('isFunction', function(){
    expect(lib.isFunction(fn)).to.be.true;
    expect(lib.isFunction(undefined)).to.be.false;
    expect(lib.isFunction(null)).to.be.false;
    expect(lib.isFunction(2)).to.be.false;
    expect(lib.isFunction([1,2,3])).to.be.false;
    expect(lib.isFunction(new Array(3))).to.be.false;
    expect(lib.isFunction({a:'b'})).to.be.false;
    expect(lib.isFunction('smth')).to.be.false;
    expect(lib.isFunction(new String('smth'))).to.be.false;
    expect(lib.isFunction(true)).to.be.false;
  });
  it('isArray', function(){
    expect(lib.isArray([])).to.be.true;
    expect(lib.isArray([2,3,4])).to.be.true;
    expect(lib.isArray(new Array())).to.be.true;
    expect(lib.isArray(new Array('foo','bar'))).to.be.true;
    expect(lib.isArray(new Array(5))).to.be.true;
    expect(lib.isArray(fn)).to.be.false;
    expect(lib.isArray(undefined)).to.be.false;
    expect(lib.isArray(null)).to.be.false;
    expect(lib.isArray(2)).to.be.false;
    expect(lib.isArray({a:'b'})).to.be.false;
    expect(lib.isArray('smth')).to.be.false;
    expect(lib.isArray(new String('smth'))).to.be.false;
    expect(lib.isArray(true)).to.be.false;
  });
  it('isUndef', function(){
    var obj;
    expect(lib.isUndef(undefined)).to.be.true;
    expect(lib.isUndef(fn)).to.be.false;
    expect(lib.isUndef(null)).to.be.false;
    expect(lib.isUndef([])).to.be.false;
    expect(lib.isUndef("")).to.be.false;
    obj = { a : null };
    expect(lib.isUndef(obj.a)).to.be.false;
    delete obj.a;
    expect(lib.isUndef(obj.a)).to.be.true;
  });
  it('defined', function(){
    var obj;
    expect(lib.defined(undefined)).not.to.be.true;
    expect(lib.defined(fn)).not.to.be.false;
    expect(lib.defined(null)).not.to.be.false;
    expect(lib.defined([])).not.to.be.false;
    expect(lib.defined("")).not.to.be.false;
    obj = { a : null };
    expect(lib.defined(obj.a)).not.to.be.false;
    delete obj.a;
    expect(lib.defined(obj.a)).not.to.be.true;
  });
  it('isString', function(){
    expect(lib.isString('')).to.be.true;
    expect(lib.isString("")).to.be.true;
    expect(lib.isString('abc')).to.be.true;
    expect(lib.isString("abc")).to.be.true;
    expect(lib.isString(5 + "abc")).to.be.true;
    expect(lib.isString(new String())).to.be.true;
    expect(lib.isString(new String(5))).to.be.true;
    expect(lib.isString(new String('smth'))).to.be.true;
    expect(lib.isString(null)).to.be.false;
    expect(lib.isString(undefined)).to.be.false;
    expect(lib.isString(5)).to.be.false;
    expect(lib.isString([2,3])).to.be.false;
    expect(lib.isString({ a : 'b' })).to.be.false;
    expect(lib.isString(true)).to.be.false;
    expect(lib.isString(fn)).to.be.false;
  });
  it('isNull', function(){
    expect(lib.isNull(null)).to.be.true;
    expect(lib.isNull(undefined)).to.be.false;
    expect(lib.isNull(2)).to.be.false;
    expect(lib.isNull(true)).to.be.false;
    expect(lib.isNull([])).to.be.false;
    expect(lib.isNull({ a : 'b' })).to.be.false;
    expect(lib.isNull(new String('abc'))).to.be.false;
    expect(lib.isNull(fn)).to.be.false;
  });
  it('isNotNull', function(){
    expect(lib.isNotNull(null)).not.to.be.true;
    expect(lib.isNotNull(undefined)).not.to.be.false;
    expect(lib.isNotNull(2)).not.to.be.false;
    expect(lib.isNotNull(true)).not.to.be.false;
    expect(lib.isNotNull([])).not.to.be.false;
    expect(lib.isNotNull({ a : 'b' })).not.to.be.false;
    expect(lib.isNotNull(new String('abc'))).not.to.be.false;
    expect(lib.isNotNull(fn)).not.to.be.false;
  });
  it('isBoolean', function(){
    expect(lib.isBoolean(true)).to.be.true;
    expect(lib.isBoolean(false)).to.be.true;
    expect(lib.isBoolean(2)).to.be.false;
    expect(lib.isBoolean(null)).to.be.false;
    expect(lib.isBoolean(undefined)).to.be.false;
    expect(lib.isBoolean([])).to.be.false;
    expect(lib.isBoolean({ a : 'b' })).to.be.false;
    expect(lib.isBoolean(new String('abc'))).to.be.false;
    expect(lib.isBoolean(fn)).to.be.false;
  });
  it('isVal', function(){
    expect(lib.isVal(null)).to.be.false;
    expect(lib.isVal(undefined)).to.be.false;
    expect(lib.isVal(false)).to.be.true;
    expect(lib.isVal(2)).to.be.true;
    expect(lib.isVal([1,2,3])).to.be.true;
    expect(lib.isVal({ a : 'b' })).to.be.true;
    expect(lib.isVal(new String('abc'))).to.be.true;
    expect(lib.isVal(fn)).to.be.true;
  });
  //is this method neccessery?
  //seems to have complete same functionallity as isVal
  it('isDefinedAndNotNull', function(){
    expect(lib.isDefinedAndNotNull(null)).to.be.false;
    expect(lib.isDefinedAndNotNull(undefined)).to.be.false;
    expect(lib.isDefinedAndNotNull(false)).to.be.true;
    expect(lib.isDefinedAndNotNull(2)).to.be.true;
    expect(lib.isDefinedAndNotNull([1,2,3])).to.be.true;
    expect(lib.isDefinedAndNotNull({ a : 'b' })).to.be.true;
    expect(lib.isDefinedAndNotNull(new String('abc'))).to.be.true;
    expect(lib.isDefinedAndNotNull(fn)).to.be.true;
  });
  it('has', function(){
    var obj = {
      a : 'b',
      c : 'd'
    };
    expect(lib.has(obj,'a')).to.be.true;
    expect(lib.has(obj,'b')).to.be.false;
    expect(lib.has(obj,'c')).to.be.true;
    expect(lib.has(obj,'d')).to.be.false;
    delete obj.a;
    expect(lib.has(obj,'a')).to.be.false;
    obj.b = 'a';
    expect(lib.has(obj,'b')).to.be.true;
    obj = new String('nothing');
    expect(lib.has(obj,0)).to.be.true;
    expect(lib.has(obj,'length')).to.be.true;
    expect(lib.has(obj,'b')).to.be.false;
    obj = [1,2,3]
    expect(lib.has(obj,-1)).to.be.false;
    expect(lib.has(obj,0)).to.be.true;
    expect(lib.has(obj,1)).to.be.true;
    expect(lib.has(obj,2)).to.be.true;
    expect(lib.has(obj,3)).to.be.false;
    obj = new Array(2500);
    expect(lib.has(obj,2500)).to.be.false;
    obj[2500] = 'smth';
    expect(lib.has(obj,2500)).to.be.true;
    obj = new Number(5);
    expect(lib.has(obj,0)).to.be.false;
    expect(lib.has(obj,'length')).to.be.false;
  });
  it('isArrayOfFunctions', function(){
    var fn1 = function(){};
    var fn2 = function(){
      console.log('radim..');
    };
    var fnArr = [fn1,fn2];
    expect(lib.isArrayOfFunctions(fnArr)).to.be.true;
    fn2 = 'Not a function anymore';
    //!
    expect(lib.isArrayOfFunctions(fnArr)).to.be.true;
    fnArr = [fn1,fn2];
    expect(lib.isArrayOfFunctions(fnArr)).to.be.false;
    fnArr = [1,2,3];
    expect(lib.isArrayOfFunctions(fnArr)).to.be.false;
    fnArr = [console.log.bind(this)];
    expect(lib.isArrayOfFunctions(fnArr)).to.be.true;
    delete fnArr[0];
    //!
    expect(lib.isArrayOfFunctions(fnArr)).to.be.true;
    fnArr[0] = null;
    expect(lib.isArrayOfFunctions(fnArr)).to.be.false;
  });

  it ('isInteger', function () {
    expect(lib.isInteger (undefined)).to.be.false;
    expect(lib.isInteger (null)).to.be.false;
    expect(lib.isInteger (22)).to.be.true;
    expect(lib.isInteger (-65)).to.be.true;
    expect(lib.isInteger (432.22)).to.be.false;
    expect(lib.isInteger (-821.1233123)).to.be.false;
    expect(lib.isInteger ('1231')).to.be.true;
    expect(lib.isInteger ('-432')).to.be.true;
    expect(lib.isInteger ('bla')).to.be.false;
    expect(lib.isInteger ('')).to.be.false;
    expect(lib.isInteger(0)).to.be.true;
    expect(lib.isInteger(9999990000)).to.be.true;
  });

  it ('isNumber', function () {
    expect(lib.isNumber(parseInt(null))).to.be.false;
  });
});

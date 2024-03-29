function isFunction (val) {return 'function' === typeof(val);}
function isArray (val) {return 'object' === typeof(val) && val instanceof Array;}
function isUndef (val) {
  var nista;
  return val===nista;
}
function defined (val) {
  var nista;
  return val!==nista;
}
function isString(val) {return 'string' === typeof(val) || val instanceof String;}
function isNumber(val) {
  if (isNaN(val)) return false;
  return 'number' === typeof(val) || val instanceof Number;
}
function isNull(val) {return val === null;}
function isNotNull(val) {return val !== null;}
function isBoolean(val) {return 'boolean' === typeof(val);}
function isInteger (val) {
  if (isNaN(val)) return false;
  var x = parseFloat(val);
  return Math.round(x) === x;
}
function isVal(val) {return !(isUndef(val) || isNull(val));}
function isDefinedAndNotNull(val) {
  if (isUndef(val)) {
    return false;
  }
  return val!==null;
}
function has (obj, key) {
  var o, ret;
  if (isArrayOfStrings(key)) {
    o = obj;
    ret = key.every(has.bind(null, o))
    o = null;
    return ret;
  }
  if (isString(key)) {
    return 'object' === typeof(obj) && obj != null && hasOwnProperty.call(obj, key);
  }
  throw new Error('"has" needs a key that is either a String or Array[String]');
}

// equality handling ripped from lodash (https://github.com/lodash)
// Internal recursive comparison function for `isEqual`.
function eq(a, b, aStack, bStack) {
  var type;
  // Identical objects are equal. `0 === -0`, but they aren't identical.
  // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  // A strict comparison is necessary because `null == undefined`.
  if (a == null || b == null) return a === b;
  // `NaN`s are equivalent, but non-reflexive.
  if (a !== a) return b !== b;
  // Exhaust primitive checks
  type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
  return deepEq(a, b, aStack, bStack);
};

// Internal recursive comparison function for `isEqual`.
function deepEq (a, b, aStack, bStack) {
  // Unwrap any wrapped objects.
  var areArrays,aCtor,length,keys,key;
  var className = toString.call(a);
  if (className !== toString.call(b)) return false;
  switch (className) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    case '[object RegExp]':
    // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
    case '[object String]':
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return '' + a === '' + b;
    case '[object Number]':
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN.
      if (+a !== +a) return +b !== +b;
      // An `egal` comparison is performed for other numeric values.
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;
  }

  areArrays = className === '[object Array]';
  if (!areArrays) {
    if (typeof a != 'object' || typeof b != 'object') return false;

    // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.
    aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor &&
                             isFunction(bCtor) && bCtor instanceof bCtor)
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
  }
  // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.
  aStack = aStack || [];
  bStack = bStack || [];
  length = aStack.length;
  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) return bStack[length] === b;
  }

  // Add the first object to the stack of traversed objects.
  aStack.push(a);
  bStack.push(b);

  // Recursively compare objects and arrays.
  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length;
    if (length !== b.length) return false;
    // Deep compare the contents, ignoring non-numeric properties.
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    // Deep compare objects.
    keys = Object.keys(a);
    length = keys.length;
    // Ensure that both objects contain the same number of properties before comparing deep equality.
    if (Object.keys(b).length !== length) return false;
    while (length--) {
      // Deep compare each member
      key = keys[length];
      if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  }
  // Remove the first object from the stack of traversed objects.
  aStack.pop();
  bStack.pop();
  return true;
};


function isEqual (a,b) {
  return eq(a,b);
}

function isArrayOfHaving (arry, fn) {
  return isArray(arry) && arry.every(fn);
}
function isArrayOfStrings (arry) {
  return isArrayOfHaving(arry, isString);
}
function isArrayOfNumbers (arry) {
  return isArrayOfHaving(arry, isNumber);
}
function isArrayOfFunctions (arry) {
  return isArrayOfHaving(arry, isFunction);
}
function hasreverse (key, obj) {
  return has(obj, key);
}
function isArrayOfObjectsWithProperty (arry, propname) {
  var ret = isArrayOfHaving(arry, hasreverse.bind(null, propname));
  propname = null;
  return ret;
}
function isArrayOfObjectsWithProperties (arry, propnames) {
  var ret;
  if (!isArrayOfStrings(propnames)) {
    throw new Error('propnames provided has to be an Array[String]');
  }
  ret = isArrayOfHaving(arry, hasreverse.bind(null, propnames));
  propnames = null;
  return ret;
}
function isNonEmptyString (str) {
  return isString(str) && str.length>0;
}
function isNonEmptyArray (arry) {
  return isArray(arry) && arry.length>0;
}

module.exports =  {
  isFunction : isFunction,
  isArray: isArray,
  isUndef: isUndef,
  defined : defined,
  isDefinedAndNotNull : isDefinedAndNotNull,
  isString:isString,
  isNumber:isNumber,
  isNull: isNull,
  isNotNull:isNotNull,
  isBoolean:isBoolean,
  isVal:isVal,
  isEqual: isEqual,
  has : has,
  isInteger : isInteger,
  isArrayOfHaving: isArrayOfHaving,
  isArrayOfStrings: isArrayOfStrings,
  isArrayOfNumbers: isArrayOfNumbers,
  isArrayOfFunctions: isArrayOfFunctions,
  isArrayOfObjectsWithProperty: isArrayOfObjectsWithProperty,
  isArrayOfObjectsWithProperties: isArrayOfObjectsWithProperties,
  isNonEmptyString: isNonEmptyString,
  isNonEmptyArray: isNonEmptyArray
};

// Generated by CoffeeScript 1.12.4
var ACCESS, ADD, AND, COUNT, DELETE, DIV, DO, Datum, EQ, FILTER, GE, GET_FIELD, GT, HAS_FIELDS, LE, LIMIT, LT, MERGE, MUL, NE, NTH, OFFSETS_OF, OR, ORDER_BY, PLUCK, REPLACE, SLICE, SUB, UPDATE, WITHOUT, access, add, divide, equals, greaterOrEqual, greaterThan, i, isArray, isFalse, lessOrEqual, lessThan, merge, methods, multiply, pluck, row, seq, setType, slice, sliceArray, stopAtFalse, stopAtNotFalse, subtract, utils, without;

sliceArray = require("sliceArray");

setType = require("setType");

utils = require("./utils");

row = require("./utils/row");

seq = require("./utils/seq");

isArray = Array.isArray;

i = 1;

DO = i++;

EQ = i++;

NE = i++;

GT = i++;

LT = i++;

GE = i++;

LE = i++;

OR = i++;

AND = i++;

ADD = i++;

SUB = i++;

MUL = i++;

DIV = i++;

NTH = i++;

ACCESS = i++;

GET_FIELD = i++;

HAS_FIELDS = i++;

OFFSETS_OF = i++;

ORDER_BY = i++;

FILTER = i++;

COUNT = i++;

LIMIT = i++;

SLICE = i++;

MERGE = i++;

PLUCK = i++;

WITHOUT = i++;

REPLACE = i++;

UPDATE = i++;

DELETE = i++;

Datum = function(query, action) {
  var self;
  self = function(key) {
    return Datum(self, [ACCESS, key]);
  };
  self._db = query._db;
  self._query = query;
  if (action) {
    self._action = action;
  }
  return setType(self, Datum);
};

methods = Datum.prototype;

methods["default"] = function(value) {
  return utils["default"](Datum(this), value);
};

methods["do"] = function(callback) {
  return utils["do"](Datum(this), callback);
};

methods.eq = function() {
  return Datum(this, [EQ, sliceArray(arguments)]);
};

methods.ne = function() {
  return Datum(this, [NE, sliceArray(arguments)]);
};

methods.gt = function() {
  return Datum(this, [GT, sliceArray(arguments)]);
};

methods.lt = function() {
  return Datum(this, [LT, sliceArray(arguments)]);
};

methods.ge = function() {
  return Datum(this, [GE, sliceArray(arguments)]);
};

methods.le = function() {
  return Datum(this, [LE, sliceArray(arguments)]);
};

methods.or = function() {
  return Datum(this, [OR, sliceArray(arguments)]);
};

methods.and = function() {
  return Datum(this, [AND, sliceArray(arguments)]);
};

methods.add = function() {
  return Datum(this, [ADD, sliceArray(arguments)]);
};

methods.sub = function() {
  return Datum(this, [SUB, sliceArray(arguments)]);
};

methods.mul = function() {
  return Datum(this, [MUL, sliceArray(arguments)]);
};

methods.div = function() {
  return Datum(this, [DIV, sliceArray(arguments)]);
};

methods.nth = function(value) {
  return Datum(this, [NTH, value]);
};

methods.getField = function(value) {
  return Datum(this, [GET_FIELD, value]);
};

methods.hasFields = function(value) {
  return Datum(this, [HAS_FIELDS, sliceArray(arguments)]);
};

methods.offsetsOf = function(value) {
  return Datum(this, [OFFSETS_OF, value]);
};

methods.orderBy = function(value) {
  return Datum(this, [ORDER_BY, value]);
};

methods.filter = function(filter, options) {
  return Datum(this, [FILTER, filter, options]);
};

methods.count = function() {
  return Datum(this, [COUNT]);
};

methods.limit = function(n) {
  return Datum(this, [LIMIT, n]);
};

methods.slice = function() {
  return Datum(this, [SLICE, sliceArray(arguments)]);
};

methods.merge = function() {
  return Datum(this, [MERGE, sliceArray(arguments)]);
};

methods.without = function() {
  return Datum(this, [WITHOUT, sliceArray(arguments)]);
};

methods.pluck = function() {
  return Datum(this, [PLUCK, sliceArray(arguments)]);
};

methods.replace = function(values) {
  return Datum(this, [REPLACE, values]);
};

methods.update = function(values) {
  return Datum(this, [UPDATE, values]);
};

methods["delete"] = function() {
  return Datum(this, [DELETE]);
};

methods.run = function() {
  return Promise.resolve().then(this._run.bind(this));
};

methods.then = function(onFulfilled) {
  return this.run().then(onFulfilled);
};

methods._run = function(context) {
  var action, result;
  if (context == null) {
    context = {};
  }
  Object.assign(context, this._context);
  result = this._query._run(context);
  if (!(action = this._action)) {
    return result;
  }
  switch (action[0]) {
    case EQ:
      return equals(result, action[1]);
    case NE:
      return !equals(result, action[1]);
    case GT:
      return greaterThan(result, action[1]);
    case LT:
      return lessThan(result, action[1]);
    case GE:
      return greaterOrEqual(result, action[1]);
    case LE:
      return lessOrEqual(result, action[1]);
    case OR:
      return stopAtNotFalse(result, action[1]);
    case AND:
      return stopAtFalse(result, action[1]);
    case ADD:
      return add(result, action[1]);
    case SUB:
      return subtract(result, action[1]);
    case MUL:
      return multiply(result, action[1]);
    case DIV:
      return divide(result, action[1]);
    case NTH:
      utils.expectArray(result);
      return seq.nth(result, action[1]);
    case ACCESS:
      return access(result, action[1]);
    case GET_FIELD:
      utils.expect(result, "OBJECT");
      return utils.getField(result, action[1]);
    case HAS_FIELDS:
      utils.expect(result, "OBJECT");
      return utils.hasFields(result, action[1]);
    case OFFSETS_OF:
      utils.expectArray(result);
      return seq.offsetsOf(result, action[1]);
    case ORDER_BY:
      utils.expectArray(result);
      return seq.sort(result, action[1]);
    case FILTER:
      utils.expectArray(result);
      return seq.filter(result, action[1], action[2]);
    case COUNT:
      utils.expectArray(result);
      return result.length;
    case LIMIT:
      utils.expectArray(result);
      return seq.limit(result, action[1]);
    case SLICE:
      return slice(result, action[1]);
    case MERGE:
      return merge(result, action[1]);
    case WITHOUT:
      return without(result, action[1]);
    case PLUCK:
      return pluck(result, action[1]);
    case REPLACE:
      return null;
    case UPDATE:
      return null;
    case DELETE:
      return null;
  }
};

module.exports = Datum;

equals = function(result, args) {
  var arg, j, len;
  args = utils.resolve(args);
  for (j = 0, len = args.length; j < len; j++) {
    arg = args[j];
    if (!utils.equals(result, arg)) {
      return false;
    }
  }
  return true;
};

greaterThan = function(result, args) {
  var arg, j, len, prev;
  args = utils.resolve(args);
  prev = result;
  for (j = 0, len = args.length; j < len; j++) {
    arg = args[j];
    if (prev <= arg) {
      return false;
    }
    prev = arg;
  }
  return true;
};

lessThan = function(result, args) {
  var arg, j, len, prev;
  args = utils.resolve(args);
  prev = result;
  for (j = 0, len = args.length; j < len; j++) {
    arg = args[j];
    if (prev >= arg) {
      return false;
    }
    prev = arg;
  }
  return true;
};

greaterOrEqual = function(result, args) {
  var arg, j, len, prev;
  args = utils.resolve(args);
  prev = result;
  for (j = 0, len = args.length; j < len; j++) {
    arg = args[j];
    if (prev < arg) {
      return false;
    }
    prev = arg;
  }
  return true;
};

lessOrEqual = function(result, args) {
  var arg, j, len, prev;
  args = utils.resolve(args);
  prev = result;
  for (j = 0, len = args.length; j < len; j++) {
    arg = args[j];
    if (prev > arg) {
      return false;
    }
    prev = arg;
  }
  return true;
};

isFalse = function(value) {
  return (value === null) || (value === false);
};

stopAtNotFalse = function(result, args) {
  var arg, j, len;
  args = utils.resolve(args);
  if (!isFalse(result)) {
    return result;
  }
  for (j = 0, len = args.length; j < len; j++) {
    arg = args[j];
    if (!isFalse(arg)) {
      return arg;
    }
  }
  return args.pop();
};

stopAtFalse = function(result, args) {
  var arg, j, len;
  args = utils.resolve(args);
  if (isFalse(result)) {
    return result;
  }
  for (j = 0, len = args.length; j < len; j++) {
    arg = args[j];
    if (isFalse(arg)) {
      return arg;
    }
  }
  return args.pop();
};

add = function(result, args) {
  var arg, j, len, total;
  utils.expect(result, "NUMBER");
  args = utils.resolve(args);
  total = result;
  for (j = 0, len = args.length; j < len; j++) {
    arg = args[j];
    utils.expect(arg, "NUMBER");
    total += arg;
  }
  return total;
};

subtract = function(result, args) {
  var arg, j, len, total;
  utils.expect(result, "NUMBER");
  args = utils.resolve(args);
  total = result;
  for (j = 0, len = args.length; j < len; j++) {
    arg = args[j];
    utils.expect(arg, "NUMBER");
    total -= arg;
  }
  return null;
};

multiply = function(result, args) {
  var arg, j, len, total;
  utils.expect(result, "NUMBER");
  args = utils.resolve(args);
  total = result;
  for (j = 0, len = args.length; j < len; j++) {
    arg = args[j];
    utils.expect(arg, "NUMBER");
    total *= arg;
  }
  return null;
};

divide = function(result, args) {
  var arg, j, len, total;
  utils.expect(result, "NUMBER");
  args = utils.resolve(args);
  total = result;
  for (j = 0, len = args.length; j < len; j++) {
    arg = args[j];
    utils.expect(arg, "NUMBER");
    total /= arg;
  }
  return null;
};

access = function(result, key) {
  var keyType, resultType;
  if (utils.isQuery(key)) {
    key = key._run();
  }
  keyType = utils.typeOf(key);
  if (keyType === "NUMBER") {
    utils.expectArray(result);
    return seq.nth(result, key);
  }
  if (keyType !== "STRING") {
    throw Error("Expected NUMBER or STRING as second argument to `bracket` but found " + keyType);
  }
  resultType = utils.typeOf(result);
  if (resultType === "ARRAY") {
    return seq.access(result, key);
  }
  if (resultType === "OBJECT") {
    return utils.getField(result, key);
  }
  throw Error("Expected ARRAY or OBJECT as first argument to `bracket` but found " + resultType);
};

slice = function(result, args) {
  var resultType;
  resultType = utils.typeOf(result);
  if (resultType === "ARRAY") {
    return seq.slice(result, action[1]);
  }
  if (resultType === "BINARY") {
    throw Error("`slice` does not support BINARY values (yet)");
  }
  if (resultType === "STRING") {
    throw Error("`slice` does not support STRING values (yet)");
  }
  throw Error("Expected ARRAY, BINARY, or STRING, but found " + resultType);
};

merge = function(result, args) {
  var resultType;
  resultType = utils.typeOf(result);
  if (resultType === "OBJECT") {
    return utils.merge(result, utils.resolve(args));
  }
  if (resultType === "ARRAY") {
    return seq.merge(result, args);
  }
  throw Error("Expected ARRAY or OBJECT but found " + resultType);
};

without = function(result, args) {
  var resultType;
  resultType = utils.typeOf(result);
  if (resultType === "OBJECT") {
    return utils.without(result, utils.resolve(args));
  }
  if (resultType === "ARRAY") {
    return seq.without(result, args);
  }
  throw Error("Expected ARRAY or OBJECT but found " + resultType);
};

pluck = function(result, args) {
  var resultType;
  resultType = utils.typeOf(result);
  if (resultType === "OBJECT") {
    return utils.pluck(result, utils.resolve(args));
  }
  if (resultType === "ARRAY") {
    return seq.pluck(result, args);
  }
  throw Error("Expected ARRAY or OBJECT but found " + resultType);
};
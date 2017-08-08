// Generated by CoffeeScript 1.12.4
var define, setKind, setType, utils;

setKind = require("setKind");

setType = require("setType");

utils = require("./utils");

define = Object.defineProperty;

module.exports = function(Query) {
  var Result, evalQuery, getResult, methods;
  Result = function(parent) {
    var self;
    self = function(key) {
      return self.bracket(key);
    };
    self._db = parent._db;
    self._parent = parent;
    return setType(self, Result);
  };
  setKind(Result, Query);
  methods = {};
  methods._do = function(callback) {
    var query;
    query = callback(this);
    if (!utils.isQuery(query)) {
      query = Query._expr(query);
    }
    this._query = query;
    return this;
  };
  methods._eval = evalQuery = function(ctx) {
    var result;
    this._result = this._parent._eval(ctx);
    if (/TABLE|SEQUENCE/.test(ctx.type)) {
      throw Error("Expected type DATUM but found " + ctx.type);
    }
    this._context = ctx;
    this._eval = getResult;
    result = this._query._eval({});
    this._eval = evalQuery;
    delete this._result;
    delete this._context;
    return result;
  };
  getResult = function(ctx) {
    Object.assign(ctx, this._context);
    return this._result;
  };
  Object.keys(methods).forEach(function(key) {
    return define(Result.prototype, key, {
      value: methods[key],
      writable: true
    });
  });
  return Result;
};
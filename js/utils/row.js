// Generated by CoffeeScript 1.12.4
var assertType, indexOf, row, utils;

assertType = require("assertType");

utils = require(".");

row = exports;

row.replace = function(db, context, row, values) {
  var rowId, rowIndex, table, tableId;
  tableId = context.tableId, rowId = context.rowId, rowIndex = context.rowIndex;
  if (values === void 0) {
    throw Error("Argument 1 to replace may not be `undefined`");
  }
  values = utils.resolve(values);
  table = db._tables[tableId];
  if (values === null) {
    if (row === null) {
      return {
        skipped: 1
      };
    }
    table.splice(rowIndex, 1);
    return {
      deleted: 1
    };
  }
  if ("OBJECT" !== utils.typeOf(values)) {
    throw Error("Inserted value must be an OBJECT (got " + (utils.typeOf(values)) + ")");
  }
  if (!values.hasOwnProperty("id")) {
    throw Error("Inserted object must have primary key `id`");
  }
  if (values.id !== rowId) {
    throw Error("Primary key `id` cannot be changed");
  }
  if (row === null) {
    table.push(utils.clone(values));
    return {
      inserted: 1
    };
  }
  if (utils.equals(row, values)) {
    return {
      unchanged: 1
    };
  }
  table[rowIndex] = utils.clone(values);
  return {
    replaced: 1
  };
};

row.update = function(row, values) {
  if (values === void 0) {
    throw Error("Argument 1 to update may not be `undefined`");
  }
  if (!row) {
    return {
      skipped: 1
    };
  }
  if (utils.isQuery(values)) {
    values = values._run();
    if (values !== null) {
      assertType(values, Object);
    }
  } else if (values !== null) {
    assertType(values, Object);
    values = utils.resolve(values);
  }
  if (values && utils.update(row, values)) {
    return {
      replaced: 1
    };
  }
  return {
    unchanged: 1
  };
};

row["delete"] = function(db, tableId, row) {
  var table;
  assertType(tableId, String);
  if (!row) {
    return {
      skipped: 1
    };
  }
  table = db._tables[tableId];
  table.splice(table.indexOf(row), 1);
  return {
    deleted: 1
  };
};

indexOf = function(table, rowId) {
  var index;
  index = -1;
  while (++index < table.length) {
    if (table[index].id === rowId) {
      return index;
    }
  }
  return -1;
};
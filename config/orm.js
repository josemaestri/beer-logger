var connection = require('./connection.js');


function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}


var orm = {
  selectAll: function(table, cb){
    var str = 'SELECT * FROM ';
    var str = str + table;
    var str = str + ';';

    console.log(str);
    
    connection.query(str,function(err,data){
      if(err) throw err;
      cb(data);
    });
  },
  insertOne: function(table, cols, vals, cb){
    var str = 'INSERT INTO ';
    var str = str + table;
    var str = str + ' (';
    var str = str + cols.toString();
    var str = str + ') ';
    var str = str + 'VALUES (';
    var str = str + printQuestionMarks(vals.length);
    var str = str + ');';
    console.log(str);

    connection.query(str,vals,function(err,data){
      if(err) throw err;
      cb(data);
    });
  },
  updateOne: function(table, objColVals, condition, cb){
    var str = 'UPDATE ';
    var str = str + table;
    var str = str + ' SET ';
    var str = str + objToSql(objColVals);
    var str = str + ' WHERE ';
    var str = str + condition;
    var str = str + ';';
    
    console.log(str);

    connection.query(str,function(err,data){
      if(err) throw err;
      cb(data);
    });
  }
};

module.exports = orm;
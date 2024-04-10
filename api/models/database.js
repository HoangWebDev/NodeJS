var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "asm_node",
  multipleStatements: true,
});
db.connect(function (err) {
  if (err) {
    console.log("Lỗi kết nối database " + err);
    db.end();
  } else {
    console.log("Đã kết nối database");
  }
});
module.exports = db;

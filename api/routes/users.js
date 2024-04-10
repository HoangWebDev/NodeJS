var db = require("../models/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let secret = "techphone";
const saltRounds = 10; //Số lần băm pass
const maxAge = 3 * 60 * 60 * 1000; //3h Thời gian lưu token

var express = require("express");
var router = express.Router();

/* GET users listing. */
//Router API
router.post("/register", function (req, res) {
  let ho = req.body.ho;
  let ten = req.body.ten;
  let username = req.body.tai_khoan;
  let password = req.body.mat_khau;
  let email = req.body.email;

  let sql = "INSERT INTO users SET ?";
  bcrypt.hash(password, saltRounds, function (err, hash) {
    let user_info = {
      ho: ho,
      ten: ten,
      tai_khoan: username,
      mat_khau: hash,
      email: email,
    };
    db.query(sql, user_info, function (err, data) {
      if (err) {
        res.status(400).json({ ThongBao: `Lỗi ${err}` });
        return;
      }
      let id = data.insertId;
      res.status(201).json({ ThongBao: "Đăng ký thành công" });
    });
  });
});

//!Login
router.post("/login", async (req, res) => {
  let username = (req.body.tai_khoan + "").trim();
  let pass_formuser = (req.body.mat_khau + "").trim();
  if (username == "" || pass_formuser == "") {
    res.status(400).json({ ThongBao: "Vui lý nhap day du thong tin" });
    return;
  }
  let sql = `SELECT * FROM users WHERE tai_khoan = ?`;
  db.query(sql, username, async (err, data) => {
    if (err) {
      res.status(500).json({ ThongBao: `Lỗi ${err}` });
      return;
    }
    let user = data[0];
    console.log(user);
    if (user == undefined) {
      res.status(404).json({ ThongBao: "Khong tim thay user" });
      return;
    }
    let check = await bcrypt.compare(pass_formuser, user.mat_khau);
    if (check == false) {
      res.status(405).json({ ThongBao: "Sai mat khau" });
      return;
    }
    const token = jwt.sign(
      {
        id: user.id,
        tai_khoan: user.tai_khoan,
        role: user.role,
      },
      secret,
      { expiresIn: maxAge }
    );
    console.log(token);
    res.setHeader("Authorization", "Bearer " + token);
    res.status(200).json({ ThongBao: "Dang nhap thanh cong", user: user.id });
  });
});

module.exports = router;

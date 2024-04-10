var db = require("../models/database");
var express = require("express");
var router = express.Router();

/* GET Page Of Product. */
//!Sản phẩm
router.get("/sp", function (req, res) {
  let sql = `
    SELECT * FROM san_pham
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Sản phẩm mới
router.get("/spmoi/:sosp", function (req, res) {
  if (isNaN(req.params.sosp) == true) {
    res.json({ ThongBao: "Sai tham số" });
    return;
  }
  let sosp = Number(req.params.sosp);
  if (sosp <= 0) sosp = 10;
  let sql = `
    SELECT * FROM san_pham LIMIT 0, ${sosp}
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Sản phẩm xem nhiều
router.get("/spxemnhieu/:sosp", function (req, res) {
  if (isNaN(req.params.sosp) == true) {
    res.json({ ThongBao: "Sai tham số" });
    return;
  }
  let sosp = Number(req.params.sosp);
  if (sosp <= 0) sosp = 10;
  let sql = `
    SELECT * FROM san_pham ORDER BY xem DESC LIMIT 0, ${sosp}
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Sản phẩm hot
router.get("/sphot/:sosp", function (req, res) {
  if (isNaN(req.params.sosp) == true) {
    res.json({ ThongBao: "Sai tham số" });
    return;
  }
  let sosp = Number(req.params.sosp);
  if (sosp <= 0) sosp = 10;
  let sql = `
    SELECT * FROM san_pham WHERE hot = 1 ORDER BY ngay DESC LIMIT 0, ${sosp}
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Chi tiết sản phẩm
router.get("/sp/:id", function (req, res) {
  let id = req.params.id;
  let sql = `
  SELECT * FROM san_pham WHERE id = ${id};
  SELECT * FROM thuoc_tinh WHERE id_sp = ${id};
  `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else {
      let sp = data[0][0];
      let thong_tin = data[1][0];
      let obj = Object.assign(sp, thong_tin);
      res.json(obj);
    }
  });
});

//!Sản phẩm id loại và id danh mục
router.get("/sp/:id_loai/:id_danhmuc", function (req, res) {
  let id_loai = req.params.id_loai;
  let id_danhmuc = req.params.id_danhmuc;
  // console.log("tao nè", id_danhmuc);
  let sql = `
    SELECT * FROM san_pham WHERE an_hien = 1 AND id_loai = ${id_loai} AND id_danh_muc = ${id_danhmuc};
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else {
      res.json(data);
    }
  });
});

//!Sản phẩm theo danh mục
router.get("/sp_danhmuc/:id", function (req, res) {
  let id = req.params.id;
  // console.log("tao nè", id);
  let sql = `
    SELECT * FROM san_pham WHERE an_hien = 1 AND id_danh_muc = ${id};    
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Sản phẩm theo loại
router.get("/sp_loai/:id", function (req, res) {
  let id = req.params.id;
  // console.log("tao nè", id);

  let sql = `
    SELECT * FROM san_pham WHERE an_hien = 1 AND id_loai = ${id};    
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Tìm kiếm sản phẩm
router.get("/sp/search/:key", function (req, res) {
  let key = req.params.key;
  let keysearch = key.toLowerCase();
  let sql = `
      SELECT * FROM san_pham WHERE an_hien = 1 AND ten_sp LIKE '%${keysearch}%' ORDER BY ngay DESC;
      `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

/* GET Page Of Category. */
//!Danh mục
router.get("/danhmuc", function (req, res) {
  let sql = `
    SELECT * FROM danh_muc;
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Danh mục theo id
router.get("/danhmuc/:id", function (req, res) {
  let id = req.params.id;
  let sql = `
  SELECT * FROM danh_muc WHERE id = ${id};
  `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

/* GET Page Of Kind. */
//!Loại
router.get("/loai", function (req, res) {
  let sql = `
    SELECT * FROM loai;
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Loại theo id
router.get("/loai/:id", function (req, res) {
  let id = req.params.id;
  let sql = `
  SELECT * FROM loai WHERE id = ${id};
  `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Loại theo id và id danh mục
router.get("/loai/:id/:id_danhmuc", function (req, res) {
  let id = req.params.id;
  let id_danhmuc = req.params.id_danhmuc;
  let sql = `
  SELECT * FROM loai WHERE id = ${id} AND id_danh_muc = ${id_danhmuc};
  `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Loại theo id danh mục
router.get("/loai_danhmuc/:id", function (req, res) {
  let id = req.params.id;
  let sql = `
  SELECT * FROM loai WHERE id_danh_muc = ${id};
  `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//! Đơn hàng
router.get("/don_hang/:id", function (req, res) {
  let id = req.params.id;
  let sql = `
  SELECT * FROM don_hang WHERE id = ${id};
  `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});
router.post("/don_hang", function (req, res) {
  let data = req.body;
  let sql = `
  INSERT INTO don_hang SET ?
  `;
  db.query(sql, data, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Đơn hàng chi tiết
router.post("/don_hang_chi_tiet", function (req, res) {
  let data = req.body;
  let sql = `
    INSERT INTO don_hang_chi_tiet SET ?
    `;
  db.query(sql, data, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

router.get("/don_hang_chi_tiet/:id", function (req, res) {
  let id = req.params.id;
  let sql = `
  SELECT * FROM don_hang_chi_tiet WHERE id_dh = ${id};
  `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

module.exports = router;

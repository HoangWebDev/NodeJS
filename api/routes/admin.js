const { adminAuth, userAuth } = require("../auth.js");
var db = require("../models/database");
var express = require("express");
var router = express.Router();

//Router API Middleware
/* Admin Sản Phẩm */
//!Admin list sản phẩm
router.get("/sp", adminAuth, function (req, res) {
  let limit = ``;
  if (req.query._limit != undefined && isNaN(req.query._limit) == false) {
    let sosp = Number(req.query._limit);
    if (sosp <= 0) sosp = 10;
    limit = ` LIMIT 0, ${sosp}`;
  }
  let sort = ``;
  if (req.query._sort != undefined) {
    let str = req.query._sort;
    sort = ` ORDER BY ${str} ASC`;
  }
  let sql = `
    SELECT * FROM san_pham ${sort} ${limit}
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin chi tiết sản phẩm
router.get("/sp/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lỗi thoát hàm
    res.json({ ThongBao: `Sản phẩm ${id} không tồn tại` });
    return; //Thoát khỏi hàm
  }
  let sql = `
    SELECT * FROM san_pham WHERE id = ${id};
    SELECT * FROM thuoc_tinh WHERE id_sp = ${id};
    `; //date_format(ngay, '%d-%m-%Y')
  db.query(sql, (err, data) => {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else if (data[0].length == 0)
      res.json({ ThongBao: `Sản phẩm ${id} không tìm thấy` });
    else {
      let sp = data[0][0];
      let thong_tin = data[1][0];
      let obj = Object.assign(sp, thong_tin);
      res.json(obj);
    }
  });
});

//!Admin sản phẩm theo loại
router.get("/loai/:id_loai/sp", adminAuth, function (req, res) {
  let id = req.params.id_loai;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Loại ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
    SELECT * FROM san_pham WHERE id_loai = ${id}
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin sản phẩm theo danh mục
router.get("/dm/:id_dm/sp", adminAuth, function (req, res) {
  let id = req.params.id_dm;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Danh mục ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
    SELECT * FROM san_pham WHERE id_danh_muc = ${id}
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin sản phẩm theo danh mục và loại
router.get("/dm/:id_dm/loai/:id_loai/sp", adminAuth, function (req, res) {
  let id_dm = req.params.id_dm;
  let id_loai = req.params.id_loai;
  if (isNaN(id_dm) == true || isNaN(id_loai) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({
      ThongBao: `Danh mục ${id_dm} và Loại ${id_loai} không tồn tại`,
    });
    return; //Thoát khởi hàm
  }
  let sql = `
    SELECT * FROM san_pham WHERE id_danh_muc = ${id_dm} AND id_loai = ${id_loai}
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin thêm sản phẩm
router.post("/sp", adminAuth, function (req, res) {
  let data = req.body;
  let sql = `
    INSERT INTO san_pham SET ?
    `;
  db.query(sql, data, (err, data) => {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin sua thong tin san pham
router.put("/sp/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Sản phẩm ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let data = req.body;
  let sql = `
    UPDATE san_pham SET ? WHERE id = ${id}
    `;
  db.query(sql, data, (err, data) => {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin xóa san pham
router.delete("/sp/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Sản phẩm ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
        DELETE FROM san_pham WHERE id = ${id}
        `;
  db.query(sql, (err, data) => {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

/* Admin Thuoc Tinh */
//!Admin thuộc tính theo sản phẩm
router.get("/sp/:id/tt", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Sản phẩm ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
    SELECT * FROM thuoc_tinh WHERE id_sp = ${id}
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

/* Admin Danh Muc */
//!Admin list danh mục
router.get("/dm", adminAuth, function (req, res) {
  let sql = `
    SELECT * FROM danh_muc
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin chi tiết danh mục
router.get("/dm/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Danh mục ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
    SELECT * FROM danh_muc WHERE id = ${id}
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin thêm danh mục
router.post("/dm", adminAuth, function (req, res) {
  let data = req.body;
  let sql = `
    INSERT INTO danh_muc SET ?
    `;
  db.query(sql, data, (err, data) => {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin sua thong tin danh mục
router.put("/dm/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Danh mục ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let data = req.body;
  let sql = `
    UPDATE danh_muc SET ? WHERE id = ${id}
    `;
  db.query(sql, data, (err, data) => {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin xóa danh mục
router.delete("/dm/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Danh mục ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
        DELETE FROM danh_muc WHERE id = ${id}
        `;
  db.query(sql, (err, data) => {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

/* Admin Loại */
//! Admin list loại
router.get("/loai", adminAuth, function (req, res) {
  let sql = `
    SELECT * FROM loai
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin chi tiết loại
router.get("/loai/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Loại ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
    SELECT * FROM loai WHERE id = ${id}
  `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin thêm loại
router.post("/loai", adminAuth, function (req, res) {
  let data = req.body;
  let sql = `
    INSERT INTO loai SET ?
    `;
  console.log(data);
  db.query(sql, data, (err, data) => {
    console.log(data);
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin sửa loại
router.put("/loai/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Loại ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let data = req.body;
  let sql = `
    UPDATE loai SET ? WHERE id = ${id}
    `;
  db.query(sql, data, (err, data) => {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin xóa loại
router.delete("/loai/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Loại ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
        DELETE FROM loai WHERE id = ${id}
        `;
  db.query(sql, (err, data) => {
    console.log(data);
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin loại theo danh mục
router.get("/dm/:id/loai", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Danh mục ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
    SELECT * FROM loai WHERE id_danh_muc = ${id}
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin đơn hàng
router.get("/donhang", adminAuth, function (req, res) {
  let sql = `
    SELECT * FROM don_hang
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin chi tiết đơn hàng
router.get("/donhang/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Đơn hàng ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
    SELECT * FROM don_hang WHERE id = ${id}
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin xóa đơn hàng
router.delete("/donhang/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Đơn hàng ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
        DELETE FROM don_hang WHERE id = ${id}
        `;
  db.query(sql, (err, data) => {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin xóa đơn hàng chi tiết
router.delete("/donhangchitiet/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Đơn hàng ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
        DELETE FROM don_hang_chi_tiet WHERE id = ${id}
        `;
  db.query(sql, (err, data) => {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});

//!Admin lấy đơn hàng chi tiết từ đơn hàng
router.get("/donhangchitiet/:id", adminAuth, function (req, res) {
  let id = req.params.id;
  if (isNaN(id) == true) {
    //Kiểm tra id là chữ báo lệ thoát hàm
    res.json({ ThongBao: `Đơn hàng ${id} không tồn tại` });
    return; //Thoát khởi hàm
  }
  let sql = `
    SELECT * FROM don_hang_chi_tiet WHERE id_dh = ${id}
    `;
  db.query(sql, function (err, data) {
    if (err) res.json({ ThongBao: `Lỗi truy vấn CSDL ${err}` });
    else res.json(data);
  });
});
module.exports = router;

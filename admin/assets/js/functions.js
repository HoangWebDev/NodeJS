//!Class danh mục
class danh_muc {
  constructor(id, ten_danh_muc) {
    this.id = id;
    this.ten_danh_muc = ten_danh_muc;
  }
}

//!Class sản phẩm
class san_pham {
  constructor(id, id_danh_muc, id_loai, tên, giá, giảm, hình, ngày, hot = 0) {
    this.id = id;
    this.id_danh_muc = id_danh_muc;
    this.id_loai = id_loai;
    this.ten_sp = tên;
    this.gia = giá;
    this.giam_gia = giảm;
    this.hinh = hình;
    this.ngay = ngày;
    this.hot = hot;
  }
}

//!Class thuộc tính
class thuoc_tinh {
  constructor(id, id_sp, ram, dia, sim, blue_tooth, pin) {
    this.id = id;
    this.id_sp = id_sp;
    this.ram = ram;
    this.dia = dia;
    this.sim = sim;
    this.blue_tooth = blue_tooth;
    this.pin = pin;
  }
}

//! Pagination
let parPage = 10;
let currentPage = 1;

//!Lấy token
const laytoken = () => {
  let token = sessionStorage.getItem("token");
  if (token != null) return token;
  alert("Bạn phải đăng nhập!");
  window.location.href = "../login.html";
  return null;
};

//! Table danh mục
const ds_danh_muc = () => {
  let token = laytoken();
  let opt = {
    headers: {
      Authorization: token,
    },
  };
  fetch("http://localhost:3000/admin/dm", opt)
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((dm_arr) => {
      let str = ``;
      let beginGet = parPage * (currentPage - 1);
      let endGet = parPage * currentPage - 1;
      dm_arr.forEach((dm, key) => {
        let { id, ten_danh_muc } = dm;
        // let obj = new danh_muc(id, ten_danh_muc);
        if (key >= beginGet && key <= endGet) {
          str += `<tr>
              <td>${id}</td>
              <td>${ten_danh_muc}</td>
              <td>
                <a href="./sua_dm.html?id=${id}" class="btn btn-update">Sửa</a>
                <button onclick="xoa_dm('${id}')" class="btn btn-delete">Xóa</button>
              </td>
            </tr>`;
        }
      });
      listPage();
      document.querySelector("#ds_danh_muc").innerHTML = `
      <a href="./them_dm.html" class="add_product">Thêm</a>
      <table id="example" class="table">
        <thead>
          <tr>
            <th>Mã danh mục</th>
            <th>Tên sản phẩm</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody id="tbody">
          ${str}
        </tbody>
      </table>`;
    });
};

//! Table danh sách sản phẩm
const dssan_pham = () => {
  let token = sessionStorage.getItem("token");
  let opt = {
    headers: {
      Authorization: token,
    },
  };
  fetch(`http://localhost:3000/admin/sp`, opt)
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((sp_arr) => {
      let str = ``;
      let beginGet = parPage * (currentPage - 1);
      let endGet = parPage * currentPage - 1;
      let tdm = ``;
      let tlm = ``;
      sp_arr.forEach((sp, key) => {
        fetch(`http://localhost:3000/admin/dm/${sp.id_danh_muc}`, opt)
          .then(async (r) => {
            if (r.status == 401) {
              let str = r.statusText + "\n" + JSON.stringify(await r.json());
              alert("Lỗi: " + str);
              window.location.href = "../login.html";
            } else return r.json();
          })
          .then((d) => {
            d.find((e) => e.id == sp.id_danh_muc);
            d.forEach((e) => {
              tdm = e.ten_danh_muc;
            });
            fetch(`http://localhost:3000/admin/loai/${sp.id_loai}`, opt)
              .then(async (r) => {
                if (r.status == 401) {
                  let str =
                    r.statusText + "\n" + JSON.stringify(await r.json());
                  alert("Lỗi: " + str);
                  window.location.href = "../login.html";
                } else return r.json();
              })
              .then((l) => {
                l.find((e) => e.id == sp.id_loai);
                l.forEach((e) => {
                  tlm = e.ten_loai;
                });
              });
            let {
              id,
              id_danh_muc,
              id_loai,
              ten_sp,
              gia,
              giam_gia,
              hinh,
              ngay,
              hot,
            } = sp;
            let obj = new san_pham(
              id,
              id_danh_muc,
              id_loai,
              ten_sp,
              gia,
              giam_gia,
              hinh,
              ngay,
              hot
            );
            if (key >= beginGet && key <= endGet) {
              str += tbody_table(obj, tdm);
            }
            listPage();
            document.querySelector("#ds_sanpham").innerHTML = `
            <a href="./them_sp.html" class="add_product">Thêm</a>
            <table id="example" class="table">
              <thead>
                <tr>
                  <th>Mã sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Giảm Giá</th>
                  <th>Danh Mục</th>            
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody id="tbody">
                ${str}
              </tbody>
            </table>`;
          });
      });
    });
};

//! Pagination (Phân trang)
function listPage() {
  let count = Math.ceil(52 / parPage);
  document.querySelector("#pagination").innerHTML = "";

  if (currentPage != 1) {
    let prev = document.createElement("li");
    prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
    prev.setAttribute("onclick", `changePage(${currentPage - 1})`);
    document.querySelector("#pagination").appendChild(prev);
  }

  for (let i = 1; i <= count; i++) {
    let newPage = document.createElement("li");
    newPage.innerText = i;
    if (i == currentPage) {
      newPage.classList.add("active");
    }
    newPage.setAttribute("onclick", `changePage(${i})`);
    document.querySelector("#pagination").appendChild(newPage);
  }

  if (currentPage != count) {
    let next = document.createElement("li");
    next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
    next.setAttribute("onclick", `changePage(${currentPage + 1})`);
    document.querySelector("#pagination").appendChild(next);
  }
}
function changePage(i) {
  currentPage = i;
  dssan_pham();
}

//! Hiện tbody
const tbody_table = (sp, tdm) =>
  ` <tr>
      <td>${sp.id}</td>
      <td class='img-item'><img src="../assets${sp.hinh}" alt="" /></td>
      <td>
        <h4>${sp.ten_sp}</h4>
      </td>
      <td>
        <span class="price">${Number(sp.gia).toLocaleString("Vi")} VNĐ</span>
      </td>
      <td>${sp.giam_gia}%</td>
      <td>${tdm}</td>      
      <td>
      <a href="./sua_sp.html?id=${sp.id}" class="btn btn-update">Sửa</a>
      <button onclick="xoa_sp('${sp.id}')" class="btn btn-delete">Xóa</button>
      </td>
    </tr>`;

//Thêm danh mục
const form_them_dm = () => {
  let token = laytoken();
  let str = `
  <div class="add_product">      
            <form action="" method="post" enctype="multipart/form-data">                
                <div class="group_input">
                    <label for="Ten_dm">Tên Danh Mục</label>
                    <input type="text" placeholder="Tên Danh Mục" name="Ten_dm" id="ten_dm">
                    <div class="error"></div>
                </div>
                <div class="group_btn">
                    <button type="button" class="btn" onclick="them_dm()">Thêm</button>
                    <button type="reset" class="btn btntp">Nhập Lại</button>
                </div>
            </form>
    </div>
  `;
  document.querySelector("#them_dm").innerHTML = str;
};

//! Thêm danh mục
const them_dm = () => {
  let token = laytoken();
  let ten_dm = document.getElementById("ten_dm").value;

  if (ten_dm == "") {
    document.querySelector(".error").innerHTML =
      "Vui lòng điền đầy đủ thông tin";

    // Thêm lệnh điều hướng khi người dùng không nhập tên
    return;
  }

  let data = {
    ten_danh_muc: ten_dm,
  };

  let opt = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Authorization: token },
  };
  fetch(`http://localhost:3000/admin/dm`, opt)
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((dm) => {
      window.location.href = "ds_danhmuc.html";
    })
    .catch((err) => {
      console.error(err);
      // Thêm lệnh điều hướng khi gặp lỗi
      location.href = "them_dm.html";
    });
};

//! Sửa danh mục
const form_sua_dm = async (id_danh_muc) => {
  let token = laytoken();
  let opt = {
    headers: { Authorization: token },
  };
  let danh_muc = await fetch(
    `http://localhost:3000/admin/dm/${id_danh_muc}`,
    opt
  )
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((dm) => dm);
  let str = `
  <div class="add_product">      
            <form>                
                <div class="group_input">
                    <label for="Ten_dm">Tên Danh Mục</label>
                    <input type="text" placeholder="Tên Danh Mục" name="Ten_dm" id="ten_dm" value="${danh_muc[0].ten_danh_muc}">
                    <div class="error"></div>
                </div>
                <div class="group_btn">
                    <button type="button" class="btn" onclick="update_dm('${danh_muc[0].id}')">Cập nhật</button>
                    <button type="reset" class="btn btntp">Nhập Lại</button>
                </div>
            </form>
    </div>
  `;
  document.querySelector("#sua_dm").innerHTML = str;
};

//! Sửa danh mục
const update_dm = (id_danh_muc) => {
  let token = laytoken();
  let ten_dm = document.getElementById("ten_dm").value;

  if (ten_dm == "") {
    document.querySelector(".error").innerHTML = "Vui lý nhập tên danh mục";
    return;
  }
  let data = {
    id: id_danh_muc,
    ten_danh_muc: ten_dm,
  };
  let opt = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Authorization: token },
  };
  fetch(`http://localhost:3000/admin/dm/${id_danh_muc}`, opt)
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((dm) => {
      location.href = "ds_danhmuc.html";
    })
    .catch((err) => {
      console.error(err);
    });
};

//!Xóa danh mục
const xoa_dm = async (id_danh_muc) => {
  //?Kiểm tra xem người dùng muốn xóa hay không
  if (!confirm("Bạn có chắc muốn xóa danh mục này?")) {
    return;
  }

  await fetch(`http://localhost:3000/admin/dm/${id_danh_muc}`, {
    method: "DELETE",
    headers: { Authorization: laytoken() },
  })
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((dm) => {
      confirm("Bạn đã xóa danh mục này!");
      window.location.reload();
    });
};

//! Thêm sản phẩm
const form_them_sp = () => {
  let token = laytoken();
  let opt = {
    headers: {
      Authorization: token,
    },
  };
  //? Yêu cầu fetch danh mục
  fetch("http://localhost:3000/admin/dm", opt)
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((dm_arr) => {
      let ten_dm = ``;
      dm_arr.forEach((dm) => {
        let { id, ten_danh_muc } = dm;
        ten_dm += `<option value="${id}" id="danh_muc_${id}">${ten_danh_muc}</option>`;
      });
      //? Lưu danh mục và yêu cầu fetch loại
      fetch("http://localhost:3000/admin/loai", opt)
        .then(async (r) => {
          if (r.status == 401) {
            let str = r.statusText + "\n" + JSON.stringify(await r.json());
            alert("Lỗi: " + str);
            window.location.href = "../login.html";
          } else return r.json();
        })
        .then((loai_arr) => {
          let str = `
  <div class="add_product">      
            <form action="" method="post" enctype="multipart/form-data">
                <div class="group_input">
                    <label for="topic-name">Danh mục</label>
                        <select name="danh_muc" id="danh_muc_select">
                            ${ten_dm}
                        </select>
                </div>
                <div class="group_input">
                    <label for="topic-name">Loại</label>
                        <select name="loai" id="loai_select">
                            ${loai_arr.map((loai) => {
                              return `<option value="${loai.id}" id="loai_${loai.id}">${loai.ten_loai}</option>`;
                            })}
                        </select>
                </div>
                <div class="group_input">
                    <label for="Ten_sp">Tên Sản Phẩm</label>
                    <input type="text" placeholder="Tên Sản Phẩm" name="ten_sp" id="ten_sp">
                    <div class="ten_sp-error error"></div>
                </div>
                <div class="group_input">
                    <label for="Gia_sp">Giá Sản Phẩm</label>
                    <input type="text" placeholder="Giá Sản Phẩm" name="gia_sp" id="gia_sp">
                    <div class="gia_sp-error error"></div>
                </div>
                <div class="group_input">
                    <label for="giam_gia">Giảm Giá</label>
                    <input type="text" placeholder="Giảm Giá" name="giam_gia" id="giam_gia">
                    <div class="giam_gia-error error"></div>
                </div>
                <div class="group_input">
                    <label for="Hinh">Hình Ảnh</label>
                    <input type="text" placeholder="Hình Sản Phẩm" name="hinh" id="hinh">
                    <div class="hinh-error error"></div>
                </div>
                 <div class="group_input">
                    <label for="ngay">Ngày</label>
                    <input type="date" placeholder="Ngày" name="ngay" id="ngay">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="mau_sac">Màu Sắc</label>
                    <input type="text" placeholder="Màu Sắc" name="mau_sac" id="mau_sac">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="hot">Hot</label>
                     <select name="hot" id="hot_select">
                            <option value="1" id="hot_1">Có</option>
                            <option value="0" id="hot_0">Không</option>
                        </select>
                </div>
                <div class="group_btn">
                    <button type="button" class="btn" onclick="them_sp()">Thêm</button>
                    <button type="reset" class="btn btntp">Nhập Lại</button>
                </div>
            </form>
    </div>
  `;
          document.querySelector("#them_sp").innerHTML = str;
        });
    });
};

//! Xu ly them san pham
const them_sp = () => {
  let token = laytoken();
  let them_sp = new Promise((thongbao, loi) => {
    let danh_muc = document.getElementById("danh_muc_select").value;
    let loai = document.getElementById("loai_select").value;
    let ten_sp = document.getElementById("ten_sp").value;
    let gia_sp = document.getElementById("gia_sp").value;
    let giam_gia = document.getElementById("giam_gia").value;
    let hinh = document.getElementById("hinh").value;
    let ngay = document.getElementById("ngay").value;
    let mau_sac = document.getElementById("mau_sac").value;
    let hot = document.getElementById("hot_select").value;
    let data = {
      id_danh_muc: danh_muc,
      id_loai: loai,
      ten_sp: ten_sp,
      gia: gia_sp,
      giam_gia: giam_gia,
      hinh: hinh,
      ngay: ngay,
      mau_sac: mau_sac,
      hot: hot,
    };

    if (!validateForm_SP(data)) {
      return;
    }

    let opt = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json", Authorization: token },
    };
    fetch(`http://localhost:3000/admin/sp`, opt)
      .then(async (res) => {
        if (res.status == 401) {
          let str = res.statusText + "\n" + JSON.stringify(await res.json());
          window.location.href = "../login.html";
          return loi(str);
        } else return thongbao(await res.json());
      })
      .then((sp) => thongbao(sp))
      .catch((err) => loi(err));
  });

  them_sp.then(
    function thongbao(sp) {
      location.href = "ds_sanpham.html";
    },
    function loi(err) {
      console.log(err);
      window.location.reload();
    }
  );
};

//! Sửa sản phẩm
const form_sua_sp = async (id) => {
  let token = laytoken();
  let opt = {
    headers: {
      Authorization: token,
    },
  };
  let san_pham = await fetch(`http://localhost:3000/admin/sp/${id}`, opt)
    .then(async (res) => {
      if (res.status == 401) {
        let str = res.statusText + "\n" + JSON.stringify(await res.json());
        alert(str);
        window.location.href = "../login.html";
      } else return res.json();
    })
    .then((sp) => sp);

  let danh_muc = await fetch(`http://localhost:3000/admin/dm`, opt)
    .then(async (res_dm) => {
      if (res_dm.status == 401) {
        let str =
          res_dm.statusText + "\n" + JSON.stringify(await res_dm.json());
        alert(str);
        window.location.href = "../login.html";
      } else return res_dm.json();
    })
    .then((dm) => dm);

  let optionDM = "";
  let selectDM = danh_muc.find((dm) => dm.id == san_pham.id_danh_muc);
  if (selectDM) {
    optionDM += `<option value="${selectDM.id}" id="danh_muc_${selectDM.id}">${selectDM.ten_danh_muc}</option>`;
    danh_muc.forEach((dm) => {
      if (dm.id !== selectDM.id) {
        let { id, ten_danh_muc } = dm;
        optionDM += `<option value="${id}" id="danh_muc_${id}">${ten_danh_muc}</option>`;
      }
    });
  }

  let loai = await fetch(`http://localhost:3000/admin/loai`, opt)
    .then(async (res_loai) => {
      if (res_loai.status == 401) {
        let str =
          res_loai.statusText + "\n" + JSON.stringify(await res_loai.json());
        alert(str);
        window.location.href = "../login.html";
      } else return res_loai.json();
    })
    .then((loai) => loai);

  let optionLoai = "";
  let selectLoai = loai.find((l) => l.id == san_pham.id_loai);
  console.log(selectLoai);
  if (selectLoai) {
    optionLoai += `<option value="${selectLoai.id}" id="loai_${selectLoai.id}">${selectLoai.ten_loai}</option>`;
    loai.forEach((l) => {
      if (l.id !== selectLoai.id) {
        console.log(l);
        let { id, ten_loai } = l;
        optionLoai += `<option value="${id}" id="loai_${id}">${ten_loai}</option>`;
      }
    });
  }

  let str = `
              <div class="add_product">      
              <form action="" method="post" enctype="multipart/form-data">                   
                  <div class="group_input">
                    <label for="topic-name">Danh mục</label>
                        <select name="danh_muc" id="danh_muc_select">
                            ${optionDM}
                        </select>
                  </div>                
                  <div class="group_input">
                  <label for="topic-name">Loại</label>
                      <select name="loai" id="loai_select">
                          ${optionLoai}
                      </select>                
                  </div>
                  <div class="group_input">
                    <label for="Ten_sp">Tên Sản Phẩm</label>
                    <input type="text" placeholder="Tên Sản Phẩm" name="Ten_sp" id="ten_sp" value="${san_pham.ten_sp}">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="Gia_sp">Giá Sản Phẩm</label>
                    <input type="text" placeholder="Giá Sản Phẩm" name="Gia_sp" id="gia_sp" value="${san_pham.gia}">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="giam_gia">Giảm Giá</label>
                    <input type="text" placeholder="Giảm Giá" name="giam_gia" id="giam_gia" value="${san_pham.giam_gia}">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="Hinh">Hình Ảnh</label>
                    <input type="text" placeholder="Hình Sản Phẩm" name="Hinh" id="hinh" value="${san_pham.hinh}">
                    <div class="error"></div>
                </div>
                 <div class="group_input">
                    <label for="ngay">Ngày</label>
                    <input type="date" placeholder="Ngày" name="ngay" id="ngay" value="${san_pham.ngay}">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="mau_sac">Màu Sắc</label>
                    <input type="text" placeholder="Màu Sắc" name="mau_sac" id="mau_sac" value="${san_pham.mau_sac}">
                    <div class="error"></div>
                </div>
                <div class="group_btn">
                    <button type="button" class="btn" onclick="update_sp('${san_pham.id}')">Cập nhật</button>
                    <button type="reset" class="btn btntp">Nhập Lại</button>
                </div>
            </form>
    </div>
  `;
  document.querySelector("#sua_sp").innerHTML = str;
};

//! Sửa sản phẩm
const update_sp = (id) => {
  let token = laytoken();
  let id_danh_muc = document.getElementById("danh_muc_select").value;
  let loai = document.getElementById("loai_select").value;
  let ten_sp = document.getElementById("ten_sp").value;
  let gia_sp = document.getElementById("gia_sp").value;
  let giam_gia = document.getElementById("giam_gia").value;
  let hinh = document.getElementById("hinh").value;
  let ngay = document.getElementById("ngay").value;
  let mau_sac = document.getElementById("mau_sac").value;

  let data = {
    id: id,
    id_danh_muc: id_danh_muc,
    id_loai: loai,
    ten_sp: ten_sp,
    gia: gia_sp,
    giam_gia: giam_gia,
    hinh: hinh,
    ngay: ngay,
    mau_sac: mau_sac,
  };

  if (!validateForm_SP(data)) {
    return;
  }

  let opt = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(`http://localhost:3000/admin/sp/${id}`, opt)
    .then(async (res) => {
      if (res.status == 401) {
        let str = res.statusText + "\n" + JSON.stringify(await res.json());
        window.location.href = "../login.html";
        return loi(str);
      } else return res.json();
    })
    .then((sp) => {
      window.location.href = "ds_sanpham.html";
    });
};

//! Xóa sản phẩm
const xoa_sp = async (id) => {
  //? Kiểm tra xem người dùng muốn xóa hay không
  if (!confirm("Bạn có chắc muốn xóa sản phẩm")) {
    return;
  }
  let token = laytoken();
  await fetch(`http://localhost:3000/admin/sp/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then(async (res) => {
      if (res.status == 401) {
        let str = res.statusText + "\n" + JSON.stringify(await res.json());
        window.location.href = "../login.html";
        return loi(str);
      } else return res.json();
    })
    .then((sp) => {
      confirm("Sản phẩm đã được xóa!");
      window.location.reload();
    });
};

//!Check Form
validateForm_SP = (data) => {
  let isValid = true;
  if (!data.ten_sp) {
    displayError_SP("ten_sp", "Vui lòng nhập tên sản phẩm.");
    isValid = false;
  } else {
    clearError_SP("ten_sp");
  }
  if (!data.gia) {
    displayError_SP("gia_sp", "Vui lòng nhập giá sản phẩm.");
    isValid = false;
  } else if (data.gia < 0) {
    displayError_SP("gia_sp", "Giá sản phẩm phải lớn hơn 0.");
    isValid = false;
  } else {
    clearError_SP("gia_sp");
  }
  if (data.giam_gia > 100) {
    displayError_SP("giam_gia", "Mức giảm giá phải dưới 100%.");
    isValid = false;
  } else {
    clearError_SP("giam_gia");
  }
  if (!data.hinh) {
    displayError_SP("hinh", "Vui lòng thêm hình ảnh");
  } else {
    clearError_SP("hinh");
  }
  return isValid;
};
//! Xu ly hien thi thong bao
displayError_SP = (elementId, message) => {
  const errorElement = document.querySelector(`.${elementId}-error`);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
};
//! Xu ly an thong bao
clearError_SP = (elementId) => {
  const errorElement = document.querySelector(`.${elementId}-error`);
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
};

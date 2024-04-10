//Hiện header chung cho toàn trang
const header = () => {
  document.querySelector(
    "#container_header"
  ).innerHTML = `<div id=header-content>
            <div class="header-content_w1300">
                <div class="number-phone__map">
                    <div class="number-phone">
                        <p>
                            <ion-icon name="call-outline"></ion-icon>
                            <span>1800.113114</span>
                        </p>
                    </div>
                    <div class="map">
                        <p>
                            <ion-icon name="location-outline"></ion-icon>
                            <span>Đại chỉ cửa hàng</span>
                        </p>
                    </div>
                </div>
                <div class="profile">
                    <img src="./assets/images/chinh_sach_bao_hanh.jpg" alt="Hàng chính hãng">
                </div>
                <div class="profile">
                    <img src="./assets/images/chinh_hang_VAT.jpg" alt="Hàng chính hãng">
                </div>
            </div>
        </div>
        <div id="header">
            <div class="container-menu">
                <a href="./index.html" class="logo">
                    <img src="./assets/images/logo.png" alt="">
                </a>
                <ul class="main-menu">
                    /* Hiện menu */
                </ul>
            </div>
            <div class="group">
                <div class="search-box">
                    <input type="search" class="search-text" id="" placeholder="Search">
                    <button class="search-btn"><ion-icon name="search-outline"></ion-icon></button>
                </div>
                <div class="cart">
                    <!-- Tạo số lượng sản phẩm trên giỏ hàng -->
                    <a href="./cart.html">
                        <ion-icon name="cart-outline" class="cart-icon"></ion-icon>
                    </a>
                    <span class="num-cart">0</span>
                </div>
                <div class="toggle">
                    <ion-icon class="toggle_menu" name="menu-outline">
                    </ion-icon>
                    <div class="mobile-menu">
                        <ion-icon class="toggle_close" name="close-outline"></ion-icon>
                        <ul class="main-menu">
                            /* Hiện menu */
                        </ul>
                        <div class="container-login_mobile">
                            <a href="./login.html" target="_blank">Đăng Nhập</a>
                            <a href="./form.html" target="_blank">Đăng Ký</a>
                        </div>
                    </div>
                    <div class="overflow"></div>
                </div>
                <div class="container-login">
                    <a href="./login.html" target="_blank">Đăng Nhập</a>
                    <a href="./form.html" target="_blank">Đăng Ký</a>
                </div>
            </div>
        </div>`;
  let number = localStorage.getItem("number");
  document.querySelector(".num-cart").innerHTML = number;
  const toggle_menu = document.querySelector(".toggle_menu");
  const toggle_close = document.querySelector(".toggle_close");
  const mobile_menu = document.querySelector(".mobile-menu");
  const overflow = document.querySelector(".overflow");
  toggle_menu.addEventListener("click", () => {
    mobile_menu.style.transform = "translateX(0)";
    mobile_menu.style.opacity = "1";
    mobile_menu.style.visibility = "visible";
    overflow.style.display = "block";
  });
  toggle_close.addEventListener("click", () => {
    mobile_menu.style.transform = "translateX(100%)";
    mobile_menu.style.opacity = "0";
    mobile_menu.style.visibility = "hidden";
    overflow.style.display = "none";
  });
  overflow.addEventListener("click", () => {
    mobile_menu.style.transform = "translateX(100%)";
    mobile_menu.style.opacity = "0";
    mobile_menu.style.visibility = "hidden";
    overflow.style.display = "none";
  });
};

//Hiện menu
const hienmenu = () =>
  fetch("http://localhost:3000/danhmuc")
    .then((res) => res.json())
    .then((danh_muc_arr) => {
      let str = '<li><a href="./index.html">Trang chủ</a></li>';

      danh_muc_arr.forEach((danh_muc) => {
        str += `<li><a href="./danh_muc.html?id=${danh_muc.id}"> ${danh_muc.ten_danh_muc}</a></li>`;
      });
      document.querySelector("#header .container-menu .main-menu").innerHTML =
        str;
      document.querySelector(
        "#header .group .toggle .mobile-menu .main-menu"
      ).innerHTML = str;
    });

//Hiên sản phẩm hot
const hiensphot = (sosp) =>
  fetch(`http://localhost:3000/sphot/${sosp}`)
    .then((res) => res.json())
    .then((sphot_arr) => {
      let str = "";
      sphot_arr.forEach((sp) => (str += hien1sp(sp)));
      document.querySelector("nav .hot").innerHTML = `<h2>
                    <ion-icon name="ribbon-outline"></ion-icon>Khuyến mãi hot
                </h2>
                    <div id="product-hot" class="product-main">
                        ${str}
                    </div>`;
    });

//Hiên sản phẩm phổ biến
const hienspphobien = (sosp) =>
  fetch(`http://localhost:3000/spmoi/${sosp}`)
    .then((res) => res.json())
    .then((sphot_arr) => {
      let str = "";
      sphot_arr.forEach((sp) => (str += hien1sp(sp)));
      document.querySelector(
        "nav .phobien"
      ).innerHTML = `<h2>Sản phẩm phổ biến</h2>
                    <div id="product-popular" class="product-main">
                        ${str}
                    </div>`;
    });

//Sản phẩm theo danh mục
const hiensptheodanhmuc = (id, sosp) =>
  fetch(`http://localhost:3000/danhmuc/${id}`)
    .then((res) => res.json())
    .then((danh_muc) => {
      let ten_danh_muc = "";
      danh_muc.forEach((danh_muc) => (ten_danh_muc += danh_muc.ten_danh_muc));
      /* Hiển thị tiêu đề */
      document.querySelector(
        "nav .title"
      ).innerHTML = `<h2>${ten_danh_muc}</h2>`;
      fetch(`http://localhost:3000/loai_danhmuc/${id}`)
        .then((res) => res.json())
        .then((loai) => {
          let ten_loai = "";
          loai.forEach(
            (loai) =>
              (ten_loai += `<li><ion-icon name="chevron-forward-outline"></ion-icon><a href="loai.html?id=${loai.id}&id_danh_muc=${loai.id_danh_muc}">${loai.ten_loai}</a></li>`)
          );
          /* Hiển thị loại */
          document.querySelector("#list_brand").innerHTML = ten_loai;
          fetch(`http://localhost:3000/sp_danhmuc/${id}`)
            .then((res) => res.json())
            .then((sp_arr) => {
              let str = "";
              sp_arr.forEach((sp) => (str += hien1sp(sp)));
              /* Hiển thị sản phẩm */
              document.querySelector(
                "nav .container .main .products .list_product"
              ).innerHTML = `<div class="product-main product-iphone">
                            ${str}
                        </div>`;
            });
        });
    });

//Hiện sản phẩm theo loại
const hientheoloai = (id, id_danh_muc) =>
  fetch(`http://localhost:3000/danhmuc/${id_danh_muc}`)
    .then((res) => res.json())
    .then((danh_muc) => {
      let ten_danh_muc = "";
      danh_muc.forEach((danh_muc) => (ten_danh_muc += danh_muc.ten_danh_muc));
      fetch(`http://localhost:3000/loai/${id}/${id_danh_muc}`)
        .then((res) => res.json())
        .then((loai) => {
          let ten_loai = "";
          loai.forEach((loai) => (ten_loai += loai.ten_loai));
          fetch(`http://localhost:3000/sp/${id}/${id_danh_muc}`)
            .then((res) => res.json())
            .then((sp_arr) => {
              let str = "";
              sp_arr.forEach((sp) => (str += hien1sp(sp)));
              /* Hiển thị sản phẩm */
              document.querySelector(
                "nav .container .main .products .list_product"
              ).innerHTML = `<div class="product-main product-iphone">
                            ${str}
                        </div>`;
              /* Hiển thị tiêu đề */
              document.querySelector(
                "nav .title"
              ).innerHTML = `<h2>${ten_loai}</h2>`;

              document.querySelector(
                "#list_brand li"
              ).innerHTML = `<li><ion-icon name="chevron-forward-outline"></ion-icon><a href="danh_muc.html?id=${id_danh_muc}">Về danh mục</a></li>`;
            });
        });
    });

const hienselect = () => {
  let str =
    /* html */
    `<div class="filter_price">
        <select name="" id="">
            <option value="6000000">Giá 6 triệu</option>
            <option value="6100000">Giá 6 - 8 triệu</option>
            <option value="10000000">Giá 8 - 10 triệu</option>
            <option value="20000000">Giá 10 - 20 triệu</option>
            <option value="21000000">Giá trên 20 triệu</option>
        </select>
    </div>
    <div class="filter_giamgia">
        <select name="" id="" onchange="dentranggiamgia(this.value)">
            <option value="0%">Giảm giá 0%</option>
            <option value="5%">Giảm giá 5%</option>
            <option value="10%">Giảm giá 10%</option>
            <option value="15%">Giảm giá 15%</option>
            <option value="20%">Giảm giá 20%</option>
            <option value="25%">Giảm giá 25%</option>
        </select>
    </div>`;
  document.querySelector(".filter_product").innerHTML += str;
};

const dentranggiamgia = (phantram) => {
  document.location = `giamgia.html?pt=${phantram}`;
};

//Hiện chi tiết sản phẩm
const chitietsp = async (id) => {
  const sp_a = await fetch(`http://localhost:3000/sp/${id}`)
    .then((res) => res.json())
    .then((d) => d);
  console.log(sp_a);

  /* Sim */
  let sim = "";
  if (sp_a.sim == "") {
    sim += ``;
  } else {
    sim += `<tr>
                    <td>SIM:</td>
                    <td colspan="2">${sp_a.sim}</td>
                </tr>`;
  }

  /* Card */
  let card = "";
  if (sp_a.card_do_hoa == "") {
    card += ``;
  } else {
    card += `<tr>
                    <td>Card Đồ Họa:</td>
                    <td colspan="2">${sp_a.card_do_hoa}</td>
                </tr>`;
  }

  let str = `<div class="pro-orther">
                <a href="./index.html"><ion-icon name="arrow-back-outline"></ion-icon>Mua sản phẩm khác</a>
            </div>
            <div class="box-pro">
                <div class="product_detail">
                    <div class="images">
                        <div class="product_detail-image">
                            <img class="img-fearture" src="./assets${
                              sp_a.hinh
                            }" alt="">
                            <div class="onmouse">
                                <ion-icon name="heart-outline"></ion-icon>
                                <ion-icon name="happy-outline"></ion-icon>
                                <ion-icon name="person-add-outline"></ion-icon>
                                <ion-icon name="bag-add-outline"></ion-icon>
                            </div>
                        </div>
                        <div class="ct-img">
                            <div class="img">
                                <img src="./assets/images/ctsp_iphone1.jpg" alt="">
                            </div>
                            <div class="img">
                                <img src="./assets/images/ctsp_iphone2.jpg" alt="">
                            </div>
                            <div class="img">
                                <img src="./assets/images/ctsp_iphone3.jpg" alt="">
                            </div>
                            <div class="img">
                                <img src="./assets/images/ctsp_iphone4.jpg" alt="">
                            </div>
                            <div class="img">
                                <img src="./assets/images/ctsp_iphone5.jpg" alt="">
                            </div>
                        </div>
                        <div class="pro-wrap">
                            <div class="wrap_1">
                                <div class="flex wrap-child_1">
                                    <ion-icon name="arrow-undo-outline"></ion-icon>
                                    <p>Hư gì đổi nấy trong <strong>12 tháng</strong> trên toàn quốc</p>
                                </div>
                                <div class="flex wrap-child_2">
                                    <ion-icon name="shield-outline"></ion-icon>
                                    <p>Bảo hành chính hàng <strong>1 năm</strong> tại các trung tâm bão hành</p>
                                </div>
                            </div>
                            <div class="flex wrap_2">
                                <ion-icon name="cube-outline"></ion-icon>
                                <p>Bộ sản phẩm bao gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning - Type
                                    C</p>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <a href="">
                            <h4>${sp_a.ten_sp}</h4>
                        </a>
                        <div class="price-list">
                            <div class="price-main">
                                <span class="price-cut">${Number(
                                  sp_a.gia
                                ).toLocaleString("Vi")} VNĐ</span>
                            </div>
                            <p>Giảm Giá ${sp_a.giam_gia}</p>
                        </div>
                        <div class="capacity">
                            <button class="g">${sp_a.dia}</button>
                        </div>
                        <div class="content-child">
                            <div class="title">
                                <h4>Khuyến mãi</h4>
                                <h5>Áp dụng giá khuyến mãi</h5>
                            </div>
                            <div class="contact">
                                - Thu cũ Đổi mới: Giảm đến 2 triệu (Tùy model máy cũ, không kèm các hình thức
                                thanh
                                toán online, mua kèm).
                                <br>
                                - Mã giảm giá 200.000<sup>đ</sup> khi thanh toán qua App
                                - Bảo hành 1 năm đổi trả
                            </div>
                            <div class="inside">
                                <h3>Cấu Hình Điện Thoại</h3>
                                <div class="table">
                                    <table>
                                        <tr>
                                            <td>RAM:</td>
                                            <td colspan="2">${sp_a.ram}</td>
                                        </tr>
                                        <tr>
                                            <td>CPU:</td>
                                            <td colspan="2">${sp_a.cpu}</td>
                                        </tr>
                                        <tr>
                                            <td>Công Nghệ Màn Hình:</td>
                                            <td colspan="2">${
                                              sp_a.cong_nghe_man_hinh
                                            }"</td>
                                        </tr>
                                        ${card}
                                        ${sim}
                                        <tr>
                                            <td>Pin:</td>
                                            <td colspan="2">${sp_a.pin}</td>
                                        </tr>
                                        <tr>
                                            <td>Bluetooth:</td>
                                            <td colspan="2">${
                                              sp_a.blue_tooth
                                            }</td>
                                        </tr>
                                        <tr>
                                            <td>Cổng kết nối:</td>
                                            <td colspan="2">${
                                              sp_a.cong_ket_noi
                                            }</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <button class="buy-now"><a>MuaNgay</a></button>
                        <button class="buy-now buy-gop"><a href="">Mua Trả Góp 0%</a></button>
                    </div>
                </div>
            </div>`;
  document.querySelector("#container-wrap").innerHTML = str;

  spcungloai(sp_a.id_loai, 4);
};

//Hiện sản phẩm cùng loại
const spcungloai = (id, limit) => {
  fetch(`http://localhost:3000/sp_loai/${id}`)
    .then((res) => res.json())
    .then((sp) => {
      let str = "";
      sp.forEach((sp) => {
        str += hien1sp(sp);
      });
      document.querySelector(
        ".product_same"
      ).innerHTML = `<div class="product_same--main">
                    <div class="product_same--title">
                        <h2>Sản phẩm cùng loại với ${sp[0].ten_sp}</h2>
                    </div>
                    <div class="product_same--list">
                    ${str}
                    </div>
                </div>`;
    });
};
//Hiện 1 sản phẩm
const hien1sp = (sp) => {
  let { id, id_danh_muc, id_loai, ten_sp, hinh, gia, giam_gia, ngay } = sp; //Destructuring Object
  return `<div class="product">
                <div class="product-image">
                    <a href="./productdetail.html?id=${id}">
                        <img src="./assets${hinh}" alt="">
                    </a>
                </div>
                <div class="content">
                    <a href="./productdetail.html?id=${id}">
                        <h4>${ten_sp}</h4>
                    </a>
                    <div class="price-list">
                        <div class="price-main">
                            <span class="price-cut">${Number(
                              gia
                            ).toLocaleString("Vi")} VNĐ</span>
                        </div>
                        <p>Giảm Giá ${giam_gia}</p>
                    </div>
                </div>
                <div class="button-buy">
                    <button class="btn_product" onclick="addtocart('${id}')">
                        Mua Ngay
                    </button>
                </div>
            </div>`;
};

//Add to cart
const addtocart = async (id, so_luong = 1) => {
  let res = await fetch(`http://localhost:3000/sp/${id}`);
  let sp = await res.json();

  console.log(sp);
  if (sp == null) {
    alert("Sản phẩm không tồn tại");
    return;
  }
  sp["so_luong"] = so_luong;
  let cart_local = localStorage.getItem("cart");

  let cart = cart_local == null ? [] : JSON.parse(cart_local);
  let index = cart.findIndex((sp) => sp.id == id);

  //Gọi lại localStorage nếu có sẽ cộng dồn thêm
  let number = Number(localStorage.getItem("number")) || 0;

  if (index >= 0) {
    cart[index]["so_luong"] += so_luong;
  } else {
    cart.push(sp);
  }

  //Mỗi khi addtocart thành cồng sẽ tăng lên theo số lượng sản phẩm đã mua
  number += so_luong;
  localStorage.setItem("number", number); //Đẩy lên localStorage sau khi tăng
  document.querySelector(".num-cart").innerHTML = number;

  localStorage.setItem("cart", JSON.stringify(cart));
};

const showcart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart == null) return (document.querySelector(".box").innerHTML = ``);

  document.querySelector(".box").innerHTML = `<div class="product">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Hình Ảnh</th>
                                        <th>Thông Tin</th>
                                        <th>Giá</th>
                                        <th>Số Lượng</th>
                                        <th>Thành tiền</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody id="showcart">
                                    ${cartbody(cart)}
                                </tbody>
                            </table>
                        </div>`;
  document.querySelector("#pay").innerHTML = tong(cart);
};

//Show sản phẩm trong cart
const cartbody = (cart) =>
  cart
    .map(
      (sp) =>
        `<tr>
            <td><img src="./assets${sp.hinh}"></td>
            <td><h3>${sp.ten_sp}</h3></td>
            <td>
                <p class="price">${Number(sp.gia).toLocaleString("Vi")} VNĐ</p>
            </td>
            <td>
                <div class="number-pro">
                    <button onclick="removesl(${sp.id})">
                      <ion-icon name="remove-outline"></ion-icon>
                    </button>
                        <input type="text" value="${sp.so_luong}" id="numberip">
                    <button onclick="addtosl(${sp.id})">
                      <ion-icon name="add-outline"></ion-icon>
                    </button>
                </div>
            </td>
            <td>
                <p class="price">
                    ${Number(sp.gia * sp.so_luong).toLocaleString("Vi")} VNĐ
                </p>
            </td>
            <td class="delete">
                <button onclick="removecart(${sp.id})">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </td>`
    )
    .join("");

//Tiền tất cả sản phẩm
const tong = (cart) => {
  let tong_tien = 0,
    tong_so_luong = 0;
  cart.forEach((sp) => {
    tong_so_luong += sp.so_luong;
    tong_tien += sp.gia * sp.so_luong;
  });
  if (cart == "") {
    return (document.querySelector(".money").innerHTML = ``);
  } else {
    return `<div class="pay-box">
                <div class="money">
                    <h3>Tổng tiền:</h3>
                    <span id="price">${Number(tong_tien).toLocaleString(
                      "Vi"
                    )} VNĐ</span>
                </div>
                <a class="btn_order" href="thanhtoan.html">Đặt Hàng</a>
            </div>`;
  }
};

//Remove cart
const removecart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let index = cart.findIndex((sp) => sp.id == id);

  if (index >= 0) {
    // Tìm số lượng sản phẩm đã mua trên localStorage
    let sl = cart[index]["so_luong"];

    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Giảm số lượng mua khi remove
    let number = Number(localStorage.getItem("number")) || 0;
    number -= sl;
    document.querySelector(".num-cart").innerHTML = number;
    localStorage.setItem("number", number);

    showcart();
  }
};

//Add to cart
const addtosl = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let index = cart.findIndex((sp) => sp.id == id);

  if (index >= 0) {
    // Tìm "so_luong" trong localStorage
    cart[index]["so_luong"] += 1;
    localStorage.setItem("cart", JSON.stringify(cart));

    // Giảm số lượng mua khi add
    let number = Number(localStorage.getItem("number")) || 0;
    number += 1;
    document.querySelector(".num-cart").innerHTML = number;
    localStorage.setItem("number", number);

    showcart();
  }
};

//Remove số lượng sản phẩm trong giỏ hàng
const removesl = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let index = cart.findIndex((sp) => sp.id == id);

  if (index >= 0) {
    // Tìm số lượng sản phẩm đã mua trên localStorage
    if (cart[index]["so_luong"] > 1) {
      cart[index]["so_luong"] -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));

      // Giảm số lượng mua khi remove
      let number = Number(localStorage.getItem("number")) || 0;
      number -= 1;
      document.querySelector(".num-cart").innerHTML = number;
      localStorage.setItem("number", number);

      showcart();
    }
  }
};

//Thanh toán
const showthanhtoan = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let tong_tien = 0,
    tong_so_luong = 0;
  cart.forEach((sp) => {
    tong_so_luong += sp.so_luong;
    tong_tien += sp.gia * sp.so_luong;
  });
  let str =
    /* html */
    `<!---------------------- Information_user ------------------------->
                    <div class="information">
                        <h3>THÔNG TIN KHÁCH HÀNG</h3>
                        <div class="form-group">
                            <label for="text" class="title">Họ:</label>
                            <div class="box-group">
                                <input type="text" name="fisrtname" id="ho" class="input" autofocus autocomplete="off">
                            </div>
                            <div class="errUser"></div>
                        </div>
                        <div class="form-group">
                            <label for="text" class="title">Tên:</label>
                            <div class="box-group">
                                <input type="text" name="lastname" id="ten" class="input" autofocus autocomplete="off">
                            </div>
                            <div class="errUser"></div>
                        </div>
                        <div class="form-group">
                            <label for="text" class="title">Email:</label>
                            <div class="box-group">
                                <input type="text" name="email" id="email" class="input" autofocus autocomplete="off">
                            </div>
                            <div class="errEmail"></div>
                        </div>
                        <div class="form-group">
                            <label for="text" class="title">Địa chỉ:</label>
                            <div class="box-group">
                                <input type="text" name="address" id="dia_chi" class="input" autofocus autocomplete="off">
                            </div>
                            <div class="errAddress"></div>
                        </div>
                        <div class="form-group">
                            <label for="text" class="title">Số điện thoại:</label>
                            <div class="box-group">
                                <input type="text" name="phonenumber" id="so_dien_thoai" class="input" autofocus autocomplete="off">
                            </div>
                            <div class="errPhone"></div>
                        </div>
                    </div>
                    <!---------------------- End ------------------------->
                    <!---------------------- method ------------------------->
                    <div class="method">
                        <h3>PHƯƠNG THỨC THANH TOÁN</h3>
                        <div class="form-group">
                            <ul>
                                <li>
                                    <input type="radio" class="pttt" id="f-option" value="1" name="method_cart">
                                    <label for="f-option">Thanh toán bằng thẻ</label>
                                    <div class="check"></div>
                                </li>
                                <li>
                                    <input type="radio" class="pttt" id="s-option" value="2" name="method_cart">
                                    <label for="s-option">Trả tiền sau khi nhận hàng</label>
                                    <div class="check">
                                        <div class="inside"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!---------------------- End - Product ------------------------->
                    <!---------------------- Products ------------------------->
                    <div class="list-products">
                        <h3>DANH SÁCH GIỎ HÀNG</h3>
                        <div class="box">
                            <div class="product">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Hình Ảnh</th>
                                            <th>Thông Tin</th>
                                            <th>Giá</th>
                                            <th>Số Lượng</th>
                                            <th>Thành tiền</th>
                                            <th>Xóa</th>
                                        </tr>
                                    </thead>
                                    <tbody id="showcart">
                                        ${cartbody(cart)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="money">
                            <h3>Tổng tiền:</h3>
                            <span id="price">
                                ${Number(tong_tien).toLocaleString("Vi")} VNĐ
                            </span>
                        </div>
                    </div>
                    <!---------------------- End - Product ------------------------->
                    <!-- Đặt hàng -->
                    <button type="button" name="order" class="btn_order" onclick="thanhtoan();">Thanh toán</button>`;

  document.querySelector("nav .container").innerHTML = `
                <form action="" method="post" id="form" class="main">
                    ${str}
                </form>`;

  // //!Validate form thanh toán
  // let form = document.getElementById("form");

  // form.onsubmit = (e) => {
  //   e.preventDefault();
  //   checkForm();
  // };
};

// const checkForm = () => {
//   let ho = document.getElementById("ho");
//   let ten = document.getElementById("ten");
//   let email = document.getElementById("email");
//   let dia_chi = document.getElementById("dia_chi");
//   let so_dien_thoai = document.getElementById("so_dien_thoai");

//   if (ho_ten.value == "") {
//     alert("Vui lý nhap ho ten");
//     ho_ten.focus();
//     return false;
//   }

//   if (email.value == "") {
//     alert("Vui lý nhap email");
//     email.focus();
//     return false;
//   }

//   if (dia_chi.value == "") {
//     alert("Vui lý nhap dia chi");
//     dia_chi.focus();
//     return false;
//   }

//   if (so_dien_thoai.value == "") {
//     alert("Vui lý nhap so dien thoai");
//     so_dien_thoai.focus();
//     return false;
//   }

//   return true;
// };

//Code tiến hành thanh toán
const thanhtoan = () => {
  let luudonhang = new Promise((luugiohang, loi) => {
    //Duyệt mảng để tìm phương thức thanh toán
    let pttt;
    document.querySelectorAll(".pttt").forEach((pt) => {
      if (pt.checked) {
        pttt = pt.value;
      }
    });

    let data = {
      ho: document.getElementById("ho").value,
      ten: document.getElementById("ten").value,
      email: document.getElementById("email").value,
      dia_chi: document.getElementById("dia_chi").value,
      so_dien_thoai: document.getElementById("so_dien_thoai").value,
      phuong_thuc_tt: pttt,
    };
    let opt = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:3000/don_hang`, opt)
      .then((res) => res.json())
      .then((don_hang) => {
        luugiohang(don_hang);
      })
      .catch((err) => loi(err));
  });
  luudonhang.then(
    function luugiohang(don_hang) {
      let id = don_hang.id;

      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.forEach((sp) => {
        let data = {
          id_dh: id,
          id_sp: sp.id,
          ten_sp: sp.ten_sp,
          hinh: sp.hinh,
          so_luong: sp.so_luong,
          gia: sp.gia,
          thanh_tien: sp.gia * sp.so_luong,
        };
        let opt = {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        };
        fetch("http://localhost:3000/don_hang_chi_tiet", opt)
          .then((res) => res.json())
          .then((don_hang) => {
            location.href = `done.html`;
          })
          .catch((err) => {
            alert("Lỗi luu đơn hàng: " + err);
          });
      });
    },
    function loi(err) {
      alert("Lỗi luu đơn hàng: " + err);
      window.location.reload();
    }
  );
};

//Lịch sử đơn hàng
const donhang = () =>
  fetch(`http://localhost:3000/don_hang`)
    .then((res) => res.json())
    .then((don_hang) => {
      let show = "";
      don_hang.forEach((dh) => {
        let pttt = ``;
        if (dh.phuong_thuc_tt == 1) {
          pttt = "Trả bằng thẻ";
        } else {
          pttt = "Trả tiền sau khi nhận hàng";
        }

        show += `
                            <tbody>
                                <tr>
                                    <td>
                                        <p>
                                          ${dh.ho_ten}
                                        </p>
                                    </td>
                                    <td>
                                        <p>${dh.email}</p>
                                    </td>
                                    <td>
                                        <p>${dh.dia_chi}</p>
                                    </td>
                                    <td>
                                        <p>${dh.so_dien_thoai}</p>
                                    </td>
                                    <td>
                                        <p>${pttt}</p>
                                    </td>
                                    <td>
                                        <a href="donhangchitiet.html?id=${dh.id}">Chi tiết</a>
                                    </td>
                                </tr>
                            </tbody>`;
      });
      document.querySelector(".box").innerHTML = `<div class="product">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Khách Hàng</th>
                                        <th>Email</th>
                                        <th>Địa Chỉ</th>
                                        <th>Số Điện Thoại</th>
                                        <th>Phương Thức Thanh Toán</th>
                                        <th>Chi Tiết</th>
                                    </tr>
                                </thead>
                                <tbody id="showcart">
                                    ${show}
                                </tbody>
                            </table>
                        </div>`;
    });

//Đơn hàng chi tiết
const donhangchitiet = (id_dh) => {
  fetch(`http://localhost:3000/don_hang_chi_tiet/${id_dh}`)
    .then((res) => res.json())
    .then((don_hang_chi_tiet) => {
      let show = "";
      don_hang_chi_tiet.forEach((dhct) => {
        show += `
                            <tbody>
                              <tr>
                                <td>
                                  <img src="${dhct.hinh_anh}">
                                </td>
                                <td>
                                  <h3>${dhct.ten_sp}</h3>
                                </td>
                                <td>
                                    <p class="price">${Number(
                                      dhct.gia
                                    ).toLocaleString("Vi")} VNĐ</p>
                                </td>
                                <td>
                                    <div class="number-pro">
                                        <button onclick="removesl(${dhct.id})">
                                          <ion-icon name="remove-outline"></ion-icon>
                                        </button>
                                            <input type="text" value="${
                                              dhct.so_luong
                                            }" id="numberip">
                                        <button onclick="addtosl(${
                                          dhct.id
                                        }, 1)">
                                          <ion-icon name="add-outline"></ion-icon>
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <p class="price">
                                        ${Number(
                                          dhct.gia * dhct.so_luong
                                        ).toLocaleString("Vi")} VNĐ
                                    </p>
                                </td>
                                <td class="delete">
                                    <button onclick="removecart(${dhct.id})">
                                        <ion-icon name="trash-outline"></ion-icon>
                                    </button>
                                </td>
                              </tr>
                            </tbody>`;
      });
      document.querySelector(".box").innerHTML = `<div class="product">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Hình Ảnh</th>
                                        <th>Thông Tin</th>
                                        <th>Giá</th>
                                        <th>Số Lượng</th>
                                        <th>Thành tiền</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody id="showcart">
                                    ${show}
                                </tbody>
                            </table>
                        </div>`;
    });
};

//Hiện footer
const footer = () => {
  document.querySelector("footer").innerHTML = `<div class="the-end">
        <ul class="the-end_menu">
            <li>
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <span>Mẫu mã đa dạng,
                    chính hãng
                </span>
            </li>
            <li>
                <ion-icon name="car-outline"></ion-icon>
                <span>Giao hàng toàn quốc</span>
            </li>
            <li>
                <ion-icon name="shield-outline"></ion-icon>
                <span>Bảo hảnh 12 tháng</span>
            </li>
            <li>
                <ion-icon name="refresh-outline"></ion-icon>
                <span>Có thể đổi trả,
                    trong thời gian quy định
                </span>
            </li>
        </ul>
    </div>
    <div id="footer-wrap">
        <div id="footer-bottom">
            <div class="ft-bt-main">
                    <a class="logo-ft" href=""><img src="./assets/images/logo.png" alt="">Tech<span>Phone</span></a>
                <div class="ft">
                    <ul class="main-ft">
                        <li><a href="">Thông tin web</a></li>
                        <li><a href="">Chính sách bảo hành</a></li>
                        <li><a href="">Chính sách đổi trả</a></li>
                        <li><a href="">Giao hàng & thanh toán</a></li>
                    </ul>
                </div>
                <div class="ft">
                    <ul class="main-ft">
                        <li><a href="">Mua hàng online</a></li>
                        <li><a href="">Hướng dẫn online</a></li>
                        <li><a href="">Hóa đơn</a></li>
                        <li><a href="">Cảnh báo</a></li>
                    </ul>
                </div>
                <div class="ft">
                    <ul class="main-ft">
                        <li><ion-icon name="home-outline"></ion-icon><a href="">Ngõ 218, P.Bưởi, Tây Hồ, Hà Nội</a>
                        </li>
                        <li><ion-icon name="call-outline"></ion-icon><a href="">0123456789</a></li>
                        <li><ion-icon name="mail-outline"></ion-icon><a href="">techphone@gmail.com</a></li>
                    </ul>
                    <div class="logo-tt">
                        <a href=""><ion-icon name="logo-facebook"></ion-icon></a>
                        <a href=""><ion-icon name="logo-google"></ion-icon></a>
                        <a href=""><ion-icon name="logo-twitter"></ion-icon></a>
                        <a href=""><ion-icon name="logo-instagram"></ion-icon></a>
                    </div>
                </div>
            </div>
            <div class="dp_flex__pay">
                <div class="pay">
                    <img class="item item1" src="./assets/images/fjb.png" alt="">
                    <img class="item item2" src="./assets/images/foxpay.png" alt="">
                    <img class="item item3" src="./assets/images/visa.png" alt="">
                    <img class="item item4" src="./assets/images/mastercard.png" alt="">
                    <img class="item item5" src="./assets/images/zalopay.png" alt="">
                    <img class="item item6" src="./assets/images/vnpay.png" alt="">
                </div>
            </div>
        </div>
        <div class="lastFoo">
            <div class="content">© 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM
                cấp ngày
                02/01/2007.
                Địa chỉ: 128 Trần Quang Khải, P. Tân Định, Q.1, TP. Hồ Chí Minh. Điện thoại: 028 38125960.</div>
        </div>
    </div>`;
};

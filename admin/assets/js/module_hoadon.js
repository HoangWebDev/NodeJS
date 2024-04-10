//!Lấy token
const laytoken = () => {
  let token = sessionStorage.getItem("token");
  if (token != null) return token;
  alert("Bạn phải đăng nhập!");
  window.location.href = "../login.html";
  return null;
};

let token = laytoken();
let opt = {
  headers: {
    Authorization: token,
  },
};

//Hiện danh sách loại
const laydshoadon = () => {
  return fetch("http://localhost:3000/admin/donhang", opt)
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((d) => d);
};
export { laydshoadon };

export const laydsdhct = (id_dh) => {
  return fetch(`http://localhost:3000/admin/donhangchitiet/${id_dh}`, opt)
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((d) => d);
};

//Thêm loại
export const themloai = (loai) => {
  let opt = {
    method: "POST",
    body: JSON.stringify(loai),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch("http://localhost:3000/admin/loai", opt)
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((d) => d);
};

//Sửa loại
export const lay1loai = (id) => {
  return fetch(`http://localhost:3000/admin/loai/${id}`, opt)
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((d) => d);
};
export const sualoai = (id, loai) => {
  let opt = {
    method: "PUT",
    body: JSON.stringify(loai),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(`http://localhost:3000/admin/loai/${id}`, opt)
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((d) => d);
};

//Xóa đơn hàng
export const xoa_dh = (id) => {
  return fetch(`http://localhost:3000/admin/donhang/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((d) => d);
};

export const xoa_dhct = (id) => {
  return fetch(`http://localhost:3000/admin/donhangchitiet/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((d) => d);
};

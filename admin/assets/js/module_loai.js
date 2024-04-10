//!Lấy token
const laytoken = () => {
  let token = sessionStorage.getItem("token");
  if (token != null) return token;
  alert("Bạn phải đăng nhập!");
  window.location.href = "../login.html";
  return null;
};

//Hiện danh sách loại
const laydsloai = () => {
  let token = laytoken();
  let opt = {
    headers: {
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
const laydsdm = () => {
  let token = laytoken();
  let opt = {
    headers: {
      Authorization: token,
    },
  };
  return fetch(`http://localhost:3000/admin/dm`, opt)
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((d) => d);
};
export { laydsdm, laydsloai };

//Thêm loại
export const themloai = (loai) => {
  let token = laytoken();
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
  let token = laytoken();
  let opt = {
    headers: {
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
export const sualoai = (id, loai) => {
  let token = laytoken();
  let opt = {
    method: "PUT",
    body: JSON.stringify(loai),
    headers: {
      "Content-Type": "application/json",
      Authentication: token,
    },
  };
  fetch(`http://localhost:3000/admin/loai/${id}`, opt)
    .then(async (r) => {
      if (r.status == 401) {
        let str = r.statusText + "\n" + JSON.stringify(await r.json());
        alert("Lỗi: " + str);
        window.location.href = "../login.html";
      } else return r.json();
    })
    .then((d) => {
      console.log(d);
    })
    .catch((err) => console.log(err));
};

//Xóa loại
export const xoaloai = (id) => {
  let token = laytoken();
  return fetch(`http://localhost:3000/admin/loai/${id}`, {
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

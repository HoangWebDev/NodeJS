let checkForm = function () {
  let ho_ten = document.getElementById("ho_ten");
  let email = document.getElementById("email");
  let dia_chi = document.getElementById("dia_chi");
  let so_dien_thoai = document.getElementById("so_dien_thoai");
  let form = document.getElementById("form");

  let isEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

  let isPhonenumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

  if (ho_ten.value == "") {
    document.querySelector(".errUser").innerHTML = "Vui lòng nhập họ tên";
    ho_ten.focus();
    return false;
  } else {
    document.querySelector(".errUser").innerHTML = "";
  }

  if (email.value == "") {
    document.querySelector(".errEmail").innerHTML = "Vui lòng nhập email";
    email.focus();
    return false;
  } else if (!isEmail.test(email.value)) {
    document.querySelector(".errEmail").innerHTML = "Email không hợp lệ";
    email.focus();
    return false;
  } else {
    document.querySelector(".errEmail").innerHTML = "";
  }

  if (dia_chi.value == "") {
    document.querySelector(".errAddress").innerHTML = "Vui lòng nhập địa chỉ";
    dia_chi.focus();
    return false;
  } else {
    document.querySelector(".errAddress").innerHTML = "";
  }

  if (so_dien_thoai.value == "") {
    document.querySelector(".errPhone").innerHTML =
      "Vui lòng nhập số điện thoại";
    so_dien_thoai.focus();
    return false;
  } else if (!isPhonenumber.test(so_dien_thoai.value)) {
    document.querySelector(".errPhone").innerHTML =
      "Số điện thoại không hợp lệ";
    so_dien_thoai.focus();
    return false;
  } else {
    document.querySelector(".errPhone").innerHTML = "";
  }
  return true;
};

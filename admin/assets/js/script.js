const Customer = [
  {
    id: 1,
    name: "Nguyễn Thế Hãng",
    price: "40000000",
    quantity: "100",
  },
  {
    id: 2,
    name: "Trần Hữu Phước",
    price: "30000000",
    quantity: "40",
  },
  {
    id: 3,
    name: "Lý Văn Tèo",
    price: "25000000",
    quantity: "30",
  },
  {
    id: 4,
    name: "Huỳnh Tuấn Kiệt",
    price: "23000000",
    quantity: "25",
  },
  {
    id: 5,
    name: "Trần Văn Tủn",
    price: "20000000",
    quantity: "15",
  },
];

const customer = () => {
  let str = "";
  Customer.forEach((cus) => {
    str += `
      <tr>
        <td>${cus.id}</td>
        <td>${cus.name}</td>
        <td>${cus.price}</td>
        <td>${cus.quantity}</td>
      </tr>`;
  });
  document.querySelector(".main_customer--table").innerHTML = `
    <thead>
    <tr>
        <th>Stt</th>
        <th>Tên Khách Hàng</th>
        <th>Số Tiền</th>
        <th>Số Lượng</th>
    </tr>
    </thead>
    <tbody>
      ${str}
    </tbody>`;
};
customer();

// document.addEventListener("DOMContentLoaded", function () {
//   // Get all menu items
//   var menuItems = document.querySelectorAll("#side_bar .side_menu--top li");

//   // Add click event listener to each menu item
//   menuItems.forEach(function (menuItem) {
//     menuItem.addEventListener("click", function () {
//       // Remove 'active' class from all menu items
//       menuItems.forEach(function (item) {
//         item.classList.remove("active");
//       });

//       // Add 'active' class to the clicked menu item
//       menuItem.classList.add("active");
//     });
//   });
// });

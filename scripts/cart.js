let boughtitems = JSON.parse(localStorage.getItem("bought")) || [];
if (boughtitems.length === 0) {
  let cart = document.getElementById("cartsection");
  cart.innerHTML = `<h3 class="text-center text-muted">Your cart is empty 🛒</h3>`;
} else {
  let cart = document.getElementById("cartsection");
  let left_section = document.createElement("div");
  left_section.id = "left";
  left_section.classList.add(
    "col-lg-6",
    "col-12",
    "p-2",
    "container",
    "d-flex",
    "flex-column"
  );
  cart.appendChild(left_section);
  let right = document.createElement("div");
  right.id = "right";
  right.classList.add(
    "col-lg-5",
    "col-12",
    "p-2",
    "container",
    "d-flex",
    "flex-column"
  );
  let heading = document.createElement("h3");
  heading.classList.add("text-center");
  heading.innerText = "Total Price";

  let hr = document.createElement("hr");

  let totalpriceel = document.createElement("h4");
  totalpriceel.classList.add("text-center", "totalprice");
  totalpriceel.innerText = "$0.00";

  let totalbutton = document.createElement("button");
  totalbutton.type = "button";
  totalbutton.classList.add("btn", "btn-success", "align-self-end", "checkout");
  totalbutton.innerHTML = 'Check Out <i class="fa-solid fa-arrow-right"></i>';
  totalbutton.onclick = function () {
    let notify = document.createElement("div");
    notify.style.backgroundColor = "white";
    notify.textContent = "Your Order Has Been Submitted✔️";
    notify.style.position = "fixed";
    notify.style.top = "20px";
    notify.style.left = "50%";
    notify.style.fontSize = "1.5em";
    notify.style.transform = "translateX(-50%)";
    notify.style.padding = "1em 1.5em";
    notify.style.borderRadius = "8px";
    notify.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    notify.style.zIndex = "9999";
    notify.style.fontFamily = "sans-serif";
    notify.style.transition = "opacity 0.3s ease";
    document.body.appendChild(notify);
    setTimeout(() => {
      notify.style.opacity = "0";
      setTimeout(() => notify.remove(), 500);
    }, 3000);
  };
  right.append(heading, hr, totalpriceel, totalbutton);
  cart.appendChild(right);
  function calculateTotal() {
    let totalprice = boughtitems.reduce((acc, item) => {
      return acc + item.price * item.amount;
    }, 0);
    totalpriceel.innerText = "$" + totalprice.toFixed(2);
  }
  boughtitems.forEach((boughtitem) => {
    let row = document.createElement("div");
    row.classList.add("row", "mx-auto", "container-fluid", "w-100");

    let item = document.createElement("div");
    item.classList.add(
      "item",
      "col-12",
      "d-flex",
      "gap-3",
      "align-items-center"
    );

    let imgbox = document.createElement("div");
    imgbox.style.height = "4em";
    imgbox.style.width = "4em";

    let img = document.createElement("img");
    img.src = boughtitem.image;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    imgbox.appendChild(img);

    let i2 = document.createElement("i");
    i2.classList.add("fa-solid", "fa-trash", "fs-4", "ms-auto");
    i2.style.cursor = "pointer";
    let details = document.createElement("div");
    details.classList.add("details", "d-flex", "flex-column");

    let h5 = document.createElement("h6");
    h5.textContent = boughtitem.title;

    let quantity = document.createElement("div");

    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", "1");
    input.value = boughtitem.amount || 1;

    let span2 = document.createElement("span");
    span2.innerText = (boughtitem.amount * boughtitem.price).toFixed(2);

    input.onchange = function () {
      boughtitem.amount = parseInt(input.value);
      span2.innerText = (boughtitem.amount * boughtitem.price).toFixed(2);
      localStorage.setItem("bought", JSON.stringify(boughtitems));
      calculateTotal();
    };

    i2.addEventListener("click", function () {
      boughtitems = boughtitems.filter((item) => item.id !== boughtitem.id);
      localStorage.setItem("bought", JSON.stringify(boughtitems));
      row.remove();
      calculateTotal();
      if (boughtitems.length === 0) {
        let cart = document.getElementById("cartsection");
        cart.innerHTML = `<h3 class="text-center text-muted">Your cart is empty 🛒</h3>`;
      }
    });
    quantity.append(input, span2);
    details.append(h5, quantity);
    item.append(imgbox, details, i2);
    row.appendChild(item);
    left_section.appendChild(row);
  });
  calculateTotal();
}

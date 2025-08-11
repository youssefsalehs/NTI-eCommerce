let boughtitems = JSON.parse(localStorage.getItem("bought")) || [];
console.log(boughtitems);
let xmr = new XMLHttpRequest();
xmr.open("GET", "https://fakestoreapi.com/products", true);
xmr.onreadystatechange = function () {
  if (this.status == 200 && this.readyState === 4) {
    let items = JSON.parse(this.responseText);
    localStorage.setItem("items", JSON.stringify(items));
    items.forEach((item) => {
      let itemssection = document.getElementById("items");
      let card = document.createElement("div");
      card.classList.add("card", "p-2", "h-100", "mb-4");
      let card_container = document.createElement("div");
      card_container.appendChild(card);
      card_container.classList.add(
        "col-lg-4",
        "col-md-6",
        "col-12",
        "d-flex",
        "flex-column"
      );
      let img = document.createElement("img");
      img.classList.add("card-img-top");
      img.src = item.image;
      let cardbody = document.createElement("div");
      cardbody.classList.add("card-body");
      let h6 = document.createElement("h6");
      h6.textContent = item.title;
      h6.classList.add("card-title");
      let p = document.createElement("p");
      p.textContent = "$" + item.price;
      p.classList.add("card-text");
      let a = document.createElement("a");
      a.innerText = "Buy Now";
      a.classList.add("btn", "btn-success");
      cardbody.append(h6, p, a);
      card.append(img, cardbody);
      itemssection.appendChild(card_container);
      a.addEventListener("click", function () {
        if (!boughtitems.some((bought) => bought.id === item.id)) {
          boughtitems.push({ ...item, amount: 1 });
          localStorage.setItem("bought", JSON.stringify(boughtitems));
          let notify = document.createElement("div");
          notify.style.backgroundColor = "white";
          notify.textContent = "The Item Has Been Added To The Cart ✔️";
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
        }
      });
    });
  }
};
xmr.send();

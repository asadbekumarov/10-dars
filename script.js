// 1-topshiriq
// const ages = [25, 30, 18, 22, 40];
// const youngest = Math.min.apply(null, ages);
// console.log(youngest);

// 2-topshiriq
// const car1 = {
//   brand: "Toyata",
//   calculateSpeed(distance, time) {
//     return `${this.brand} tezlik: ${distance / time}`;
//   },
// };
// const car2 = {
//   brand: "Honda",
// };
// const speed = car1.calculateSpeed.call(car2, 100, 2);
// console.log(speed);

// 3-topshiriq
// function greet(greeting) {
//   return `${greeting}, men ${this.name}, ${this.role}!`;
// }
// const person1 = { name: "Alice", role: "Dasturchi" };
// const person2 = { name: "Bob", role: "Dizayner" };

// const greetAlice = greet.call(person1, "Salom");
// const greetBob = greet.call(person2, "Salom");
// console.log(greetAlice);
// console.log(greetBob);

// 4-topshiriq

// const product = {
//   price: 200,
// };
// function applyDiscount(discount) {
//   return this.price - (this.price * discount) / 100;
// }
// const tenPercentDiscount = applyDiscount.bind(product, 10);
// console.log(tenPercentDiscount());
// //////////////////////
// //////////////////////
// //////////////////////
let Elol = document.querySelector("#user-list");
let Elform = document.querySelector("form");
// ////////////////////////////
async function getData() {
  let response = await fetch("http://localhost:3000/users");
  let data = await response.json();
  Elol.innerHTML = "";
  data.forEach((user) => renderUser(user));
}
// ////////////////////////////
function renderUser(user) {
  let li = document.createElement("li");
  let nameP = document.createElement("p");
  let emailP = document.createElement("p");
  let delbtn = document.createElement("button");
  let editbtn = document.createElement("button");
  delbtn.classList.add("del");
  editbtn.classList.add("edit");
  // ////////////////////////////
  nameP.textContent = `Name: ${user.name}`;
  emailP.textContent = `Email: ${user.email}`;
  delbtn.textContent = "Delete";
  editbtn.textContent = "Edit";
  // ////////////////////////////
  li.append(nameP, emailP, delbtn, editbtn);
  Elol.append(li);
  // ////////////////////////////
  delbtn.addEventListener("click", async () => {
    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "DELETE",
    });
    li.remove();
  });
  // ////////////////////////////
  editbtn.addEventListener("click", () => {
    document.querySelector("#name").value = user.name;
    document.querySelector("#email").value = user.email;
    Elform.dataset.editingId = user.id;
  });
}
// ////////////////////////////
Elform.addEventListener("submit", async (e) => {
  e.preventDefault();
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let userId = Elform.dataset.editingId;
  // ////////////////////////////
  let newUser = { name, email };
  // ////////////////////////////
  if (userId) {
    let response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    // ////////////////////////////
    if (response.ok) {
      getData();
      Elform.reset();
      delete Elform.dataset.editingId;
    }
  } else {
    let response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    // ////////////////////////////
    if (response.ok) {
      let addedUser = await response.json();
      renderUser(addedUser);
      Elform.reset();
    }
  }
});
// ////////////////////////////
getData();

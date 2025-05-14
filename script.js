// Variables
let authors;
let filterauthors;
let currentFilter = "all";
let currentGender = "all";
let currentSort = "amount";
const donatorList = document.querySelector("#donateur");

// Fetch Data
async function fetchdata() {
  const response = await fetch("https://randomuser.me/api/?results=50");
  const data = await response.json();
  console.log("data");
  console.log(data);
  return data;
}

fetchdata().then((data) => {
  authors = data.results;
  renderDonators();
});

// Render Donators
function renderDonators() {
  let list = document.getElementById("name");
  let authorslist = authors;
  list.innerHTML = "";
  console.log(authors);

  if (filterauthors) {
    authorslist = filterauthors;
  }

  authorslist.map(function (author) {
    let ul = document.createElement("ul");
    let name2 = document.createElement("h2");
    let firstname = document.createElement("h2");
    let email = document.createElement("p");
    let location = document.createElement("p");
    let phone = document.createElement("p");
    let img = document.createElement("img");
    let amount = document.createElement("p");

    const randomAmount = (Math.random() * 9000).toFixed(0);

    email.innerHTML = `${author.email}`;
    name2.innerHTML = `${author.name.last}`;
    firstname.innerHTML = `${author.name.first}`;
    location.innerHTML = `${author.location.city}`;
    phone.innerHTML = `${author.phone}`;
    img.src = `${author.picture.large}`;
    img.alt = `${author.picture.large}`;
    amount.innerHTML = `${randomAmount} €`;
    amount.classList.add("amount");

    ul.appendChild(img);
    ul.appendChild(name2);
    ul.appendChild(firstname);
    ul.appendChild(email);
    ul.appendChild(location);
    ul.appendChild(phone);
    ul.appendChild(amount);
    ul.classList.add("card");

    console.log("name");
    console.log(author.name.last);
    document.querySelector("#name").appendChild(ul);
  });
}

// Filter Function
function filter(gender) {
  switch (gender) {
    case "femme":
      const result = authors.filter((donator) => donator.gender === "female");
      filterauthors = result;
      renderDonators();
      break;

    case "homme":
      const result2 = authors.filter((donator) => donator.gender === "male");
      filterauthors = result2;
      renderDonators();
      break;

    case "all":
      filterauthors = authors;
      renderDonators();
      break;

    case "alphabetical":
      const result3 = authors.sort((a, b) =>
        a.name.last.localeCompare(b.name.last)
      );
 console.log(result3);
      break;
      
  }
}

// Render Donator List
renderDonators();

donatorList.innerHTML = filtered
  .map(
    (d) => `
      <div class="card">
          <div class="amount">${(Math.random() * 9000).toFixed(0)} €</div>
          <img src="${d.picture.large}" alt="${d.name.first} ${d.name.last}" />
          <div class="name">${d.name.first} ${d.name.last}</div>
          <div class="info">${d.location.city}</div>
          <div class="info">${d.phone}</div>
          <div class="info">${d.email}</div>
      </div>
  `
  )
  .join("");

// Event Listeners
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter.toLowerCase();
    renderDonators();
  });
});

document.querySelectorAll(".sort").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentSort = btn.dataset.sort;
  });
});

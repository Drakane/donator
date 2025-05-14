
let authors;
let filterauthors = null;
let currentFilter = "all";
let currentGender = "all";
let currentSort = "amount";


async function fetchdata() {
  const response = await fetch("https://randomuser.me/api/?results=50");
  const data = await response.json();
  console.log("data");
  console.log(data);


  authors = data.results.map((author) => ({
    ...author,
    amount: Math.floor(Math.random() * 10000), 
  }));

  renderDonators();
}


fetchdata();


function renderDonators() {
  let list = document.getElementById("name");
  let authorslist = filterauthors || authors;
  list.innerHTML = "";


  if (currentSort === "amount") {
    authorslist = [...authorslist].sort((a, b) => b.amount - a.amount);
  } else if (currentSort === "alphabetical") {
    authorslist = [...authorslist].sort((a, b) =>
      a.name.last.localeCompare(b.name.last)
    );
  }


  authorslist.forEach((author) => {
    let ul = document.createElement("ul");
    ul.classList.add("card");

    ul.innerHTML = `
      <img src="${author.picture.large}" alt="${author.name.first}">
      <h2>${author.name.last}</h2>
      <h2>${author.name.first}</h2>
      <p>${author.email}</p>
      <p>${author.location.city}</p>
      <p>${author.phone}</p>
      <p class="amount">${author.amount} €</p>
    `;

    list.appendChild(ul);
  });
}


function filter(gender) {
  switch (gender) {
    case "femme":
      filterauthors = authors.filter((donator) => donator.gender === "female");
      break;
    case "homme":
      filterauthors = authors.filter((donator) => donator.gender === "male");
      break;
    case "all":
      filterauthors = null;
      break;
  }
  renderDonators();
}


document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter?.toLowerCase() || "all";
    filter(currentFilter);
  });
});


document.querySelectorAll(".sort").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentSort = btn.dataset.sort;
    renderDonators();
  });
});
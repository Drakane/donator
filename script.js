async function fetchdata() {
  const response = await fetch("https://randomuser.me/api/?results=50");
  const data = await response.json();
  console.log("data");
  console.log(data);

  return data;
}

fetchdata().then((data) => {
  let authors = data.results;

  console.log("authors");
  console.log(authors);

  // eslint-disable-next-line array-callback-return
  authors.map(function (author) {
    let ul = document.createElement("ul");
    let name2 = document.createElement("h2");

    name2.innerHTML = `${author.name.last}`;

    ul.appendChild(name2);

    console.log("name");
    console.log(author.name.last);
    document.querySelector("#name").appendChild(ul);
  });
});
let currentFilter = "all";
let currentSort = "amount";

const donatorList = document.querySelector("#donateur");
const filterButtons = document.querySelectorAll(".filter");

function renderDonators() {
  let filtered = data.results.filter((d) => {
    if (currentFilter === "all") return true;
    return currentFilter === "homme"
      ? d.gender === "homme"
      : currentFilter === "femme"
      ? d.gender === "femme"
      : currentFilter === "all";
  });

  if (currentSort === "amount") {
    filtered.sort((a, b) => b.amount - a.amount);
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  donatorList.innerHTML = filtered
    .map(
      (d) => `
      <div class="card">
          <div class="amount">${d.amount.toFixed(2)} €</div>
          <img src="${d.img || "default.jpg"}" alt="${d.name}" />
          <div class="name">${author.name.last}</div>
          <div class="info">${d.location}</div>
          <div class="info">${d.phone}</div>
      </div>
  `
    )
    .join("");
}
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter.toLowerCase();
  });
});

document.querySelectorAll(".sort").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentSort = btn.dataset.sort;
  });
});
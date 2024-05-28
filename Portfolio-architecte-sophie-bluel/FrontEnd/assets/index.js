const gallery = document.querySelector(".gallery");
const mesBtnFilter = document.querySelectorAll(".button-filtre");
const btnFiltreTout = document.querySelector(".button-filtre-tout");
const btnFiltreObjet = document.querySelector(".button-filtre-object");
const btnFiltreAppartement = document.querySelector(
    ".button-filtre-appartement"
);
const btnFiltreHR = document.querySelector(".button-filtre-hotel");
let works = [];
let categories = [];

// ajoute de la classe active au bouton cliqué et enlève la classe active des autres boutons
mesBtnFilter.forEach((btn) => {
    btn.addEventListener("click", () => {
        mesBtnFilter.forEach((btn) => {
            btn.classList.remove("active");
        });
        btn.classList.add("active");
    });
});

function filterButton() {
    // Pour chaque créer un addeventListener qui va filtrer works pour créer un nouveaux tableau et l'envoyer a displayWorks

    btnFiltreTout.addEventListener("click", () => {
        displayWorks(works);
    });

    btnFiltreObjet.addEventListener("click", () => {
        const worksToDisplay = works.filter((work) => {
            return work.categoryId === 1;
        });
        displayWorks(worksToDisplay);
    });

    btnFiltreAppartement.addEventListener("click", () => {
        const worksToDisplay = works.filter((work) => {
            return work.categoryId === 2;
        });
        displayWorks(worksToDisplay);
    });

    btnFiltreHR.addEventListener("click", () => {
        const worksToDisplay = works.filter((work) => {
            return work.categoryId === 3;
        });
        displayWorks(worksToDisplay);
    });
}
filterButton();

function displayWorks(worksToDisplay) {
    gallery.innerHTML = "";
    worksToDisplay.forEach((work) => {
        const createFigure = document.createElement("figure");
        createFigure.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
        <p>${work.category.name}</p>
    `;
        gallery.appendChild(createFigure);
    });
}

function fetchWorks() {
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
            works = data;
            displayWorks(works);
        });
}
fetchWorks();

function fetchCategory() {
    fetch("http://localhost:5678/api/categories")
        .then((response) => response.json())
        .then((data) => {
            categories = data;
            filterButton();
        });
}
fetchCategory();

const myPopup = document.querySelector(".popup");
const myPopupContainer = document.querySelector(".popup-container");
const popupCloseBtn = document.querySelector(".close-button");
const popupImageContainer = document.querySelector(".popup-images");
let eraseImageBtn = document.querySelectorAll(".icon-trash");
const btnAddImage = document.querySelector("#add-image");
const btnEtitImage = document.querySelector(".btn-modif");
const editeImage = document.querySelector(".edit-image");

btnEtitImage.addEventListener("click", () => {
    myPopup.style.display = "flex";
});

popupCloseBtn.addEventListener("click", () => {
    myPopup.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === myPopup) {
        myPopup.style.display = "none";
    }
});

// ferme la popup en appuyant sur la touche echap
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        myPopup.style.display = "none";
    }
});

function resetPopup() {
    popupImageContainer.innerHTML = "";
}

// affichage des images + bouton de suppression dans la popup
async function displayImages() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    resetPopup();

    works.forEach((work) => {
        const EditeImage = document.createElement("div");
        EditeImage.classList.add("edit-image");

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        EditeImage.appendChild(img);

        const iconTrash = document.createElement("div");
        iconTrash.classList.add("icon-trash");
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can");
        iconTrash.appendChild(trashIcon);
        EditeImage.appendChild(iconTrash);

        popupImageContainer.appendChild(EditeImage);

        // suppression de l'image
        iconTrash.addEventListener("click", async () => {
            await fetch(`http://localhost:5678/api/works/${work.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "token"
                    )}`,
                },
            })
                .then((response) => {
                    console.log(response);
                    // token valide
                    if (response.status === 200) {
                        // suppression de l'image
                        EditeImage.remove();
                    } else if (response.status === 401) {
                        // token invalide
                        alert("Vous n'êtes pas connecté");
                        location.href = "../login.html";
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    });
}

displayImages();

const popupImage = document.querySelector(".popup-content");
const formAddImage = document.querySelector(".popup-content-ajoute");
formAddImage.style.display = "none";
console.log(formAddImage);
const backArrow = document.querySelector(".back-arrow");

btnAddImage.addEventListener("click", () => {
    popupImage.style.display = "none";
    formAddImage.style.display = "flex";
});

backArrow.addEventListener("click", () => {
    popupImage.style.display = "flex";
    formAddImage.style.display = "none";
});

const fileInput = document.querySelector("#fileInput");
const fileName = document.querySelector("#file-name");
const btnValideForm = document.querySelector("#validerForm");
const formTitleImage = document.querySelector(".imageTitle");
const selectCategory = document.querySelector("#selectCategorie");

// Affichage du nom du fichier dans l'input file
fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name;
    }
});

// Modification de la fonction sendImage pour inclure l'affichage de l'image
const sendImage = async () => {
    if (fileInput.files.length === 0) {
        alert("Veuillez sélectionner un fichier avant de soumettre.");
        return;
    }

    const formdata = new FormData();
    formdata.append("image", fileInput.files[0]);
    console.log(fileInput.files[0]);
    formdata.append("title", formTitleImage.value);
    console.log(formTitleImage.value);
    formdata.append("category", selectCategory.value);
    console.log(selectCategory.value);

    // try {
    let response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            // Accept: "application/json",
            // "Content-Type": "application/json",
        },
        body: formdata,
    });
    let data = await response.json();
    return data;
    // } catch (error) {
    // alert(error.message);
    // }
};

btnValideForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let work = await sendImage();
    console.log("work");
    // await displayImages();
});

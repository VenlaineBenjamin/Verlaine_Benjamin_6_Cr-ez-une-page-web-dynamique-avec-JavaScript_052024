const myPopup = document.querySelector(".popup");
const myPopupContainer = document.querySelector(".popup-container");
const popupCloseBtn = document.querySelector(".close-button");
const popupImageContainer = document.querySelector(".popup-images");
const eraseImageBtn = document.querySelectorAll(".icon-trash");
const btnAddImage = document.querySelector("#add-image");
const btnEtitImage = document.querySelector(".btn-modif");
const editeImage = document.querySelector(".edit-image");

console.log(myPopup);
console.log(myPopupContainer);
console.log(popupCloseBtn);
console.log(popupImageContainer);
console.log(eraseImageBtn);
console.log(btnAddImage);
console.log(btnEtitImage);
console.log(editeImage);

btnEtitImage.addEventListener("click", () => {
    myPopup.style.display = "block";
});

popupCloseBtn.addEventListener("click", () => {
    myPopup.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === myPopup) {
        myPopup.style.display = "none";
    }
});

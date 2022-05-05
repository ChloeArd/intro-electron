// Logging
document.getElementById("mon-bouton").addEventListener("click", () => {
    window.logger.error("Une erreur critique est survenue");
});

document.getElementById("bouton-test").addEventListener("click", async () => {
    const response = await window.dialog.showMessageBox({
        message: "Êtes vous sûr de vouloir réaliser cette action ?",
    });
    await window.dialog.showInfoBox({
        message: `Bouton choisi ${response.response}, la checkbox est-elle cliquée ?  ${response.checkboxChecked ? "Oui" : "Non"}`
    });
});

document.getElementById("bouton-error").addEventListener("click", async () => {
    await window.dialog.showErrorBox("Une erreur est survenue", "C'est une erreur critique !");
});

document.getElementById("save").addEventListener("click", function () {
    window.file.save(document.getElementById("text-content").value);
})
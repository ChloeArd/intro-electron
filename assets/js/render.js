
document.getElementById("mon-bouton").addEventListener("click", () => {
    window.logger.error("Critical", "Une erreur critique est survenue", () => {
        console.log("Message reçu en provenance du main process");
    });
});

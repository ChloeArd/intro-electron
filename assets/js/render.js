
window.logger.onMainProcessEvent = () => {
    console.log("Message reçu !");
}

document.getElementById("mon-bouton").addEventListener("click", () => {
    window.logger.error("Critical", "Une erreur critique est survenue", () => {
        console.log("Message reçu en provenance du main process");
    });
});

document.getElementById("button-ajax").addEventListener("click", async () => {
    const result = await window.ipcRenderer.invoke("ajax-request", "https://jsonplaceholder.typicode.com/todos/1");
    document.getElementById("ajax-content").innerText = JSON.stringify(result);
})
const {contextBridge, ipcRenderer} = require("electron");


const logError = (message, level, onMainProcessEvent = () => {}) => {
    ipcRenderer.send("log", {type: level, message: message});
    ipcRenderer.once("main-process-event", onMainProcessEvent)
    ipcRenderer.removeAllListeners("main-process-event");

}

const logSuccess = (message, onMainProcessEvent = () => {}) => {
    ipcRenderer.send("log", {type: "success", message: message});
    ipcRenderer.once("main-process-event", onMainProcessEvent);
}

contextBridge.exposeInMainWorld("logger", {
    "error": logError,
    "success": logSuccess
});


contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);
const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("file", {
    save: (content) => ipcRenderer.invoke("save-file", content)
})
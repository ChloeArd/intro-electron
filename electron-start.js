const {app, BrowserWindow, ipcMain, dialog} = require("electron");
const path = require("path");

// Create the Browser Window and load the main html entry point.
let mainWindow = null;

const makeWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        center: true,
        title: 'Electron',
        icon: path.resolve(__dirname + "/assets/icon.png"),
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.resolve(__dirname + "/preload.js")
        }
    });

    /*const childOne = new BrowserWindow({
        movable: false,
        parent: win,
        icon: path.resolve(__dirname + "/assets/icon.png"),
    });*/

    /*const childTwo = new BrowserWindow({
        x: childOne.getBounds().x + 50,
        y: childOne.getBounds().y + 150,
        parent: childOne,
        icon: path.resolve(__dirname + "/assets/icon.png"),
    });*/

    mainWindow.webContents.openDevTools();
    mainWindow.loadFile("src/index.html");
    //childOne.loadFile("src/child1.html");
    //childTwo.loadURL("https://www.google.fr");
}

// Create app when electron is ready.
app.whenReady().then(() => {
    makeWindow();
    // On MacOs, if app window does not exist, then create on "activate" event.
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            makeWindow();
        }
    });
});

ipcMain.on("log", (event, arg) => {
    if("type" in arg && "message" in arg) {
        console.table(arg);
        console.log("Type: " + arg.type + " => message: " + arg.message);
    }
    else {
        console.error("Une erreur inconnue a été reportée par un des Render process");
    }
});

/*ipcMain.handle("ajax-request", async (event, url) => {
    const response = await fetch(url);
    return response.json();
})*/

ipcMain.handle("showMessageBox", (event, arg) => dialog.showMessageBox(mainWindow, arg));

// Error dialog
ipcMain.handle("showErrorBox", (event, arg) => {
    if ("title" in arg && "content" in arg) {
        return dialog.showErrorBox(arg.title, arg.content);
    }
});

// Closing app if all windows are closed.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
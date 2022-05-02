const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");

// Create the Browser Window and load the main html entry point.
const makeWindow = () => {
    const win = new BrowserWindow({
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

    win.webContents.openDevTools();
    win.loadFile("src/index.html");
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
        event.sender.send("main-process-event", "Message logged");
    }
    else {
        console.error("Une erreur inconnue a été reportée par un des Render process");
    }
});

// Closing app if all windows are closed.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
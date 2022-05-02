const {app, BrowserWindow} = require("electron");

// Create the Browser Window and load the main html entry point.
const makeWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile("src/hello-world.html");
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

// Closing app if all windows are closed.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
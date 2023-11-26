// TEH SCREEN FILE (CONTROLS THE SCREEN PROPERTIES)
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

class HomeScreen {
  window;

  position = {
    width: 1400,
    height: 750,
    maximized: false,
  };

  constructor() {
    this.window = new BrowserWindow({
      width: this.position.width,
      height: this.position.height,
      title: "Novel Nest",
      show: false,
      removeMenu: true,
      icon: path.join(__dirname, "../../assets/icons/icon.ico"),
      acceptFirstMouse: true,
      autoHideMenuBar: true,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, "homePreload.js"),
      },
    });

    this.window.setTitle = "Novel Nest";

    console.log("main path: ", path.join(__dirname, "homePreload.js"));

    this.window.once("ready-to-show", () => {
      this.window.show();

      if (this.position.maximized) {
        this.window.maximize();
      }
    });

    let wc = this.window.webContents;
    wc.openDevTools({ mode: "docked" });

    this.window.loadFile(path.join(__dirname, "index.html"));
  }

  close() {
    this.window.close();
    ipcMain.removeAllListeners();
  }

  hide() {
    this.window.hide();
  }
}

module.exports = HomeScreen;

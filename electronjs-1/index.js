const { app, BrowserWindow } = require("electron");
const HomeScreen = require("./screens/home/homeScreen");
const Globals = require("./globals")

let curWindow;

function createWindow() {
  curWindow = new HomeScreen();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });
});

//Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
});

app.on("window-all-closed", function () {
  if (process.platform != "darwin") app.quit();
});
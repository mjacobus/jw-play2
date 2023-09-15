const { BrowserWindow } = require("electron");
// import { BrowserWindow } from "electron";
const store = require("./store");

console.log("store----->", store)

class BaseWindow extends BrowserWindow {
  constructor({ app, ...options }) {
    console.log("CONTROL_WINDOW_PRELOAD_WEBPACK_ENTRY", CONTROL_WINDOW_PRELOAD_WEBPACK_ENTRY)
    const default_options = {
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        preload: CONTROL_WINDOW_PRELOAD_WEBPACK_ENTRY
      },
    };
    options = Object.assign({}, default_options, options);
    super(options);
    this.app = app;
    this.store = store;

    // Enable this when it is production
    // this.on("close", (e) => {
    //   if (!app.isQuitting) {
    //     return e.preventDefault();
    //   }
    //   this.hide();
    // });
  }

  loadAppFile(file) {
    const url = `file://${__dirname}/${file}`;
    this.loadURL(url);
  }

  toggleDevTools() {
    this.webContents.toggleDevTools();
  }

  moveToDisplay(display) {
    this.setPosition(display.bounds.x, display.bounds.y);
  }

  resize(width, height) {
    this.setSize(width, height);
    const diff = height - this.getContentSize()[1];
    this.setSize(width, height + diff);
  }

  toggleFullScreen() {
    if (this.isFullScreen()) {
      return this.unFullScreen();
    }
    return this.fullScreen();
  }

  fullScreen() {
    this.keepOnTop();
    this.setFullScreen(true);
  }

  unFullScreen() {
    this.notOnAlwaysOnTop();
    this.setFullScreen(false);
  }

  keepOnTop() {
    this.setAlwaysOnTop(true, "screen-saver");
  }

  notOnAlwaysOnTop() {
    this.setAlwaysOnTop(false);
  }
}

module.exports = BaseWindow;

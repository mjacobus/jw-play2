const { app } = require("electron");

import ApplicationDriver from "./ApplicationDriver";
// const ApplicationDriver = require("./ApplicationDriver");

const driver = new ApplicationDriver(app);
driver.start();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

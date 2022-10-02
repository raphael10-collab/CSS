import {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  webContents,
  BrowserView,
  dialog,
  nativeTheme,
  session
} from 'electron';

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).

import * as path from 'path'
import * as fs from 'fs'

import menu from './menu/menu'

import log from 'electron-log'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow: BrowserWindow


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// https://github.com/thanhlmm/electron-multiple-tabs/blob/main/server/src/index.ts
const createMainWindow = async () => {


  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      webviewTag: true,
      //webSecurity: false
      webSecurity: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// https://github.com/wexond/browser-base/blob/master/src/main/index.ts

app.whenReady().then(() => {
  createMainWindow()
  Menu.setApplicationMenu(menu)
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.


//let restarting = false

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }

});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});


app.on('web-contents-created', (e, contents) => {
  contents.on('new-window', (e, url) => {
    e.preventDefault();
    require('open')(url);
  });
  contents.on('will-navigate', (e, url) => {
    if (url !== contents.getURL()) e.preventDefault(), require('open')(url);
  });
});

app.on("before-quit", () => {
  log.info("Before quit")
});

ipcMain.handle('minimum-window', async (event, tabName: string) => {
  if (mainWindow) {
    mainWindow.minimize()
  }
})

ipcMain.handle('toggle-maximum-window', async (event, tabName: string) => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
      return
    }
    mainWindow.maximize()
    return
  }
});
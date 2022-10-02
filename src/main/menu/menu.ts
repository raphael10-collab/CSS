import {
  BrowserWindow,
  Menu,
  MenuItem,
  ipcMain,
  app,
  shell,
  dialog,
  MenuItemConstructorOptions
} from 'electron'

// https://github.com/electron/electron/blob/v18.2.0/docs/fiddles/menus/customize-menus/main.js


declare const SEARCH_WINDOW_WEBPACK_ENTRY: string;
declare const SEARCH_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let SearchWindow: BrowserWindow

// https://www.electronjs.org/docs/api/browser-window#browserwindow
const createSearchWindow = (): void => {
  console.log("createSearchWindow called")

  SearchWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: false,
      //enableRemoteModule: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      webSecurity: false,
      webviewTag: false,
      preload: SEARCH_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  // and load the index.html of the app.
  SearchWindow.loadURL(SEARCH_WINDOW_WEBPACK_ENTRY);


  // Open the DevTools once the DOM is ready
  SearchWindow.webContents.once("dom-ready", async() => {
    SearchWindow.webContents.openDevTools()
  });


  // Emitted when the window is closed.
  SearchWindow.on('closed', () => {

    // https://github.com/yang991178/fluent-reader/blob/master/src/electron.ts
    SearchWindow = null
  })
}



const template: MenuItemConstructorOptions[] = [
  {
    role: 'fileMenu',
    submenu: [
      {
        role: 'quit'
      }
    ]
  },

  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: (item, focusedWindow) => {
          if (focusedWindow.id === 1){
            BrowserWindow.getAllWindows().forEach(win => {
              if (win.id > 1) win.close()
            })
          }
          focusedWindow.reload()
        }
      }
    ]
  },

  {
    label: 'Web',
    submenu: [
      {
        label: 'Web',
        click () {
          createSearchWindow()
          SearchWindow.show()
        }
      }
    ]
  }

]




const menu = Menu.buildFromTemplate(template)
export default menu

const  { app, BrowserWindow, ipcMain, nativeTheme } = require("electron")
const path = require("path")
const fs = require("fs")

require('update-electron-app')()

process.env.NODE_ENV = "production";
process.env.GITHUB_TOKEN = "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";

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 1000 : 600,
    height: isDev ? 600 : 400,
    title: "Todo App",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if(isDev) {
    mainWindow.webContents.openDevTools();
  }

  ipcMain.handle('create-file', (req, data) => {
    if(!data || !data.title || !data.description) return false;

    let dir = getAppBasePath()

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    const filePath = path.join(dir, `${data.title}.txt`)
    fs.writeFileSync(filePath, data.description)

    return { success: true, filePath };
  })

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

function getAppBasePath() {
  //dev
  if (process.env.RUN_ENV === 'development') return "./"

  if (!process.platform || !['win32', 'darwin'].includes(process.platform)) {
    console.error(`Unsupported OS: ${process.platform}`)
    return './'
  }
    //prod
  if (process.platform === 'darwin') {
    console.log('Mac OS detected')
    return `/Users/${process.env.USER}/Downloads/`
  } else if (process.platform === 'win32') {
    console.log('Windows OS detected')
    return `${process.env.LOCALAPPDATA}\\Notes\\`
  }
}
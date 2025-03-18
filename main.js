const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let breakWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.on('open-window', (event, timerType) => {
  breakWindow = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });

  breakWindow.loadFile(`${timerType}.html`);

  breakWindow.webContents.openDevTools();

  breakWindow.on('closed', () => {
    breakWindow = null;
  });
});

ipcMain.on('close-break-window', () => {
  if (breakWindow) {
    breakWindow.close();
    breakWindow = null;
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

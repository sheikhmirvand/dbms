const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL(
    url.format({
      // pathname: path.join(__dirname, 'resources','app','dist','browser','index.html'),
      pathname : "/home/ali/Desktop/project/dbms/client/MyElectronApp-linux-x64/resources/app/dist/browser/index.html",
      protocol: 'file:',
      slashes: true,
    })
  );

  // win.loadFile('/home/ali/Desktop/project/dbms/client/MyElectronApp-linux-x64/resources/app/dist/browser/index.html'); // Correctly join paths for cross-platform compatibility

  win.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => {
    const validChannels = ['open-window']; // Lista de canales permitidos
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  }
});
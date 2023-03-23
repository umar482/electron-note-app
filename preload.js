const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

contextBridge.exposeInMainWorld('api', {
  createNote: (data) => ipcRenderer.invoke("create-file", data)
})
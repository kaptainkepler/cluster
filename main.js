/*
 * PandaOS
 * Copyright (C) 2025  Cyberpandino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 */

const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const fs = require('fs');

function createCockpit() {
    // Ottieni tutti i display disponibili
    const displays = screen.getAllDisplays();
    
    // Scegli quale monitor usare (0 = primo, 1 = secondo, 2 = terzo)
    const targetDisplayIndex = 0; // Cambia questo valore per scegliere un monitor diverso
    const targetDisplay = displays[targetDisplayIndex] || displays[0]; // Fallback al primo se l'indice non esiste
    
    console.log(`Monitor disponibili: ${displays.length}`);
    console.log(`Aprendo su monitor ${targetDisplayIndex + 1}: ${targetDisplay.bounds.width}x${targetDisplay.bounds.height}`);

    // Path all'icona dell'app
    const iconPath = path.join(__dirname, 'client', 'public', 'icon.png');
    
    const win = new BrowserWindow({
        width: 1920,
        height: 580,
        x: targetDisplay.bounds.x,
        y: targetDisplay.bounds.y,
        fullscreen: false,
        icon: iconPath,
        title: 'Cyberpandino Cluster', 
        webPreferences: {
            kiosk: true,
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    win.loadURL('http://localhost:5173');
}


// Imposta il nome dell'app (deve essere fatto prima di app.whenReady)
app.setName('Cyberpandino Cluster');

app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('enable-accelerated-video-decode');

app.whenReady().then(() => {
    // Imposta l'icona del dock su macOS (opzionale)
    if (process.platform === 'darwin' && app.dock) {
        const dockIconPath = path.join(__dirname, 'client', 'public', 'icon.png');
        if (fs.existsSync(dockIconPath)) {
            app.dock.setIcon(dockIconPath);
        }
    }
    
    createCockpit();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

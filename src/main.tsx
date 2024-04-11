import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'
import 'reflect-metadata'
import { applyPolyfills, defineCustomElements } from 'jeep-sqlite/loader'
import { Capacitor } from '@capacitor/core';
import dataSource, { loadTickets, connection as sqlite } from './storage/database';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import 'swiper/css';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';

await applyPolyfills().then(() => {
  defineCustomElements(window);
});

(async () => {
  const platform = Capacitor.getPlatform();
    if(platform === "web") {
      const jeepEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepEl);
      await customElements.whenDefined('jeep-sqlite');
      await sqlite.initWebStore();
    }

    await CapacitorSQLite.checkConnectionsConsistency({
      dbNames: [],
      openModes: [],
    }).catch((e) => {
      console.log(e);
      return {};
    });

    if (!dataSource.isInitialized) {
      await dataSource.initialize()
      
    }
    
    await dataSource.dropDatabase()

    if (await dataSource.showMigrations()) {
      await dataSource.runMigrations()
    }

    await loadTickets()
    if (platform === 'web') {
      await sqlite.saveToStore('ionic-storage');
    }

    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

})();
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'
import 'reflect-metadata'
import { defineCustomElements, applyPolyfills } from "jeep-sqlite/loader";
import { Capacitor } from '@capacitor/core';
import dataSource, { connection, loadTickets, saveDb } from './storage/database';
import 'swiper/css';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import { isDbAvailable } from './utils';

await applyPolyfills().then(() => {
  defineCustomElements(window);
});

(async () => {
  const platform = Capacitor.getPlatform();
  if (platform === "web" && !import.meta.env.PROD) {
    const jeepEl = document.createElement("jeep-sqlite");
    document.body.appendChild(jeepEl);
    await customElements.whenDefined('jeep-sqlite');
    await connection.initWebStore();
  }

  if (isDbAvailable()) {
    await connection.checkConnectionsConsistency().catch((e) => {
      console.log(e);
      return {};
    });

    if (!dataSource.isInitialized) {
      await dataSource.initialize()
    }

    if (await dataSource.showMigrations()) {
      await dataSource.runMigrations()
    }

    await loadTickets()
    await saveDb()
  }

  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})();
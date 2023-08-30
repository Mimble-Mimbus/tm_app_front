import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'tm_app_front',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

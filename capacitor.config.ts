import { CapacitorConfig } from '@capacitor/cli';
import { config as dotenv } from 'dotenv'
dotenv({
  path: './.env.local'
})

const apiPath =  process.env.VITE_REACT_APP_API

if (!apiPath) {
  throw new Error('missing api url')
}

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'tm_app_front',
  webDir: 'dist',
  server: {
    cleartext: true,
    androidScheme: 'http',
    allowNavigation: [apiPath],
  },
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: true,
      iosKeychainPrefix: 'putain-de-ionic-de-merde',
      iosBiometric: {
        biometricAuth: false,
        biometricTitle : "Biometric login for capacitor sqlite"
      },
      androidIsEncryption: true,
      androidBiometric: {
        biometricAuth : false,
        biometricTitle : "Biometric login for capacitor sqlite",
        biometricSubTitle : "Log in using your biometric"
      }
    },
    CapacitorHttp: {
      enabled: true,
    }
  }
};

export default config;

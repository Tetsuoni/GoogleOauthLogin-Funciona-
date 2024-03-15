import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'googleauth',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: "935845557923-s1pbkltk8ls1nkfnu3ur4to5dmb6td74.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
      grantOfflineAccess: true,
    }
  }
};

export default config;

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bioforms.app',
  appName: 'bio-forms-app',
  webDir: 'dist/bio-forms-app',
  server: {
    androidScheme: 'https'
  }
};

export default config;

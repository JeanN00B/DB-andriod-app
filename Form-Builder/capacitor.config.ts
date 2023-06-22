import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bioforms.myapp',
  appName: 'BioForms',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Mi Calendario",
  slug: "mi-calendario-app",
  scheme: "mi-calendario",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  userInterfaceStyle: "light",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.tuempresa.micalendario",
    infoPlist: {
      NSContactsUsageDescription:
        "La app necesita acceder a tus contactos para compartir eventos por WhatsApp."
    }
  },
  android: {
    permissions: ["READ_CONTACTS"],
    package: "com.tuempresa.micalendario"
  },
  plugins: ["expo-contacts"],
  extra: {
    // Personaliza aquí sin .env
    APP_NAME: "Mi Calendario",
    PRIMARY_COLOR: "#2E86DE",
    GOOGLE_CLIENT_ID_WEB: "xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com"
  }
};

export default config;

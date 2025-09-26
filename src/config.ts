import Constants from "expo-constants";

const extra = (Constants?.expoConfig as any)?.extra ?? {};

export const APP_NAME: string = extra.APP_NAME || "Mi Calendario";
export const PRIMARY_COLOR: string = extra.PRIMARY_COLOR || "#2E86DE";
export const GOOGLE_CLIENT_ID_WEB: string = extra.GOOGLE_CLIENT_ID_WEB || "";

import * as AuthSession from "expo-auth-session";
import axios from "axios";
import { GOOGLE_CLIENT_ID_WEB } from "../config";

/**
 * MVP: OAuth Implicit (access_token en la URL) para simplificar.
 * Recomendado para producción: Authorization Code + PKCE + refresh tokens.
 */

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke"
};

const SCOPES = ["https://www.googleapis.com/auth/calendar"].join(" ");
const BASE = "https://www.googleapis.com/calendar/v3";

let accessToken: string | null = null;

export async function signInWithGoogle() {
  if (!GOOGLE_CLIENT_ID_WEB) {
    throw new Error("Falta configurar GOOGLE_CLIENT_ID_WEB en app.config.ts");
  }
  const redirectUri = AuthSession.makeRedirectUri({ scheme: "mi-calendario" });

  const authUrl =
    `${discovery.authorizationEndpoint}?` +
    `client_id=${encodeURIComponent(GOOGLE_CLIENT_ID_WEB)}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=token&` +
    `scope=${encodeURIComponent(SCOPES)}&` +
    `include_granted_scopes=true&` +
    `prompt=consent`;

  const result = (await AuthSession.startAsync({ authUrl })) as any;

  if (result?.type === "success" && result.params?.access_token) {
    accessToken = result.params.access_token;
    return;
  }
  throw new Error("Inicio de sesión cancelado o fallido");
}

function auth() {
  if (!accessToken) throw new Error("No autenticado con Google");
  return { Authorization: `Bearer ${accessToken}` };
}

export async function listEvents(timeMinISO: string, timeMaxISO: string) {
  const res = await axios.get(`${BASE}/calendars/primary/events`, {
    headers: auth(),
    params: {
      timeMin: timeMinISO,
      timeMax: timeMaxISO,
      singleEvents: true,
      orderBy: "startTime"
    }
  });
  return res.data.items || [];
}

export async function createEvent(evt: {
  summary: string;
  description?: string;
  startISO: string;
  endISO: string;
  location?: string;
}) {
  const res = await axios.post(
    `${BASE}/calendars/primary/events`,
    {
      summary: evt.summary,
      description: evt.description,
      start: { dateTime: evt.startISO },
      end: { dateTime: evt.endISO },
      location: evt.location
    },
    { headers: { ...auth(), "Content-Type": "application/json" } }
  );
  return res.data;
}

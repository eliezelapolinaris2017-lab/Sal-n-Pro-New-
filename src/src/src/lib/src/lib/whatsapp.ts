import { Linking } from "react-native";

export function buildWhatsAppText(evt: {
  title: string;
  start: string;
  end: string;
  location?: string;
  link?: string;
}) {
  const link = evt.link ? `\n🔗 ${evt.link}` : "";
  return `📅 *${evt.title}*
🕒 ${evt.start} - ${evt.end}
📍 ${evt.location || "—"}${link}`;
}

/** phone en formato internacional SIN + (ej: 5491122334455) */
export async function sendWhatsAppMessage(text: string, phone?: string) {
  const encoded = encodeURIComponent(text);
  const url = phone
    ? `whatsapp://send?phone=${phone}&text=${encoded}`
    : `whatsapp://send?text=${encoded}`;

  const canOpen = await Linking.canOpenURL("whatsapp://send");
  if (canOpen) return Linking.openURL(url);

  // Fallback web
  const web = phone ? `https://wa.me/${phone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
  return Linking.openURL(web);
}

import React from "react";
import { View, Text } from "react-native";
import { theme } from "../theme";

export default function EventCard({ title, time }: { title: string; time: string }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 12,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#eee"
      }}
    >
      <Text style={{ fontWeight: "700", marginBottom: 4, color: theme.colors.text }}>{title}</Text>
      <Text style={{ color: theme.colors.muted }}>{time}</Text>
    </View>
  );
}

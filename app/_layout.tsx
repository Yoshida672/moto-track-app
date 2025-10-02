import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { ThemeProvider } from "~/src/context/ThemeContext";
import { AuthProvider } from "~/src/context/AuthContext";

export default function Layout() {
  return (
        <AuthProvider>

    <ThemeProvider>
      <Slot />
      <StatusBar style="auto" />
  </ThemeProvider>
</AuthProvider>);
}

import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { ThemeProvider } from "~/src/context/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <Slot />
      <StatusBar style="auto" />
  </ThemeProvider>);
}

import { Pressable, View, Dimensions, Text } from "react-native";
import { MotiView, MotiText, AnimatePresence } from "moti";
import { useRouter } from "expo-router";
import { MenuItem } from "~/types/MenuItems";

interface MenuProps {
  aberto: boolean;
  setAberto: (aberto: boolean) => void;
  itens: MenuItem[];
}

export default function MenuListaMoto({ aberto, setAberto, itens }: MenuProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {aberto && (
        <Pressable
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            backgroundColor: "rgba(0,0,0,0.2)",
            flexDirection: "row",
            zIndex: 10,
          }}
          onPress={() => setAberto(false)}
        >
          <MotiView
            from={{ translateX: -220 }}
            animate={{ translateX: 0 }}
            exit={{ translateX: -220 }}
            transition={{ type: "timing", duration: 250 }}
            style={{
              width: 220,
              height: "100%",
              backgroundColor: "#00994d",
              paddingTop: 60,
              paddingHorizontal: 20,
            }}
          >
            {itens.map((item) => (
              <Pressable
                key={item.href}
                onPress={() => {
                  setAberto(false);
                  router.push(item.href);
                }}
                style={({ pressed }: { pressed: boolean }) => ({
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  marginBottom: 12,
                  backgroundColor: pressed ? "#eee" : "#fff",
                })}
              >
                <MotiText
                  from={{ scale: 0.85 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "timing", duration: 200 }}
                  style={{ fontSize: 16, fontWeight: "bold" }}
                >
                  {item.label}
                </MotiText>
              </Pressable>
            ))}
          </MotiView>
          <View style={{ flex: 1 }} />
        </Pressable>
      )}
    </AnimatePresence>
  );
}

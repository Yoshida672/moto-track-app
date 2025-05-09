import { View, Text } from "react-native";

export default function Sobre() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Sobre Nós</Text>
      <Text>Este app foi desenvolvido por:</Text>
      <Text>• Gustavo Monção - RM: 123456</Text>
      <Text>• Eric Yoshida - RM: 654321</Text>
      <Text>• Gustavo Matias - RM: 789012</Text>
    </View>
  );
}

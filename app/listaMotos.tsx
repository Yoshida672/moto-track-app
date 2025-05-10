import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { buscarMotos } from '../utils/storage';
import { Moto } from '../types/moto';
import { useRouter } from 'expo-router';

export default function ListaMotos() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [patioSelecionado, setPatioSelecionado] = useState('');
  const [menuAtivo, setMenuAtivo] = useState(false);
  const slideAnim = useRef(new Animated.Value(-220)).current;
  const router = useRouter();

  useEffect(() => {
    buscarMotos().then(setMotos);
  }, []);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAtivo ? 0 : -220,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [menuAtivo]);

  const patios = Array.from(new Set(motos.map((m) => m.patio)));

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Cabeçalho */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingTop: 40,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#aaa',
        }}
      >
        <TouchableOpacity onPress={() => setMenuAtivo(true)}>
          <Image
            source={require('../assets/menuIcon.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>MotoTrack</Text>

        <Image
          source={require('../assets/iconePerfil.png')}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
      </View>

      {/* Menu Lateral */}
      {menuAtivo && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMenuAtivo(false)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: Dimensions.get('window').height,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)',
            flexDirection: 'row',
            zIndex: 10,
          }}
        >
          <Animated.View
            style={{
              width: 220,
              backgroundColor: '#00994d',
              paddingTop: 60,
              paddingHorizontal: 20,
              height: '100%',
              transform: [{ translateX: slideAnim }],
            }}
          >
            {[{ label: 'Início', href: '/' }, { label: 'Login', href: '/login' }, { label: 'Cadastro de Moto', href: '/cadastroMoto' }, { label: 'Lista', href: '/listaMotos' }, { label: 'Sobre', href: '/sobre' }].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginBottom: 20 }}
                onPress={() => {
                  setMenuAtivo(false);
                  router.push(item.href);
                }}
              >
                <Text style={{ fontSize: 18, color:'#000', fontWeight: 'bold' }}>
                  {'> ' + item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </TouchableOpacity>
      )}

      {/* Conteúdo */}
      <View style={{ paddingHorizontal: 32, paddingTop: 24 }}>
        {/* Botão de título centralizado, estilo corrigido */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Text
            style={{
              borderWidth: 1,
              borderColor: '#12a138',
              borderRadius: 20,
              paddingVertical: 8,
              paddingHorizontal: 24,
              fontWeight: 'bold',
              color: '#000',
              textAlign: 'center',
            }}
          >
            Lista de Motos
          </Text>
        </View>

        {/* Filtro de Pátio */}
        <Picker
          selectedValue={patioSelecionado}
          onValueChange={(itemValue) => setPatioSelecionado(itemValue)}
          style={{
            backgroundColor: '#f2f2f2',
            borderRadius: 10,
            marginBottom: 20,
            color: '#12a138',
          }}
        >
          <Picker.Item label="Selecione um pátio" value="" />
          {patios.map((p) => (
            <Picker.Item key={p} label={p} value={p} />
          ))}
        </Picker>

        {/* Lista de Motos */}
        <ScrollView style={{ marginTop: 8, marginBottom: 16 }}>
          {motos
            .filter((m) => m.patio === patioSelecionado || patioSelecionado === '')
            .map((m) => (
              <View
                key={m.id}
                style={{
                  borderWidth: 1,
                  borderColor: '#12a138',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  backgroundColor: '#f9f9f9',
                }}
              >
                <Text style={{ color: '#222', fontSize: 15 }}>
                  <Text style={{ fontWeight: 'bold' }}>Modelo:</Text> {m.modelo}
                </Text>
                <Text style={{ color: '#222', fontSize: 15 }}>
                  <Text style={{ fontWeight: 'bold' }}>Placa:</Text> {m.placa}
                </Text>
                <Text style={{ color: '#222', fontSize: 15 }}>
                  <Text style={{ fontWeight: 'bold' }}>AprilTag:</Text> {m.aprilTag}
                </Text>
                <Text style={{ color: '#222', fontSize: 15 }}>
                  <Text style={{ fontWeight: 'bold' }}>Pátio:</Text> {m.patio}
                </Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}

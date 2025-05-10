import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { salvarMoto } from '../utils/storage';

export default function CadastroMoto() {
  const [menuAberto, setMenuAberto] = useState(false);
  const slideAnim = useRef(new Animated.Value(-220)).current;
  const router = useRouter();

  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [patio, setPatio] = useState('');
  const [aprilTag, setAprilTag] = useState('');

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAberto ? 0 : -220,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [menuAberto]);

  const handleCadastro = () => {
    const moto = { modelo, placa, patio, aprilTag };

    salvarMoto(moto).then(() => {
      alert('Moto cadastrada com sucesso!');
      router.push('/listaMotos');
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
      {/* MENU LATERAL */}
      {menuAberto && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMenuAberto(false)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 100,
            flexDirection: 'row',
          }}
        >
          <Animated.View
            style={{
              width: 220,
              height: '100%',
              backgroundColor: '#00994d',
              paddingTop: 60,
              paddingHorizontal: 20,
              transform: [{ translateX: slideAnim }],
            }}
          >
            {[{ label: 'Início', href: '/' }, { label: 'Login', href: '/login' }, { label: 'Cadastro', href: '/cadastroMoto' }, { label: 'Lista', href: '/listaMotos' }, { label: 'Sobre', href: '/sobre' }].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginBottom: 20 }}
                onPress={() => {
                  setMenuAberto(false);
                  router.push(item.href);
                }}
              >
                <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>
                  {'> ' + item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
          <View style={{ flex: 1 }} />
        </TouchableOpacity>
      )}

      {/* CABEÇALHO */}
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
          zIndex: 1,
        }}
      >
        {!menuAberto && (
          <Pressable onPress={() => setMenuAberto(true)}>
            <Image
              source={require('../assets/menuIcon.png')}
              style={{ width: 24, height: 24 }}
            />
          </Pressable>
        )}
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Cadastro de Moto</Text>
        <Image
          source={require('../assets/iconePerfil.png')}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
      </View>

      {/* CONTEÚDO */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
          Preencha os dados da moto
        </Text>

        <TextInput
          value={modelo}
          onChangeText={setModelo}
          placeholder="Modelo"
          style={estiloInput}
        />
        <TextInput
          value={placa}
          onChangeText={setPlaca}
          placeholder="Placa"
          style={estiloInput}
        />
        <TextInput
          value={patio}
          onChangeText={setPatio}
          placeholder="Pátio"
          style={estiloInput}
        />
        <TextInput
          value={aprilTag}
          onChangeText={setAprilTag}
          placeholder="UWDTag"
          style={estiloInput}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#00994d',
            padding: 12,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={handleCadastro}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
            Cadastrar Moto
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const estiloInput = {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
  backgroundColor: '#fff',
};

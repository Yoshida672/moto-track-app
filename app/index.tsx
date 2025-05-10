import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function Home() {
  const [menuAberto, setMenuAberto] = useState(false);
  const slideAnim = useRef(new Animated.Value(-220)).current; // largura do menu
  const router = useRouter();

  // Animação de entrada
  useEffect(() => {
    if (menuAberto) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -220,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [menuAberto]);

  return (
    <View style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
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
        {/* Botão menu */}
        <Pressable onPress={() => setMenuAberto(true)}>
          <Image
            source={require('../assets/menuIcon.png')}
            style={{ width: 24, height: 24 }}
          />
        </Pressable>


        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>MOTOTRACK</Text>

        <Image
          source={require('../assets/iconePerfil.png')}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
      </View>

      {/* Linha separadora abaixo do cabeçalho */}
      <View style={{ height: 1, backgroundColor: '#444', width: '100%' }} />

      {/* MENU LATERAL COM ANIMAÇÃO */}
      {menuAberto && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMenuAberto(false)}
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
            {[
              { label: 'Início', href: '/' },
              { label: 'Login', href: '/login' },
              { label: 'Cadastro', href: '/cadastroMoto' },
              { label: 'Lista', href: '/listaMotos' },
              { label: 'Sobre', href: '/sobre' },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginBottom: 20 }}
                onPress={() => {
                  setMenuAberto(false);
                  router.push(item.href);
                }}
              >
                <Text style={{ fontSize: 18, color:'#000', fontWeight: 'bold' }}>
                  {'> ' + item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Parte clicável para fechar o menu */}
          <View style={{ flex: 1 }} />
        </TouchableOpacity>
      )}

      {/* Banner */}
      <View style={{ width: '100%', height: 240, backgroundColor: '#000' }}>
        <Image
          source={require('../assets/backgroundMottu.png')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>

      {/* Conteúdo principal */}
      <View
        style={{
          backgroundColor: '#e6e6e6',
          padding: 20,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          Bem-Vindo ao Moto Track, um sistema de gestão de motos com AprilTags
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: '#444',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Este sistema visa controlar e mapear motos usando etiquetas AprilTag 36h11.
        </Text>

        <Link href="/login" asChild>
          <Pressable
            style={{
              borderWidth: 1.5,
              borderColor: '#00994d',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 25,
            }}
          >
            <Text style={{ color: '#000', fontWeight: '500' }}>
              Acessar como funcionário
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

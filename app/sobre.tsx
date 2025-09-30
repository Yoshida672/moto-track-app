import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Animated,
  Dimensions,
  Linking,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Sobre() {
  const [menuAberto, setMenuAberto] = useState(false);
  const slideAnim = useRef(new Animated.Value(-220)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAberto ? 0 : -220,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [menuAberto]);

  const membros = [
    {
      nome: 'Gustavo Matias',
      funcao: 'Engenheiro de Dados',
      rm: '555010',
      imagem: require('../assets/gustavo-matias.jpg'),
      github: 'https://github.com/Gustavo295',
      linkedin: 'https://www.linkedin.com/in/gustavo-matias-teixeira-2b89a7266/',
    },
    {
      nome: 'Gustavo Monção',
      funcao: 'Web Designer',
      rm: '557515',
      imagem: require('../assets/gustavo-moncao.jpg'),
      github: 'https://github.com/moncaogustavo',
      linkedin: 'https://www.linkedin.com/in/gustavo-monção-574a38224/',
    },
    {
      nome: 'Eric Yoshida',
      funcao: 'Desenvolvedor Back-End',
      rm: '558763',
      imagem: require('../assets/eric.jpg'),
      github: 'https://github.com/Yoshida672',
      linkedin: 'https://www.linkedin.com/in/yoshida672/',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
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
        <Pressable onPress={() => setMenuAberto(true)}>
          <Image
            source={require('../assets/menuIcon.png')}
            style={{ width: 24, height: 24 }}
          />
        </Pressable>

        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>SOBRE NÓS</Text>

        <Image
          source={require('../assets/iconePerfil.png')}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
      </View>

      {/* Linha separadora */}
      <View style={{ height: 1, backgroundColor: '#444', width: '100%' }} />

      {/* Menu Lateral */}
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
                <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>
                  {'> ' + item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>

          <View style={{ flex: 1 }} />
        </TouchableOpacity>
      )}

      {/* Conteúdo principal */}
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          {membros.map((membro, index) => (
            <View
              key={index}
              style={{
                alignItems: 'center',
                marginHorizontal: 10,
                marginVertical: 20,
                width: 180,
              }}
            >
              <Image
                source={membro.imagem}
                style={{ width: 120, height: 120, borderRadius: 60 }}
              />
              <Text
                style={{
                  marginTop: 8,
                  fontWeight: 'bold',
                  color: '#00994d',
                  fontSize: 16,
                }}
              >
                {membro.nome}
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                {membro.funcao}
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                RM: {membro.rm}
              </Text>

              {/* Ícones sociais */}
              <View style={{ flexDirection: 'row', marginTop: 10, gap: 20 }}>
                <TouchableOpacity onPress={() => Linking.openURL(membro.github)}>
                  <Image
                    source={require('../assets/githubIcon.png')}
                    style={{ width: 32, height: 32, tintColor: '#00994d' }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(membro.linkedin)}>
                  <Image
                    source={require('../assets/linkedinIcon.png')}
                    style={{ width: 32, height: 32 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Rodapé */}
        <Text style={{ marginTop: 20, fontWeight: '600', fontSize: 12 }}>
          ©2025 Moto Track - Todos os direitos reservados.
        </Text>
      </ScrollView>
    </View>
  );
}

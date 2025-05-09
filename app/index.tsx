import { View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

export default function Home() {
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
        <Image
          source={require('../assets/menuIcon.png')}
          style={{ width: 24, height: 24 }}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>MotoTrack</Text>
        <Image
          source={require('../assets/iconePerfil.png')}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
      </View>

      {/* Banner*/}
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

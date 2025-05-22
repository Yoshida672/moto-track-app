# Moto Track - Sistema de Cadastro e Gestão de Motos em Pátios 

### Aplicativo desenvolvido em React Native com Expo

---

## Integrantes do Challenge: 
- **Gustavo Matias** - RM: 555010
- **Gustavo Monção** - RM: 557515
- **Eric Yoshida** - RM: 558763

---

## Descrição do Projeto

**Moto Track** é um aplicativo funcional que permite o **cadastro, organização e visualização de motos** localizada em pátios da empresa.

### Funcionalidades: 

- Cadastro de motos com informações como modelo, placa e identificação por UWB Tag;
- Escolha do pátio onde a moto será alocada;
- Visualização das motos organizadas por pátio;
- Autenticação de funcionário;
- Interface amigável e responsiva;

---

## Tecnologias Utilizadas

- [React Native]
- [Expo]
- [AsyncStorage]
- [NativeWind]
- [Expo Router]

---

## Como Rodar o Projeto Localmente

### 1. Pré-requisitos

- Expo CLI

### 2. Clonar o Repositório

```bash
git clone https://github.com/moncaogustavo/moto-track-app.git
cd moto-track-app
```
### 3. Instalar as Dependências

```bash
npm install
```
### 4. Iniciar o Projeto

```bash
npx expo start
```
Pode usar a opção para ver na Web (W) ou usar o MobileView

---

## Observações 

O sistema utiliza **UWB Tags** (digitadas manualmente para representar a identificação física das motos)
Todos os dados são **armanezados localmente** com o **AsyncStorage**

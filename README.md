# 📱 MobileApp — React Native + Expo

Projeto mobile desenvolvido com React Native e Expo, contendo Splash Screen, Tela de Login e Tela de Cadastro.

## 🗂️ Estrutura do Projeto

```
mobile-app/
├── App.js                        # Entry point
├── app.json                      # Configuração do Expo
├── package.json
├── babel.config.js
└── src/
    ├── app/
    │   ├── screens/
    │   │   ├── SplashScreen.js   # Tela de abertura (redireciona para Login em 3s)
    │   │   ├── LoginScreen.js    # Tela de login com validação
    │   │   └── CadastroScreen.js # Tela de cadastro com validação
    │   └── navigation/
    │       └── AppNavigator.js   # Configuração de rotas
    └── components/
        ├── Input.js              # Componente reutilizável de input
        └── Button.js             # Componente reutilizável de botão
```

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- App **Expo Go** no celular

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/mobile-app.git
cd mobile-app

# 2. Instale as dependências
npm install

# 3. Inicie o projeto
npx expo start
```

### No celular
- Abra o **Expo Go**
- Escaneie o QR Code exibido no terminal

## 📋 Telas

| Tela | Descrição |
|------|-----------|
| **Splash** | Logo animado + redireciona automaticamente para Login em 3s |
| **Login** | Campos email/senha, validação, navegação para Cadastro |
| **Cadastro** | Campos nome/email/senha, validação, indicador de força de senha |

## 🧩 Componentes Reutilizáveis

- **`Input`** — Campo de texto com label, placeholder, erro, toggle de senha
- **`Button`** — Botão com variantes `primary`, `outline`, `ghost` e estado `loading`

## 🛠️ Tecnologias

- React Native
- Expo ~52
- React Navigation (Native Stack)
- Animated API (animações nativas)

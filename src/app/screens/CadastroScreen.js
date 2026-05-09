import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

const { width } = Dimensions.get('window');

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const validate = () => {
    const newErrors = {};

    if (!nome.trim()) {
      newErrors.nome = 'O nome é obrigatório.';
    } else if (nome.trim().length < 3) {
      newErrors.nome = 'O nome deve ter ao menos 3 caracteres.';
    }

    if (!email.trim()) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Informe um e-mail válido.';
    }

    if (!senha.trim()) {
      newErrors.senha = 'A senha é obrigatória.';
    } else if (senha.length < 6) {
      newErrors.senha = 'A senha deve ter ao menos 6 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCadastro = () => {
    if (!validate()) {
      shake();
      return;
    }

    setLoading(true);
    // Simula chamada de API
    setTimeout(() => {
      setLoading(false);
      alert('Cadastro realizado com sucesso! ✅\nRedirecionando para o login...');
      navigation.navigate('Login');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Decoração de fundo */}
        <View style={styles.bgCircle} />

        {/* Header com botão voltar */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        {/* Título */}
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <Text style={styles.headerIcon}>✦</Text>
          </View>
          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subtitle}>
            Preencha seus dados para começar
          </Text>
        </View>

        {/* Card do formulário */}
        <Animated.View
          style={[styles.card, { transform: [{ translateX: shakeAnim }] }]}
        >
          {/* Indicador de progresso */}
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressLabel}>Etapa 1 de 1 · Dados pessoais</Text>

          <View style={styles.formFields}>
            <Input
              label="Nome completo"
              placeholder="Seu nome"
              value={nome}
              onChangeText={(t) => {
                setNome(t);
                if (errors.nome) setErrors((e) => ({ ...e, nome: '' }));
              }}
              autoCapitalize="words"
              error={errors.nome}
            />

            <Input
              label="E-mail"
              placeholder="seu@email.com"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (errors.email) setErrors((e) => ({ ...e, email: '' }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <Input
              label="Senha"
              placeholder="Mínimo 6 caracteres"
              value={senha}
              onChangeText={(t) => {
                setSenha(t);
                if (errors.senha) setErrors((e) => ({ ...e, senha: '' }));
              }}
              secureTextEntry
              error={errors.senha}
            />
          </View>

          {/* Indicador de força da senha */}
          {senha.length > 0 && (
            <View style={styles.strengthContainer}>
              <Text style={styles.strengthLabel}>Força da senha:</Text>
              <View style={styles.strengthBars}>
                {[1, 2, 3].map((level) => (
                  <View
                    key={level}
                    style={[
                      styles.strengthBar,
                      senha.length >= level * 3 && styles.strengthBarActive,
                      senha.length >= 9 && styles.strengthBarStrong,
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.strengthText}>
                {senha.length < 3
                  ? 'Fraca'
                  : senha.length < 6
                  ? 'Média'
                  : 'Forte'}
              </Text>
            </View>
          )}

          <Button
            title="Criar minha conta"
            onPress={handleCadastro}
            loading={loading}
            style={{ marginTop: 16 }}
          />
        </Animated.View>

        {/* Rodapé */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}> Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  bgCircle: {
    position: 'absolute',
    width: width,
    height: width,
    borderRadius: width / 2,
    backgroundColor: '#5B9BD5',
    opacity: 0.05,
    bottom: -width * 0.3,
    right: -width * 0.3,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  backIcon: {
    color: '#7C5CBF',
    fontSize: 20,
    fontWeight: '700',
  },
  backText: {
    color: '#7C5CBF',
    fontSize: 15,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1A1A3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#7C5CBF40',
  },
  headerIcon: {
    fontSize: 24,
    color: '#7C5CBF',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#EAEAF5',
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6060A0',
  },
  card: {
    backgroundColor: '#14142A',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#2A2A4A',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    backgroundColor: '#7C5CBF',
    borderRadius: 2,
  },
  progressLabel: {
    fontSize: 12,
    color: '#4A4A6A',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  formFields: {
    gap: 4,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  strengthLabel: {
    fontSize: 12,
    color: '#4A4A6A',
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 4,
  },
  strengthBar: {
    width: 28,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2A2A4A',
  },
  strengthBarActive: {
    backgroundColor: '#F0A500',
  },
  strengthBarStrong: {
    backgroundColor: '#34C26A',
  },
  strengthText: {
    fontSize: 12,
    color: '#6060A0',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#4A4A6A',
    fontSize: 14,
  },
  footerLink: {
    color: '#7C5CBF',
    fontSize: 14,
    fontWeight: '700',
  },
});

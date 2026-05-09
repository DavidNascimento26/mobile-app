import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequência de animação
    Animated.sequence([
      // 1. Logo aparece com escala
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 60,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // 2. Subtitle aparece
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // 3. Loading dots aparecem
      Animated.timing(dotsOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Redireciona para Login após 3 segundos
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background decorativo */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* Logo / Ícone */}
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <View style={styles.logoIconWrapper}>
          <Text style={styles.logoIcon}>⬡</Text>
          <Text style={styles.logoIconInner}>M</Text>
        </View>

        <Text style={styles.appName}>MyApp</Text>
      </Animated.View>

      {/* Subtítulo */}
      <Animated.View style={{ opacity: subtitleOpacity }}>
        <Text style={styles.subtitle}>Conectando pessoas ao futuro</Text>
      </Animated.View>

      {/* Loading */}
      <Animated.View style={[styles.dotsContainer, { opacity: dotsOpacity }]}>
        <LoadingDots />
      </Animated.View>

      {/* Versão */}
      <Text style={styles.version}>v1.0.0</Text>
    </View>
  );
}

function LoadingDots() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(dot1, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(dot1, { toValue: 0.3, duration: 300, useNativeDriver: true }),
      ]).start();

      setTimeout(() => {
        Animated.sequence([
          Animated.timing(dot2, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot2, { toValue: 0.3, duration: 300, useNativeDriver: true }),
        ]).start();
      }, 150);

      setTimeout(() => {
        Animated.sequence([
          Animated.timing(dot3, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot3, { toValue: 0.3, duration: 300, useNativeDriver: true }),
        ]).start();
      }, 300);
    };

    const interval = setInterval(animate, 900);
    animate();
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.dots}>
      {[dot1, dot2, dot3].map((dot, i) => (
        <Animated.View
          key={i}
          style={[styles.dot, { opacity: dot }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircle1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: '#7C5CBF',
    opacity: 0.06,
    top: -width * 0.2,
    left: -width * 0.2,
  },
  bgCircle2: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: '#5B9BD5',
    opacity: 0.06,
    bottom: -width * 0.1,
    right: -width * 0.1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIconWrapper: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  logoIcon: {
    fontSize: 90,
    color: '#7C5CBF',
    position: 'absolute',
  },
  logoIconInner: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    position: 'absolute',
  },
  appName: {
    fontSize: 42,
    fontWeight: '800',
    color: '#EAEAF5',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 15,
    color: '#6060A0',
    letterSpacing: 0.5,
    marginTop: 8,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7C5CBF',
  },
  version: {
    position: 'absolute',
    bottom: 40,
    fontSize: 12,
    color: '#3A3A5A',
    letterSpacing: 1,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AuthScreen = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setError('');
    if (!email || !password) {
      setError('Email and password required');
      return;
    }

    if (!isLogin && !name) {
      setError('Name is required');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user = {
        uid: Math.random().toString(36).substr(2, 9),
        email,
        name: name || 'User',
        photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        followers: 120000,
        likes: 8400000,
        bio: 'I create amazing content ✨',
      };
      onAuthSuccess(user);
      setLoading(false);
    }, 800);
  };

  return (
    <LinearGradient colors={['#0f172a', '#111827']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.logo}>ReelFlow</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Text>

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#7b8794"
              value={name}
              onChangeText={setName}
              editable={!loading}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#7b8794"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#7b8794"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? 'Login' : 'Sign Up'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleText}>
              {isLogin
                ? "Don't have account? Sign Up"
                : 'Already have account? Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
    minHeight: '100%',
  },
  logo: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
  },
  toggleText: {
    color: '#60a5fa',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});

export default AuthScreen;

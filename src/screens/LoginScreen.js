import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthService from '../services/AuthService';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter email');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter password');
      return;
    }

    setLoading(true);
    try {
      const result = await AuthService.loginUser(email, password);
      if (result.success && result.user) {
        const userData = {
          id: result.user.id,
          email: result.user.email,
          fullName: result.user.fullName,
          role: result.user.role,
          isActive: result.user.isActive
        };
        onLogin(userData);
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const demoAdmin = () => {
    setEmail('admin@liquorpos.com');
    setPassword('Liquor@Admin2026#Secure');
  };

  const demoStaff = () => {
    setEmail('staff@liquorpos.com');
    setPassword('Liquor@Staff2026#Strong');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            {!imageError ? (
              <Image 
                source={require('../../assets/logo.png')} 
                style={styles.logo}
                resizeMode="cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <View style={[styles.logo, styles.fallbackLogo]}>
                <Icon name="storefront" size={60} color="#f4a900" />
              </View>
            )}
            <Text style={styles.title}>The Executive Bar</Text>
            <Text style={styles.subtitle}>Point of Sale System</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Icon name="mail" size={20} color="#3d2b1f" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock-closed" size={20} color="#3d2b1f" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Icon name={showPassword ? "eye" : "eye-off"} size={20} color="#3d2b1f" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="#3d2b1f" />
                  <Text style={styles.loadingText}>Logging in...</Text>
                </View>
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* Powered by OneGondo */}
            <View style={styles.poweredByContainer}>
              <Text style={styles.poweredByText}>
                Powered by OneGondo +263 783 242 506
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#f4a900',
  },
  fallbackLogo: {
    backgroundColor: '#f0f0f0',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#f4a900',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3d2b1f',
    marginTop: 0,
  },
  subtitle: {
    fontSize: 16,
    color: '#3d2b1f',
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#3d2b1f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3d2b1f',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#3d2b1f',
  },
  eyeIcon: {
    padding: 8,
  },
  loginButton: {
    backgroundColor: '#f4a900',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    color: '#3d2b1f',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  loginButtonText: {
    color: '#3d2b1f',
    fontSize: 18,
    fontWeight: '600',
  },
  poweredByContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  poweredByText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  demoContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3d2b1f',
    marginBottom: 12,
    textAlign: 'center',
  },
  demoButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  adminButton: {
    backgroundColor: '#fffcf0',
    borderColor: '#f4a900',
  },
  staffButton: {
    backgroundColor: '#f0f7ff',
    borderColor: '#2c6b9e',
  },
  demoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  demoText: {
    fontSize: 14,
    color: '#3d2b1f',
    fontWeight: '600',
    marginLeft: 6,
  },
  demoCredentials: {
    fontSize: 12,
    color: '#666',
    marginLeft: 22,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});

export default LoginScreen;
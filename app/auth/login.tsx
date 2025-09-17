
import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, Alert } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function LoginScreen() {
  console.log('LoginScreen rendered');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    console.log('Login attempt with:', formData);
    
    // Basic validation
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Simulate successful login
    Alert.alert('Success', 'Login successful!', [
      { text: 'OK', onPress: () => router.push('/main/home') }
    ]);
  };

  const handleBackToWelcome = () => {
    console.log('Navigate back to welcome');
    router.back();
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={commonStyles.content}>
          {/* Header */}
          <View style={[commonStyles.row, { marginTop: 20, marginBottom: 40 }]}>
            <Button
              text=""
              onPress={handleBackToWelcome}
              style={{
                backgroundColor: 'transparent',
                width: 40,
                height: 40,
                padding: 0,
                marginRight: 16,
              }}
              textStyle={{ display: 'none' }}
            >
              <Icon name="arrow-back" size={24} color={colors.text} />
            </Button>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.title}>Welcome Back</Text>
              <Text style={commonStyles.subtitle}>
                Sign in to your account
              </Text>
            </View>
          </View>

          {/* Welcome Message */}
          <View style={[commonStyles.centerContent, { marginBottom: 40 }]}>
            <View style={{
              backgroundColor: colors.primary,
              borderRadius: 30,
              padding: 20,
              marginBottom: 24,
            }}>
              <Icon name="airplane" size={40} color="#FFFFFF" />
            </View>
          </View>

          {/* Form */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <Text style={commonStyles.inputLabel}>Email Address</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                placeholderTextColor={colors.textLight}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={commonStyles.inputLabel}>Password</Text>
              <TextInput
                style={[commonStyles.input, { marginBottom: 0 }]}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="Enter your password"
                placeholderTextColor={colors.textLight}
                secureTextEntry
              />
            </View>
          </View>

          {/* Action Button */}
          <View style={commonStyles.section}>
            <Button
              text="Sign In"
              onPress={handleLogin}
              style={{ backgroundColor: colors.primary }}
            />
          </View>

          {/* Sign Up Link */}
          <View style={[commonStyles.centerContent, { marginTop: 20 }]}>
            <Text style={commonStyles.textLight}>
              Don&apos;t have an account?{' '}
              <Text 
                style={{ color: colors.primary, fontWeight: '600' }}
                onPress={() => router.push('/auth/signup')}
              >
                Create Account
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
